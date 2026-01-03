
## **File 6: `/docs/DEVELOPMENT.md`**

# Development Guide

## Getting Started

### Prerequisites
- Node.js 24+
- npm 11+
- Git

### Installation
```bash
# Clone repository
git clone <repository-url>
cd app-registration-spa

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# Encrypt for Git (if using DotenvX)
npx @dotenvx/dotenvx encrypt .env.local -o .env.local.encrypted

Development Server
bash
# Start development server
npm run dev

# Server runs on http://localhost:5000
# Hot reload enabled
Other Scripts
bash
npm run build        # Production build
npm run local        # Vercel dev with DotenvX
npm run vercel       # Vercel development
npm test            # Run tests
npm run test:cover  # Test with coverage
Development Workflow
1. Make Changes
Modify source files in /src/

Test in browser at http://localhost:5000

Check console for errors

2. Testing
bash
# Run tests
npm test

# Specific test file
npm test -- service.test.js

# With coverage
npm run test:cover
3. Commit Changes
Use conventional commits:

text
feat: Add search functionality
fix: Resolve sync state issue
docs: Update API documentation
refactor: Extract UI helpers
test: Add service.js tests
chore: Update dependencies
4. Pull Request
Create feature branch

Add/update tests

Update documentation if needed

Submit PR for review

Key Files & Responsibilities
src/service.js
State management (appList, currentPage, itemsPerPage)

Cache system (loadCache, saveCache, getSyncData, setIndividualSync)

Authentication helpers

Pagination calculations

src/app-init.js
Dashboard initialization

App creation logic with smart positioning

Sync operations (individual and batch)

Event handlers for UI interactions

src/router.js
Client-side routing

Auth guards for protected routes

View loading and initialization

src/util/ui-helpers.js
Toast notifications

Loading states

Confirm dialogs

Visual highlights

Adding New Features
New View
Create src/views/new-view.js:

javascript
export function renderNewView() {
  return `<div>New View</div>`;
}

export function initNewView() {
  // Initialization logic
}
Add to router (src/router.js):

javascript
import { renderNewView, initNewView } from './views/new-view.js';

const routes = {
  '/new-view': { protected: true, render: renderNewView, init: initNewView }
};
New Utility
Create src/util/new-utility.js

Export functions

Import where needed

Debugging
Common Issues
Sync states lost: Check localStorage for app_sync_cache

Pagination wrong: Verify current_page in localStorage

UI helpers not working: Check import statements and CSS

Debug Tools
In browser console:

javascript
// Check cache
JSON.parse(localStorage.getItem('app_sync_cache'))

// Check app state
appList.slice(0, 5).map(a => ({ name: a.name, synced: a.isSynced }))

// Check pagination
{
  currentPage: getCurrentPage(),
  itemsPerPage: getItemsPerPage(),
  totalPages: getTotalPages()
}
Code Quality
Linting
bash
# Add ESLint
npm install --save-dev eslint

# Create .eslintrc.js
module.exports = {
  extends: ['eslint:recommended'],
  env: { browser: true, es2022: true }
};
Formatting
bash
# Add Prettier
npm install --save-dev prettier

# Format all files
npx prettier --write src/
Testing Strategy
Unit Tests
service.test.js: State management and cache

util-functions.test.js: Utility functions

form-validator.test.js: Form validation

Integration Tests
Login → Dashboard navigation

App creation → Sync → Refresh

Pagination → Sync → Navigation

Manual Testing
Chrome, Firefox, Safari, Edge

Mobile responsiveness

Browser refresh scenarios

Performance Considerations
Cache usage: localStorage for instant state restoration

Pagination: Only render visible items

DOM updates: Minimal, targeted updates

Asset optimization: Webpack handles minification

Security Guidelines
Input validation: Always validate user input

Output encoding: Escape HTML in user content

Secure storage: Clear cache on logout

Environment variables: Use DotenvX for encryption

Accessibility (A11Y)
Keyboard navigation: All functionality accessible via keyboard

ARIA labels: Add to interactive elements

Color contrast: WCAG AA compliance

Focus management: Logical tab order

Browser Support
Chrome 60+

Firefox 55+

Safari 11+

Edge 79+

iOS Safari 11+

Android Chrome 60+