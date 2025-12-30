# Use Node 24-slim for modern engine support and smaller image size
FROM node:24-slim

# Set environment to production for performance optimizations
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# REFACTORED: npm install
# CHANGED: Using 'npm ci --omit=dev'
# REASON: 'npm ci' is faster and more reliable in CI/CD.
# Using '--omit=dev' ensures your production image doesn't contain heavy
# test libraries like Jest, keeping the image light and secure.
RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Expose your app port
EXPOSE 5000

# CMD stays the same
CMD [ "npm", "start" ]
