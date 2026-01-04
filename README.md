# App Registration SPA

A production-ready Single Page Application for managing application registrations with secure authentication, real-time sync, and persistent state management.

## 🚀 Features
- Secure Authentication: JWT-based login with SHA-256 password hashing

- App Management: Register, update, and sync application information

- Smart Pagination: 10/50/100 items per page with persistent state

- Sync System: Individual and batch sync with localStorage caching

- State Persistence: Sync states survive browser refresh and sessions

- Modern Stack: Vanilla ES6+ JavaScript with Webpack 5

- Testing: Jest with 70%+ coverage requirement

- Production Ready: Vercel deployment with Docker support

## 📋 Prerequisites
- Node.js 24+ (as specified in package.json engines)

- npm 11+ (comes with Node.js 24)

- DotenvX CLI (for environment management)

## 🛠️ Quick Start
```bash

# Clone repository

git clone <repository-url>
cd app-registration-spa

# Install dependencies

npm install

# Install DotenvX globally

npm install -g @dotenvx/dotenvx

# Create environment file

echo "AUTH_USER=admin" >> .env.local
echo "AUTH_PASS_HASH=$(node -e "const crypto = require('crypto'); console.log(crypto.createHash('sha256').update('yourpassword').digest('hex'))")" >> .env.local
echo "JWT_SECRET=your_jwt_secret_key" >> .env.local

# Encrypt environment file

npx @dotenvx/dotenvx encrypt .env.local .env.local.encrypted

# Start development server

npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure
```text
app-registration-spa/
├── api/ # Vercel serverless functions
│ └── login.js # JWT authentication endpoint
├── src/ # Frontend source code
│ ├── views/ # SPA views (home, login, dashboard, settings)
│ ├── util/ # Utilities (validation, UI helpers, functions)
│ ├── statics/ # Mock data (100 apps with stable IDs)
│ ├── css/ # SCSS stylesheets
│ ├── **tests**/ # Unit tests
│ ├── app.js # Main entry point
│ ├── router.js # Client-side routing with auth guards
│ ├── service.js # State management & authentication
│ └── app-init.js # Dashboard initialization & logic
├── public/ # Build output (Webpack)
│ ├── index.html # HTML shell
│ ├── app.js # Bundled JavaScript
│ └── app.map.js # Source maps
├── docs/ # Comprehensive documentation
├── .github/workflows/ # GitHub Actions CI/CD
└── Configuration files # See "Configuration" section
```
## 📦 Available Scripts
### Script Purpose Details
| Script | Purpose | Details |
|--------|---------|---------|
| `npm run dev` | Main development | Build + Express server (concurrently) |
| `npm run local` | Local with encrypted env | DotenvX + Vercel dev |
| `npm run vercel` | Vercel local dev | Standard Vercel development |
| `npm run frontend` | Webpack dev server | Development server only |
| `npm run build` | Production build | Webpack production build |
| `npm run deploy` | Deploy to Vercel | Vercel deployment |
| `npm test` | Run tests | Jest test suite |
| `npm run test:cover` | Coverage report | Jest with coverage |
| `npm run build:watch` | Watch mode | Webpack watch for changes |

## 🔧 Configuration
### Environment Variables
#### Create .env.local with:

```bash
AUTH_USER=admin
AUTH_PASS_HASH=sha256_hash_of_your_password
JWT_SECRET=your_jwt_secret_key
Important: This project uses DotenvX for encrypted environment files. The .env.local.encrypted file is committed, while .env.local is in .gitignore.
```
## Generate Password Hash
```bash

# Using Node.js

node -e "const crypto = require('crypto'); console.log(crypto.createHash('sha256').update('yourpassword').digest('hex'))"

# Using OpenSSL

echo -n "yourpassword" | openssl sha256
```
## 🚀 Deployment
### Vercel (Recommended)
```bash

# Deploy to Vercel

npm run deploy

# Or using Vercel CLI

vercel --prod
```
## Docker
```bash

# Build Docker image

docker build -t app-registration-spa .

# Run container

docker run -p 3000:3000 \
 -e AUTH_USER=admin \
 -e AUTH_PASS_HASH=your_hash \
 -e JWT_SECRET=your_secret \
 app-registration-spa
Manual Deployment
Deploy the /public directory to any static hosting service.
```
## 🧪 Testing
```bash

# Run all tests

npm test

# Run tests with coverage

npm run test:cover

# Open coverage report

npm run open:
```
### Coverage Requirement: 70% minimum coverage enforced.

## 🔐 Security Features
- Password Hashing: SHA-256 before transmission (never plain text)

- JWT Authentication: Stateless tokens with 2-hour expiration

- Encrypted Environment: DotenvX for secure variable management

- Session Security: Proper localStorage cleanup on logout

- Input Validation: Client and server-side validation

- CORS Protection: Properly configured for production

## 🔄 Sync System Architecture
The application implements a robust sync system:

- Persistent State: Sync status survives browser refresh using localStorage

- Pagination Integration: Sync states maintained across all pages

- Stable IDs: Deterministic app IDs (app-0001, app-0002) for cache consistency

- User-Friendly: Sync data preserved between sessions

- Performance: No unnecessary API calls on page load

## 🐛 Troubleshooting
## Common Issues
1. Login fails

```bash

# Verify password hash matches

node -e "const crypto = require('crypto'); console.log(crypto.createHash('sha256').update('yourpassword').digest('hex'))"
```
2. Sync states lost

```javascript
// In browser console
localStorage.clear()
location.reload()
```

## Build errors

```bash

# Clear and reinstall

rm -rf node_modules
npm install
```

## Debug Commands
```javascript
// Browser console helpers
window.debugPageState?.() // Check pagination state
window.debugAppState?.() // View current app state
window.verifyPageState?.() // Verify page consistency
```
## 📖 Documentation
Detailed documentation available in /docs:

- ARCHITECTURE.md - Syste- m design and components

- API_REFERENCE.md - API endpoints and usage

- DEPLOYMENT.md - Deployment instructions

- DEVELOPMENT.md - Development workflow

- SYNC_SYSTEM.md - Sync state architecture

- UI_HELPERS.md - UI utility functions

## 🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

### Guidelines:

- Write tests for new features

- Maintain 70%+ test coverage

- Update documentation

- Follow existing code patterns

## 📞 Support
- Issues: GitHub Issues

- Documentation: /docs directory

#### Built with Node.js 24 • Webpack 5 • Vercel • Production Ready
