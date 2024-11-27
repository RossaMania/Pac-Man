# Use the official NGINX image from DockerHub
FROM nginx:alpine

# Copy your static files to the NGINX default HTML directory
COPY . /usr/share/nginx/html

# Expose port 80 to make the application accessible
EXPOSE 80

# Start NGINX (default command in the nginx:alpine image)
CMD ["nginx", "-g", "daemon off;"]