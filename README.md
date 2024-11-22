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

- **Docker**: Install Docker to run the containerized application. You can download Docker from [Docker's official website](https://www.docker.com/get-started).
- **Git**: Git is needed to clone the repository and manage the codebase. You can install Git from [here](https://git-scm.com/).
- **Node.js (optional for development)**: Install Node.js if you plan to modify the server-side code. You can download it from [here](https://nodejs.org/).

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

Check if the Docker image is built.
If not, it will build the Docker image.
Run the Docker container exposing port 3000.
Once the container is running, you can access the application via http://localhost:3000.

#### **Option 2: Manually Build the Docker Image
If you haven't built the Docker image yet, you can manually build it using the following command:

  ```bash
docker build -t lavish85/docx-to-pdf-app .
```
After the image is built, you can run the container with:

bash
Copy code
docker run -p 3000:3000 lavish85/docx-to-pdf-app
This will expose the application at http://localhost:3000.
