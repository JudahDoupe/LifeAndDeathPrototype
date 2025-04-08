# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the website files to the Nginx HTML directory
COPY src /usr/share/nginx/html

# Expose port 80 to serve the website
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
