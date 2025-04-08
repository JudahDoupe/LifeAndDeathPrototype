#!/bin/bash

# Build the Docker image and start the container using Docker Compose
docker-compose down
docker-compose up --build -d

# Print success message
echo "'Life and Death' started successfully at http://localhost:8080"
