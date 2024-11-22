const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();

// Set up multer for file upload
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Only .docx files are allowed!'), false);
    }
  },
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Ensure required directories exist
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
ensureDirExists(path.join(__dirname, 'uploads'));
ensureDirExists(path.join(__dirname, 'temp'));

// Serve the main page (index.ejs)
app.get('/', (req, res) => {
  res.render('index');
});

// File conversion route
app.post('/convert', upload.single('docxFile'), (req, res) => {
  try {
    const tempDir = path.join(__dirname, 'temp');

    ensureDirExists(tempDir);

    const tempFilePath = path.join(tempDir, `${Date.now()}_${req.file.originalname}`);
    const originalNameWithoutExt = path.basename(req.file.originalname, path.extname(req.file.originalname));
    const timestamp = Date.now();
    const outputPath = path.join(tempDir, `${originalNameWithoutExt}_${timestamp}.pdf`);
    const outputPathWithPassword = path.join(tempDir, `${originalNameWithoutExt}_${timestamp}_protected.pdf`);

    // Save the uploaded file to the temp directory
    fs.renameSync(req.file.path, tempFilePath);

    const libreOfficePath = 'libreoffice';

    // Convert DOCX to PDF
    exec(`"${libreOfficePath}" --headless --convert-to pdf "${tempFilePath}" --outdir "${tempDir}"`, (err, stdout, stderr) => {
      fs.unlinkSync(tempFilePath); // Remove the uploaded DOCX file immediately

      if (err) {
        console.error('LibreOffice Error:', stderr);
        return res.status(500).send('Conversion failed!');
      }

      const generatedPdf = fs.readdirSync(tempDir).find(file => file.endsWith('.pdf') && file.includes(originalNameWithoutExt));
      if (generatedPdf) {
        const generatedPdfFullPath = path.join(tempDir, generatedPdf);
        fs.renameSync(generatedPdfFullPath, outputPath);

        const metadata = {
          originalName: req.file.originalname,
          size: req.file.size,
          creationDate: new Date().toLocaleString(),
        };

        if (req.body.passwordProtection && req.body.password) {
          const password = req.body.password;

          const qpdfPath = 'qpdf';
          exec(`"${qpdfPath}" --encrypt ${password} ${password} 256 -- "${outputPath}" "${outputPathWithPassword}"`, (qpdfErr, qpdfStdout, qpdfStderr) => {
            if (qpdfErr) {
              console.error('qPDF Error:', qpdfStderr);
              return res.status(500).send('Error applying password protection!');
            }

            // Delete the original unprotected file after creating the password-protected version
            fs.unlinkSync(outputPath);

            res.render('result', {
              metadata,
              downloadUrl: `/download-temp/${path.basename(outputPathWithPassword)}`,
            });
          });
        } else {
          res.render('result', {
            metadata,
            downloadUrl: `/download-temp/${path.basename(outputPath)}`,
          });
        }
      } else {
        res.status(500).send('Conversion failed! No PDF generated.');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An unexpected error occurred.');
  }
});

// Serve and delete the file after download

app.get('/download-temp/:file', (req, res) => {
  const filePath = path.join(__dirname, 'temp', req.params.file);

  res.download(filePath, (err) => {
    if (err) {
      console.error('Error while downloading file:', err);
      return res.status(500).send('Error while downloading file.');
    }

    // Delete the file after download is complete
    fs.unlinkSync(filePath);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
