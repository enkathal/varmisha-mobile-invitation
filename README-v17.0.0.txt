Varmisha Invitation v17.0.0 – Cloudflare Integration

DEPLOY
1. Copy the CONTENTS of this folder into the existing invitation GitHub/Cloudflare project.
2. Keep all existing assets/images, assets/audio and assets/icons folders.
3. Replace index.html, script.js, script_inline.js, style.css, manifest.json,
   favicon.png, sw.js and _redirects.
4. Commit and push to the production branch.
5. Purge Cloudflare cache or redeploy Pages.
6. Test in an incognito/private browser.

BEHAVIOR
- Invitation QR remains:
  https://invite.janaeventlens.com/varmisha
- Floating Camera button and Page 13 Find My Photos both open:
  https://gallery.janaeventlens.com/varmisha
- The smart gallery decides:
  new guest -> registration
  returning guest -> gallery
- When invitation is opened with ?return=gallery, a floating
  “Back to My Gallery” button is shown.
- Invitation open, page views, RSVP, Blessings, Directions, Share,
  Camera and Find My Photos clicks are sent to EventLens analytics.

PRESERVED
- All invitation artwork
- All 13 pages
- Music
- Existing buttons and modals
- Share metadata
- Current title and QR artwork
