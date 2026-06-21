# Detailed Login Authentication Diagnostics Walkthrough

Separated the generic login authentication error alert into specific alerts to allow precise user troubleshooting.

## Changes Made

1. **Detailed Diagnostic Alerts on Login**:
   - **`main.js`**: Replaced the generic `"이메일 또는 비밀번호가 일치하지 않습니다."` alert in the login handler with split alerts:
     - If the email does not exist in local storage (and Firestore query returns empty/fails), it alerts: `"존재하지 않는 이메일 주소입니다. 가입 정보를 확인해 주세요."` (Non-existent email address. Please check your registration details).
     - If the email exists but the password does not match, it alerts: `"비밀번호가 일치하지 않습니다."` (Password does not match).
   - This provides immediate clarity on whether the client browser is lacking the registration record entirely (due to local storage clear/sandbox) or if there's a simple password mismatch.

2. **Redeployment**:
   - Committed changes and pushed to both `main` and `gh-pages` branches.

## Verification

- **Node Syntax Check**: Confirmed that the script parses successfully.
- **Git Push Status**: Confirmed remote `main` and `gh-pages` branches are updated to commit `ca44d69`.
- **Live URL**: [ZIPP Live Showroom](https://dkssiepdu.github.io/project-platform/)
