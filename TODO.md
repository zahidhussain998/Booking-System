# Debugging and Fixing the 400 Bad Request Error

## Debugging Steps:
1. **Error Analysis**: The error is a 400 Bad Request on POST to Supabase /rest/v1/rooms endpoint.
2. **Code Inspection**: Examined userSlice.ts for the addRoom thunk, which sends JSON payload via fetch.
3. **Usage Search**: Found addRoom is dispatched in booking/page.tsx when creating a room.
4. **Form Issues**: Discovered the submit button lacks type="submit", preventing form submission.
5. **Image Handling**: Image upload is asynchronous but not awaited, leading to null/undefined image_url.
6. **Field Mismatches**: Found inconsistencies like image_Url vs image_url, and potential typos in field names.
7. **Auth Check**: Verified users are authenticated, but headers use anon key instead of session token.

## Fixes to Implement:
- [ ] Fix submit button in booking/page.tsx to type="submit"
- [ ] Correct field name from image_Url to image_url
- [ ] Implement proper image upload handling (await completion before submission)
- [ ] Update headers to use session access token instead of anon key
- [ ] Verify Supabase table column names match the payload fields
- [ ] Add error handling and loading states
