## **File 2: `/docs/SYNC_SYSTEM.md`**

# Sync System

## Problem Solved1.

Sync states were lost on browser refresh because:

1. App IDs were r2. andom UUIDs regenerated on each load
2. Cache used old IDs that didn't match new IDs
3. Pagination did3. n't check cache for non-visible apps

## Solution: Stab4. le IDs + Cache

### 1. Stable ID 5. Generation (`src/statics/data.js`)

```javascript
// BEFORE (broken):
id: crypto.randomUUID(); // Changes every refresh

// AFTER (fixed):
id: `app-${paddedIndex}`; // app-0001, app-0002, ... app-0100
```

### 2. Cache Implementation (src/service.js)

```javascript
const CACHE_KEY = "app_sync_cache";

// Load cache on startup
const loadCache = () => {
  const saved = localStorage.getItem(CACHE_KEY);
  return saved ? JSON.parse(saved) : {};
};

// Auto-restore sync states
(() => {
  const cache = loadCache();
  Object.entries(cache).forEach(([id, cacheData]) => {
    if (cacheData.isSynced) {
      const app = appList.find((a) => a.id === id);
      if (app) app.isSynced = true;
    }
  });
})();
```

### 3. Cache-Aware Rendering (src/app-init.js)

```javascript
function createListItem(app) {
  // Check cache first
  const cachedData = getSyncData(app.id);

  // Update memory from cache
  if (cachedData?.isSynced && !app.isSynced) {
    app.isSynced = true;
  }

  const isActuallySynced = cachedData?.isSynced || app.isSynced;

  // Render button accordingly
  const buttonText = isActuallySynced ? "Refresh Info" : "Get Info";
  // ... rest of rendering
}
```

### Cache Structure

```json
{
  "app-0001": {
    "isSynced": true,
    "data": " >>> app-0001 (Synced at 14:30:45)",
    "syncedAt": "2024-01-15T14:30:45.123Z"
  }
}
```

## Operations

### Individual Sync

1. Click "Get Info" button

2. fetchAppInfo() called (300ms mock delay)

3. Update cache: setIndividualSync(app.id, true, data)

4. Update UI: Button → "Refresh Info", show UUID with timestamp

5. Show toast: "Synced [app-name]"

### Batch Sync ("Sync All")

1. Click "Sync All" button

2. Confirm dialog appears

3. All visible apps on current page marked as synced

4. Sequential mock API calls

5. Toast on completion: "Synced X apps"

### Auto-Restoration

1. On page load:

2. Cache loaded from localStorage

3. Each app's isSynced state restored

4. UI renders with correct button states

5. No API calls made (performance optimization)

### Pagination Integration

- Cache contains: All 100 apps

- Rendered: Only current page (10/50/100 apps)

- Per-item check: Each rendered app checks cache individually

- Page-specific: "Sync All" only affects current page apps

### Security

- Cache cleared on logout: Prevents data leakage on shared computers

- No sensitive data: Only sync status and display UUIDs

- User isolation: Ready for user-specific cache keys

### Testing

1. Sync app → Refresh → Verify "Refresh Info" still shown

2. Sync on page 2 → Navigate to page 1 → Return to page 2

3. "Sync All" on page 3 → Refresh → Verify all page 3 apps synced

4. Logout → Login → Verify fresh state (cache cleared)

