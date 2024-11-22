# DOCX to PDF Converter Web Application
This is a **Node.js-based web application** that allows users to upload DOCX files and convert them to password-protected PDF files. The conversion is handled using **LibreOffice** for DOCX to PDF transformation, while **qPDF** is used to apply password protection on the resulting PDF. The application is containerized using **Docker** to simplify deployment and portability.

---

## Features

- **Convert DOCX to PDF**: Converts uploaded DOCX files into PDFs.
- **Password Protection**: Users can set a password for the generated PDF file.
- **Dockerized Application**: The application is containerized with Docker for easy setup and deployment.
- **Web Interface**: Simple UI for users to upload DOCX files and set a password for the generated PDF.
- **GitHub Actions CI/CD**: Automates the build and deployment of the Docker image using GitHub Actions.

---
## Prerequisites

Before running this application, ensure that you have the following tools installed:

- **Docker**: Install Docker to run the containerized application. You can download Docker from [Docker's official website](https://www.docker.com/).
- **Git**: Git is needed to clone the repository and manage the codebase. You can install Git from [here](https://git-scm.com/downloads).
- **Node.js (optional for development)**: Install Node.js if you plan to modify the server-side code. You can download it from [here](lo).

---

## Technologies Used

- **Node.js**: Backend runtime to handle file uploads and interact with LibreOffice for DOCX to PDF conversion.
- **Express**: Lightweight Node.js framework for handling HTTP requests and serving the web interface.
- **LibreOffice**: Used to perform the DOCX to PDF conversion.
- **qPDF**: Used for password protection of the generated PDFs.
- **Docker**: Containerization of the application, ensuring consistency across environments and simplifying deployment.
- **GitHub Actions**: Continuous Integration and Continuous Deployment (CI/CD) pipeline to automate the building and pushing of the Docker image.
- **HTML/CSS**: Simple frontend for users to interact with the application.

---

## Getting Started

Follow these steps to get the application up and running on your local machine.

### Step 1: Clone the Repository

Clone this repository to your local machine using Git:

```bash
git clone https://github.com/LavishGurjar852/word-to-pdf.git
cd word-to-pdf

```
### Step 2: Dockerize the Application

#### **Option 1: Run the Application Using Docker**

1. Ensure Docker is installed and running on your machine.
2. Run the container using the `run.sh` script:

   ```bash
   ./run.sh
   ```
This script will:
-Check if the Docker image is built.
- If not, it will build the Docker image.
- Run the Docker container exposing port 3000.
Once the container is running, you can access the application via http://localhost:3000.

#### **Option 2: Manually Build the Docker Image**
If you haven't built the Docker image yet, you can manually build it using the following command:

  ```bash
docker build -t lavish85/docx-to-pdf-app .
```
After the image is built, you can run the container with:

```bash
docker run -p 3000:3000 lavish85/docx-to-pdf-app
```
This will expose the application at http://localhost:3000.

### Step 3: Upload a DOCX File and Convert
Once the application is running:

1. Open a web browser and visit http://localhost:3000.
2. Upload a DOCX file that you want to convert.
3. Set a password for the resulting PDF file.
4. Download the converted PDF file.

## GitHub Actions CI/CD

This project is integrated with **GitHub Actions** to automate the build and deployment process of the Docker image to Docker Hub.

### How It Works
The GitHub Actions workflow file is located at `.github/workflows/docker-image-build.yml`. Here's a summary of the workflow steps:

1. **Checkout Code**: The workflow checks out the code from the repository.
2. **Log in to Docker Hub**: It logs in to Docker Hub using credentials stored as GitHub secrets (`DOCKER_USERNAME` and `DOCKER_PASSWORD`).
3. **Build Docker Image**: It builds the Docker image using the `Dockerfile` in the repository.
4. **Push Image to Docker Hub**: After building the image, the workflow pushes it to Docker Hub under the `lavish85/docx-to-pdf-app:latest` tag.

This allows you to easily deploy and share the Docker image with others.

## File Structure

Here is an overview of the file structure of the project:

```bash
/word-to-pdf
├── .github
│   └── workflows
│       └── docker-image-build.yml  # GitHub Actions workflow to build Docker image
├── Dockerfile                      # Instructions for building the Docker image
├── app.js                          # Main application logic (Node.js server)
├── package.json                    # Node.js dependencies and scripts
├── run.sh                          # Bash script to build and run the container
├── README.md                       # Documentation for the project
├── temp                            # Temporary files directory
├── public
│   └── css
│       └── styles.css              # General stylesheet
│       └── result-style.css        # Stylesheet for result page
├── views
│   └── index.ejs                   # EJS template for the main page
│   └── result.ejs                  # EJS template for the result page
```

## Troubleshooting

### Docker Build Issues
If you run into issues building the Docker image:
- Ensure that you have an active internet connection.
- Verify that Docker is installed and running properly on your machine.

### Container Not Starting
To identify any issues with the container, check the Docker logs:

```bash
docker logs <container_id>
```

### Accessing the Application

If the web application is not accessible at [http://localhost:3000](http://localhost:3000):

- Ensure that the port is correctly mapped in the Docker run command.
- Check for any firewall restrictions that might block access.
