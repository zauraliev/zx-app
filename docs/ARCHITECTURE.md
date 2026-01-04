# App Registration SPA - Architecture

## Tech Stack
- **Frontend**: Vanilla JavaScript (ES6+)
- **Build**: Webpack 5
- **Styles**: SCSS
- **Routing**: Client-side hash routing
- **State**: localStorage cache system
- **Auth**: JWT with password hashing
- **Deployment**: Vercel, Docker optional

## Project Structure
```text
app-registration-spa/
├── 📁 .github/workflows/
│   └── ci.yml                    # GitHub Actions CI/CD
├── 📁 api/                       # Vercel Serverless Functions
│   └── login.js                 # Authentication endpoint
├── 📁 src/
│   ├── 📁 __tests__/            # Test files
│   │   └── service.spec.js      # Service layer tests
│   ├── 📁 views/                # SPA Views
│   │   ├── home.js
│   │   ├── login.js
│   │   ├── dashboard.js
│   │   └── settings.js
│   ├── 📁 statics/              # Static/Mock Data
│   │   └── data.js              # 100 mock apps
│   ├── 📁 util/                 # Utility Functions
│   │   ├── util-functions.js    # General helpers
│   │   ├── form-validator.js    # Form validation
│   │   └── ui-helpers.js        # UI helper functions
│   ├── 📁 css/                  # Stylesheets (SCSS)
│   │   ├── style.scss
│   │   └── animation.scss
│   ├── app.js                   # Main entry point
│   ├── router.js                # Client-side routing
│   ├── service.js               # State management & auth
│   └── app-init.js              # Dashboard logic
├── 📁 public/                   # Build Output
│   ├── index.html              # HTML shell
│   ├── app.js                  # Built JavaScript bundle
│   └── app.map.js              # Source map for debugging
├── 📁 docs/                     # Organized Documentation
│   ├── API_REFERENCE.md        # API endpoints & usage
│   ├── ARCHITECTURE.md         # System architecture & design
│   ├── DEPLOYMENT.md           # Deployment instructions
│   ├── DEVELOPMENT.md          # Development setup & workflow
│   ├── SYNC_SYSTEM.md          # Sync system architecture
│   └── UI_HELPERS.md           # UI utilities documentation
├── 📁 __mocks__/               # Jest mocks (optional)
├── 📄 .babelrc                 # Babel configuration
├── 📄 .gitignore               # Git ignore rules
├── 📄 .vercelignore            # Vercel ignore rules
├── 📄 Dockerfile               # Docker configuration
├── 📄 README.md                # Main project documentation
├── 📄 package.json             # Dependencies & scripts
├── 📄 package-lock.json        # Lock file (auto-generated)
├── 📄 webpack.config.mjs       # Webpack configuration
├── 📄 jest.config.cjs          # Jest testing configuration
├── 📄 jest.setup.js            # Jest setup (optional)
├── 📄 build.js                 # Simple env test
├── 📄 server-combined.js       # Express dev server
├── 📄 vercel.json              # Vercel deployment config
├── 📄 .env.local.encrypted     # Encrypted environment variables
└── 📄 .env.production          # Production environment variables
```
## Core Components

### 1. State Management (`service.js`)
```javascript
// In-memory state
let appList = [];           // 100 applications
let currentPage = 1;        // Pagination
let itemsPerPage = 10;      // Page size

// Cache system
const CACHE_KEY = "app_sync_cache";
const cache = {             // localStorage structure
  "app-0001": {
    isSynced: true,
    data: " >>> app-0001 (Synced at 14:30)",
    syncedAt: "2024-01-15T14:30:45Z"
  }
};
```
### 2. Pagination System
Items per page: 10, 50, 100 (user selectable)

State persistence: current_page, items_per_page in localStorage

Navigation: First/Prev/Next/Last buttons with active state

### 3. Sync System
Individual sync: "Get Info" → Mock API call → Cache update

Batch sync: "Sync All" → Sync current page only

State persistence: Survives browser refresh via localStorage

### 4. Authentication
Login: Username/password → SHA-256 hash → API validation → JWT

Session: JWT stored in localStorage, validated on protected routes

Logout: Clears auth tokens AND user cache

### Data Flow
Page Load: Restore cache → Render apps → Show sync states

User Action: Update state → Save to cache → Update UI

Navigation: Router loads view → Initialize component

Browser Refresh: Cache preserved → Auto-restore on load

### Key Design Decisions
Stable IDs: app-0001 format (not random UUIDs) for cache matching

Cache-first: UI shows cached data immediately, no auto-resync

Page-bound sync: "Sync All" only affects current page

Security: Clear cache on logout for shared computers