#!/bin/bash

# Define the Docker image name and tag (change this to your Docker Hub username and image name)
IMAGE_NAME="lavish85/docx-to-pdf-app:latest"
PORT=3000

# Check if the Docker image already exists locally
if [[ "$(docker images -q $IMAGE_NAME 2> /dev/null)" == "" ]]; then
  # If image doesn't exist, build it
  echo "Building Docker image $IMAGE_NAME..."
  docker build -t $IMAGE_NAME .

  # Check if the build was successful
  if [[ $? -eq 0 ]]; then
    echo "Docker image built successfully!"
  else
    echo "Error building Docker image. Exiting..."
    exit 1
  fi
else
  echo "Docker image $IMAGE_NAME already exists. Skipping build."
fi

# Run the Docker container
echo "Running the container on port $PORT..."
docker run -p $PORT:$PORT $IMAGE_NAME

echo "Container is running. Access the app on http://localhost:$PORT"

# Instructions for running the script:
# 
# If you're using PowerShell:
# 1. Open PowerShell and navigate to the directory containing the 'run.sh' script.
# 2. Run the script with the command: 
#    ./run.sh
# 3. The Docker container will build (if not already built) and start running.
# 4. Access the app at http://localhost:3000
#
# If you're using Git Bash or WSL (Windows Subsystem for Linux):
# 1. Open Git Bash or a WSL terminal and navigate to the directory containing 'run.sh'.
# 2. Make the script executable by running: 
#    chmod +x run.sh
# 3. Run the script with: 
#    ./run.sh
# 4. The Docker container will build (if not already built) and start running.
# 5. Access the app at http://localhost:3000
