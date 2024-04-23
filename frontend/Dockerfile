FROM node:20-alpine3.18

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 5173 (default for vite) for the application
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev",  "--", "--host", "0.0.0.0", "--port", "5173"]