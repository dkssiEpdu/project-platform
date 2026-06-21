# Login Verification & Email Notification Fix Walkthrough

Fixed issues where registered users could not log in due to email case-sensitivity and local storage cross-device isolation, and resolved missing email signup notifications.

## Changes Made

1. **Email Case-Insensitive Matching**:
   - **`main.js`**: Converted email inputs to lowercase during both signup and login before performing checks. This prevents casing mismatches (e.g. `Pvtmed1590@gmail.com` vs `pvtmed1590@gmail.com`).

2. **Cross-Device Firestore Login Fallback**:
   - **`main.js`**: Enabled storing the password (`pw` field) in Firestore during signup.
   - Updated the login handler to fall back to a Firestore query if the user is not found in local storage (or if they are on a different device).
   - Once authenticated via Firestore, the account is automatically synced back to the device's local storage for instant offline/speedy future logins.

3. **FormSubmit CAPTCHA Bypass**:
   - **`main.js`**: Added `_captcha: "false"` to the FormSubmit AJAX JSON request payload. This stops FormSubmit from showing CAPTCHA screens or silently blocking requests.

4. **Redeployment**:
   - Committed changes and pushed to both `main` and `gh-pages` branches.

## Verification

- **Node Syntax Check**: Confirmed that the script parses successfully.
- **Git Push Status**: Confirmed remote `main` and `gh-pages` branches are updated to commit `bf3743d`.
- **Live URL**: [ZIPP Live Showroom](https://dkssiepdu.github.io/project-platform/)
