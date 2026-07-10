EventLens Studio X — v16.5.0
Dual-Domain Invitation + Gallery Analytics
Release date: 2026-07-10

WHAT THIS VERSION DOES
======================
1. Separates invitation-domain opens from gallery-domain opens.
2. Adds a dedicated Invitation analytics section:
   - Invitation opens
   - Unique invitation visitors
   - Opens today in Eastern Time
   - Sources, devices, browsers, countries/locations
   - RSVP, Directions, Blessings, Share, and Find My Photos clicks
3. Adds a dedicated Gallery analytics section:
   - Gallery opens
   - Unique gallery visitors
   - Camera opens, selfie searches, browse activity, downloads
4. Adds an Invitation → Gallery conversion funnel.
5. Shows the originating surface in Recent Activity.
6. Keeps existing camera, AI recognition, gallery, download, and invitation artwork unchanged.

PACKAGE CONTENTS
================
EventLens-Studio-X-v16.5.0/
  app/config.py
  app/main.py
  app/db.py
  app/templates/analytics.html
  app/templates/guest_home.html
  app/static/js/app.js

Varmisha-Invitation-v16.5.0/
  index.html
  _redirects
  script_inline.js
  script.js
  manifest.json
  sw.js
  style.css

INSTALL — STUDIO
================
1. Back up the current v16.4.2 project.
2. Copy the contents of EventLens-Studio-X-v16.5.0 over the matching project paths.
3. Restart EventLens.
4. Confirm the sidebar shows Version 16.5.0.
5. Republish Varmisha.

INSTALL — INVITATION WEBSITE
============================
1. Deploy the complete Varmisha-Invitation-v16.5.0 folder to the Cloudflare Pages/GitHub invitation project.
2. Do not remove the assets/images, assets/audio, assets/icons, or other existing asset folders from the live project.
3. Purge/refresh Cloudflare cache after deployment.
4. Open https://invite.janaeventlens.com/varmisha from a phone.

TEST CHECKLIST
==============
[ ] Invite link open increases Invitation Opens only.
[ ] Gallery link open increases Gallery Opens only.
[ ] Find My Photos increases Invitation → Gallery.
[ ] RSVP, Directions, Blessings, and Share clicks increase separately.
[ ] Camera and selfie search remain functional.
[ ] Downloads remain accurate.
[ ] Recent Activity identifies Invitation vs Gallery.
[ ] Time displays in America/Toronto (EDT/EST automatically).

IMPORTANT
=========
The invitation domain is a separate static website. Both the Studio package and
the invitation website package must be deployed for dual-domain analytics to work.
