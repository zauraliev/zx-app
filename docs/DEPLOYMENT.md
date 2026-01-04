## **File 4: `/docs/DEPLOYMENT.md`**

# Deployment Guide

## Prerequisites

- Node.js 24
- Vercel account (or other hosting)
- DotenvX setup for encrypted environment variables

## Environment Variables

Create `.env.local` (DO NOT COMMIT):

```bash
# Authentication
AUTH_USER=admin
AUTH_PASS=your_password_hash_or_plain
JWT_SECRET=your_jwt_secret

# App Configuration
NODE_ENV=production
```

### Encrypt for Git:

```bash
npx @dotenvx/dotenvx encrypt .env.local -o .env.local.encrypted
# Commit .env.local.encrypted
# Store DOTENV_PRIVATE_KEY in CI/CD secrets
```

## Build Commands

```bash
# Development
npm run dev           # Local dev server (port 5000)

# Production build
npm run build         # Output to /public

# Vercel development
npm run local         # With DotenvX decryption
```

## Vercel Deployment

### 1. Connect Repository

1. Push code to GitHub/GitLab

2. Import project in Vercel dashboard

3. Configure build settings:

- Build Command: npm run build

- Output Directory: public

- Install Command: npm ci

### 2. Environment Variables

In Vercel project settings:

- Add DOTENV_PRIVATE_KEY_LOCAL_ENCRYPTED from your secrets

- Add other environment variables if not using DotenvX

### 3. Deploy

```bash
# Manual deploy
vercel --prod

# Automatic deploys on git push (configure in Vercel)
```

### Docker Deployment (Optional)

#### Dockerfile

```dockerfile
# Use Node 24-slim for modern engine support and smaller image size
FROM node:24-slim

# Set environment to production for performance optimizations
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Expose your app port
EXPOSE 5000

# CMD stays the same
CMD [ "npm", "start" ]
```

#### Docker Compose

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
    secrets:
      - dotenv_private_key
```

#### CI/CD (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI/CD
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "24"
      - run: npm ci
      - run: npx @dotenvx/dotenvx run -f .env.local.encrypted -- npm run build
        env:
          DOTENV_PRIVATE_KEY_LOCAL_ENCRYPTED: ${{ secrets.DOTENV_PRIVATE_KEY_LOCAL_ENCRYPTED }}
```

## Production Checklist

### Pre-Deployment

- Remove debug tools from production build

- Test all user flows

- Verify environment variables

- Check console for errors

- Test on mobile devices

### Post-Deployment

- Verify HTTPS is working

- Test login functionality

- Check sync state persistence

- Monitor error logs

- Set up backup strategy

### Monitoring

- Console errors: Browser developer tools

- Performance: Web Vitals, Lighthouse

- Usage: Basic analytics if needed

- Errors: Consider Sentry for production

### Rollback Procedure

- Vercel: Use deployment history in dashboard

- Docker: Deploy previous image tag

- Manual: Restore from backup
