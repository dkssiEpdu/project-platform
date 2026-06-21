# Legacy Accounts Overwriting & Duplicate Sanitization Walkthrough

Resolved the deadlock where legacy test accounts without passwords prevented new signups but failed logins, and sanitized duplicate/stale records in local storage.

## Changes Made

1. **Broke Signup/Login Deadlock for Legacy Accounts**:
   - **`main.js`**: Modified the duplicate email checking function during signup. It now only blocks registration if the existing record in `localStorage` or Firestore *contains a password* (`pw`).
   - If a matching email exists but does not have a password (meaning it's an old test record from prior development), the check is bypassed, allowing the user to register again to save their password and resolve their login issues.

2. **Sanitized Duplicate Records in Local Storage**:
   - **`main.js`**: Updated the signup local storage save block to filter out and delete any duplicate records for the same email address before pushing the new registration.
   - Updated the Firestore login sync-back block to also filter out and replace any duplicate local records for the authenticated email.
   - This ensures `localStorage` never contains multiple entries for the same user, which previously caused the lookup function `.find()` to get stuck on older records.

3. **Redeployment**:
   - Committed changes and pushed to both `main` and `gh-pages` branches.

## Verification

- **Node Syntax Check**: Confirmed that the script parses successfully.
- **Git Push Status**: Confirmed remote `main` and `gh-pages` branches are updated to commit `b4cd8dc`.
- **Live URL**: [ZIPP Live Showroom](https://dkssiepdu.github.io/project-platform/)
