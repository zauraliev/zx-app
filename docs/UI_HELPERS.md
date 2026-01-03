## **File 3: `/docs/UI_HELPERS.md`**

## UI Helpers

### Installation

```javascript
import {
  toast,
  HighlightManager,
  LoadingManager,
  ConfirmDialog,
} from "./util/ui-helpers.js";
```


### Toast Notifications

Replace alert() with modern notifications.

```javascript
// Success (green)
toast.success("App created!", 3000);

// Error (red)
toast.error("Sync failed", 5000);

// Info (blue)
toast.info("App added to page 3", 4000);

// Warning (orange)
toast.warning("Session expires soon", 5000);
```

### With Action Button

```javascript
toast.info("App added to page 3", 5000, {
  action: {
    label: "Go to Page",
    handler: () => navigateToPage(3),
  },
});
```

### Loading States

Show loading feedback on buttons.

### Usage

```javascript
// Show loading
LoadingManager.toggleButtonLoading("submit-btn", true);

// Hide loading
LoadingManager.toggleButtonLoading("submit-btn", false);

// Form loading
LoadingManager.show("registration-form", "Creating app...");
LoadingManager.hide("registration-form");
```

### Confirm Dialog

#### Replace confirm() with styled dialog.

### Usage

```javascript
const confirmed = await ConfirmDialog.show("Delete this app?", {
  title: "Confirm Deletion",
  okText: "Delete",
  cancelText: "Cancel",
  danger: true, // Red button
});

if (confirmed) {
  // Proceed with deletion
}
```

### Highlight Manager

#### Visual feedback for user actions.

### Usage

```javascript
// Highlight new app (green pulse)
HighlightManager.highlightNew("li-app-0101", 2000);

// Pulse pagination button
HighlightManager.highlightPage(3, 3000);

// Flash element (brief highlight)
HighlightManager.flash("selected-app", "#3B82F6");
```

### Form Helper

#### Form validation and state management.

### Usage

```javascript
// Show field error
FormHelper.showError("app-name", "App name is required");

// Clear error
FormHelper.clearError("app-name");

// Disable form
FormHelper.disableForm("registration-form");
```

### Integration

```javascript
async function registerApp(appName) {
  // Show loading
  LoadingManager.toggleButtonLoading("form-btn", true);

  try {
    await api.createApp(appName);
    toast.success("App created!");
    HighlightManager.highlightNew(`li-${newAppId}`);
  } catch (error) {
    toast.error("Creation failed");
  } finally {
    LoadingManager.toggleButtonLoading("form-btn", false);
  }
}
```

### CSS Requirements

#### Add to style.scss:

```scss
// Toast styles
.toast-success {
  background: linear-gradient(135deg, #10b981, #059669);
}
.toast-error {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

// Highlight animations
.highlight-new {
  animation: highlightPulse 2s ease;
  border-left: 3px solid #10b981;
}

// Loading spinner
.loading-spinner {
  border: 2px solid #e5e7eb;
  border-top-color: #3b82f6;
  animation: spin 1s linear infinite;
}
```



