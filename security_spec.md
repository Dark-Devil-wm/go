# Security Specification for Strength Fitness

## Data Invariants
- A User profile can only be created by the authenticated user with the matching UID.
- A User can only read their own private data.
- Programs are public for reading, but only admins can write them.
- Bookings must belong to a valid user and can only be modified by that user or an admin.

## The Dirty Dozen Payloads (Rejection Tests)
1. Create user with different UID.
2. Update user role to 'admin' without admin privileges.
3. Delete another user's profile.
4. Read bookings of another user.
5. Create a program as a regular client.
6. Inject a 1MB string into a username.
7. Set a past date for a new booking.
8. Update a confirmed booking to 'pending' as a client after it's confirmed.
9. Create a booking for a non-existent user.
10. Spoof `updatedAt` with client time.
11. Add a "ghost field" `isVerified: true` to a profile update.
12. Bulk list all users as a regular client.

## Test Runner (Logic)
The rules will enforce these by checking `request.auth.uid`, `request.time`, `incoming().keys()`, and `get()`/`exists()` lookups.
