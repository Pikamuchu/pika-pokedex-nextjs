FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json file
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
