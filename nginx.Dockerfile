# Use an official nginx image as a parent image
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the static content (HTML, CSS, JS, etc.) into the container
COPY ./frontend /usr/share/nginx/html

# Remove the default nginx configuration
#RUN rm /etc/nginx/conf.d/default.conf

# Copy the proxy configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY mime.types /etc/nginx/conf.d/conf/mime.types

# Expose ports (80 is for HTTP, 443 is for HTTPS if needed)
#EXPOSE 80

# Command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]