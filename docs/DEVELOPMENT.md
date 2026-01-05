
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
```
### Development Server
```bash
# Start development server
npm run dev

# Server runs on http://localhost:5000
# Hot reload enabled
```

### Other Scripts
```bash
npm run build        # Production build
npm run local        # Vercel dev with DotenvX
npm run vercel       # Vercel development
npm test            # Run tests
npm run test:cover  # Test with coverage
```
### Production Console Management

In production builds, all console statements are automatically removed via TerserPlugin. To test:

```bash
# Build production locally
npm run build -- --mode=production

# Verify no console logs
grep -c "console\." public/app.js
```

**Development:** Use console.debug() with icons for visual feedback.
**Production:** All console methods removed except errors/warnings if needed.


## **Add to `/docs/SYNC_SYSTEM.md`:**

### Cache Cleanup

Automatic cache management prevents localStorage bloat:
- Maximum 100 cached apps retained
- Oldest syncs removed first
- Hourly cleanup in production
- Manual cleanup via `cleanupCache()` function

###*  Development Workflow

1. Make Changes
* Modify source files in /src/

* Test in browser at http://localhost:5000

* Check console for errors

2. Testing
```bash
# Run tests
npm test

# Specific test file
npm test -- service.test.js

# With coverage
npm run test:cover
```

3. Commit Changes
Use conventional commits:

```text
feat: Add search functionality
fix: Resolve sync state issue
docs: Update API documentation
refactor: Extract UI helpers
test: Add service.js tests
chore: Update dependencies
```
4. Pull Request
  1. Create feature branch

  2. Add/update tests

  3. Update documentation if needed

  4. Submit PR for review

### Key Files & Responsibilities
#### src/service.js
* State management (appList, currentPage, itemsPerPage)

* Cache system (loadCache, saveCache, getSyncData, setIndividualSync)

* Authentication helpers

* Pagination calculations

#### src/app-init.js
* Dashboard initialization

* App creation logic with smart positioning

* Sync operations (individual and batch)

* Event handlers for UI interactions

src/router.js
* Client-side routing

* Auth guards for protected routes

* View loading and initialization

src/util/ui-helpers.js
* Toast notifications

* Loading states

* Confirm dialogs

* Visual highlights

### Adding New Features
#### New View
1. Create src/views/new-view.js:

```javascript
export function renderNewView() {
  return `<div>New View</div>`;
}

export function initNewView() {
  // Initialization logic
}
```
2. Add to router (src/router.js):

```javascript
import { renderNewView, initNewView } from './views/new-view.js';

const routes = {
  '/new-view': { protected: true, render: renderNewView, init: initNewView }
};
```

### New Utility
1. Create src/util/new-utility.js

2. Export functions

3. Import where needed

### Debugging
#### Common Issues
1. Sync states lost: Check localStorage for app_sync_cache

2. Pagination wrong: Verify current_page in localStorage

3. UI helpers not working: Check import statements and CSS

### Debug Tools
In browser console:

```javascript
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
```

### Code Quality
#### Linting
```bash
# Add ESLint
npm install --save-dev eslint

# Create .eslintrc.js
module.exports = {
  extends: ['eslint:recommended'],
  env: { browser: true, es2022: true }
};
```

### Formatting
```bash
# Add Prettier
npm install --save-dev prettier

# Format all files
npx prettier --write src/
```

### Testing Strategy

#### Unit Tests
1. service.test.js: State management and cache

2. util-functions.test.js: Utility functions

3. form-validator.test.js: Form validation

#### Integration Tests
1. Login → Dashboard navigation

2. App creation → Sync → Refresh

3. Pagination → Sync → Navigation

#### Manual Testing
1. Chrome, Firefox, Safari, Edge

2. Mobile responsiveness

3. Browser refresh scenarios

#### Performance Considerations
1. Cache usage: localStorage for instant state restoration

2. Pagination: Only render visible items

3. DOM updates: Minimal, targeted updates

4. Asset optimization: Webpack handles minification

#### Security Guidelines
1. Input validation: Always validate user input

2. Output encoding: Escape HTML in user content

3. Secure storage: Clear cache on logout

4. Environment variables: Use DotenvX for encryption

#### Accessibility (A11Y)
1. Keyboard navigation: All functionality accessible via keyboard

2. ARIA labels: Add to interactive elements

3. Color contrast: WCAG AA compliance

4. Focus management: Logical tab order

#### Browser Support
* Chrome 60+

* Firefox 55+

* Safari 11+

* Edge 79+

* iOS Safari 11+

* Android Chrome 60+