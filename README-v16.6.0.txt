EventLens Studio X — v16.6.0
Guest Gallery Activation — FINAL COMPATIBLE BUILD

This build matches the user's existing EventLens structure and uses the existing
guest_home.html page. It does not require a new gallery_locked.html template.

GALLERY STATES
==============
LOCKED (default)
- The public gallery page loads normally.
- Camera, upload, browse, search, results, and downloads are blocked.
- Clicking the camera button shows “Coming after the ceremony.”

PAUSED
- The public gallery page loads normally.
- Guests see a temporary paused message.

LIVE
- Camera, upload, AI selfie search, results, and downloads work normally.

PUBLISH CONTROLS
================
- Activate Guest Gallery
- Pause Guest Gallery
- Lock Guest Gallery
- Preview Current State

INSTALL — STUDIO
================
1. Back up v16.5.1.
2. Copy the files from EventLens-Studio-X-v16.6.0 into the matching active project paths.
3. This package includes BOTH root paths and app/ mirror paths because the current
   project contains both structures. Replace matching files in both locations.
4. Fully close EventLens and restart it once.
5. Confirm Version 16.6.0 and Guest Gallery = LOCKED on Publish.

INSTALL — INVITATION
====================
Deploy Varmisha-Invitation-v16.6.0 once to GitHub/Cloudflare.
The invitation camera button will always open the permanent gallery link.
After this one-time update, Locked / Paused / Live can be controlled only from Studio.

TEST ORDER
==========
1. LOCKED: open gallery link and click Find My Photos — existing message appears.
2. LIVE: activate from Publish and click Find My Photos — camera opens.
3. PAUSED: pause from Publish — paused message appears.
4. LIVE again: reactivate — full camera/search works.
5. Update the invitation website only after Studio passes all three tests.

Unrelated AI, invitation artwork, analytics, and photo matching were not changed.
