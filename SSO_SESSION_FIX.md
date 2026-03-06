# SSO Session Replacement Guide (Target Portals)

To ensure that a new SSO login from the CRM correctly replaces any existing local session in the target portal (HRMS, Student Portal, etc.), add the following logic to your portal's frontend.

## The Problem
When a user logs into a portal through the CRM, a `token` is passed in the URL. However, if the portal already has an `accessToken` or `user` object in `localStorage`, the application might load the previous session before the SSO flow can run.

## The Solution
The target portal must check for the `token` parameter in the URL and **explicitly clear existing storage** if it is present.

### Implementation Snippet

Add this to your main entry point (e.g., `App.jsx`, `Layout.jsx`, or inside your `AuthContext` provider).

```javascript
import { useEffect } from 'react';

// Place this early in your component lifecycle
const SSOHandler = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const ssoToken = urlParams.get('token');

        if (ssoToken) {
            console.log('SSO Token detected. Clearing existing local sessions to prioritize new login.');
            
            // 1. Clear common session keys
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            
            // 2. Clear any other application-specific auth state if necessary
            // Example: sessionStorage.clear();
            
            // The existing SSO verify-token logic in your app will now proceed 
            // with a clean slate using the new token from the URL.
        }
    }, []);

    return null;
};
```

### Why this works
By clearing `localStorage` as soon as the app detects a `?token=` parameter, you ensure that the application doesn't "auto-login" the old user using cached credentials. This forces the app to validate the new SSO token and establish a fresh session for the correct user.
