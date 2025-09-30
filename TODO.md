# TODO: Fix OAuth State Mismatch and 401 Email Send Error

## Steps to Complete
- [x] Edit src/middlwer.ts: Update matcher to exclude /auth/callback
- [x] Edit src/app/utils/supabase/middlwer.ts: Fix allowed paths to include /screens/login and /auth/callback
- [x] Edit src/app/auth/callback/page.tsx: Add error handling for OAuth params
- [ ] Restart dev server if needed
- [ ] Test Google login flow
- [ ] Test addToGoogleCalendar email send (should resolve 401/400)

## Notes
- OAuth state mismatch caused by middleware redirecting on callback before session set
- Clander.tsx already fixed to prevent unauth requests and add logging
- No Resend domain config needed for localhost
- Route changed to expect body, client updated to send it
