## **File 5: `/docs/API_REFERENCE.md`**

## API Reference

### Authentication

### POST `/api/login`

Authenticate user with username and password hash.

**Request:**

```json
{
  "username": "admin",
  "password": "sha256_hash_of_password"
}
```

### Password Hashing (Frontend):

```javascript
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
```

### Response (Success):

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Response (Error):

```json
json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Status Codes:

- 200: Success

- 400: Missing or invalid parameters

- 401: Invalid credentials

- 500: Server error

## Mock Data Endpoints

#### Currently using mock data. Ready for real API integration.

## GET /api/applications

#### Get paginated applications (mock implementation).

### Query Parameters:

- page: Page number (1-10)

- limit: Items per page (10, 50, 100)

### Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "app-0001",
      "name": "0001-app",
      "isSynced": false,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### POST /api/applications/:id/sync

#### Sync individual application (mock implementation).

## Response:

```json
{
  "success": true,
  "data": {
    "id": "app-0001",
    "isSynced": true,
    "syncData": " >>> app-0001 (Synced at 14:30:45)",
    "lastSyncedAt": "2024-01-15T14:30:45Z"
  }
}
```

## Future API Structure

### Real Database Integration

#### When connecting to real database:

1. App Schema:

```javascript
{
id: "UUID from database",
name: "0001-app",
description: "Optional",
isSynced: false,
syncedAt: null,
createdAt: "ISO timestamp",
updatedAt: "ISO timestamp",
createdBy: "user_id"
}
```

2. User Schema:

```javascript
{
id: "UUID",
username: "admin",
passwordHash: "bcrypt_hash",
role: "admin|user",
createdAt: "ISO timestamp"
}
```

### WebSocket Events (Future)

#### For real-time updates:

```javascript
// Connection
const ws = new WebSocket("/ws");

// Events
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === "app.synced") {
    updateAppInUI(data.appId, data.syncData);
  }
};
```

### Error Handling

#### Standard Error Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

### Common Error Codes
* VALIDATION_ERROR: Input validation failed

* AUTH_REQUIRED: No authentication token provided

* INVALID_TOKEN: JWT token invalid or expired

* NOT_FOUND: Resource doesn't exist

* DUPLICATE_ENTRY: Resource already exists

* RATE_LIMITED: Too many requests

### Rate Limiting
* Production endpoints should implement:

* Login attempts: 5 per minute per IP

* API calls: 100 per minute per user

* Sync operations: 10 per minute per user

### CORS Configuration
Development: http://localhost:5000
Production: Your domain only

### API Versioning
Use header for future versions:

```text
Accept: application/vnd.app-registration.v1+json
```
### Security Updates v1.1.3

**Frontend JWT Validation:**
- Token expiry checked on each session verification
- Auto-logout on expired tokens
- 2-hour session duration enforced

**Production Optimizations:**
- Console statements removed in production builds
- CSS properly injected in production
- Cache size management implemented