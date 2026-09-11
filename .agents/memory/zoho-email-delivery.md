---
name: Zoho email delivery
description: Confirmed provider constraint for website inquiry and quote email.
---

Use Zoho SMTP for website inquiry and quote delivery; do not switch the transport to Gmail without an explicit provider change.

**Why:** The mailbox is Zoho-hosted, and the owner confirmed that an end-to-end formal quote test was delivered successfully through the Zoho transport.

**How to apply:** Preserve the Zoho SMTP transport when changing contact or quote flows, and verify both the API success response and actual inbox delivery after mail-related configuration changes.