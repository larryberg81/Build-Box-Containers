---
name: Canadian price localization
description: Durable pricing and market-selection rules for Canadian visitors.
---

Keep catalog prices and quote calculations in USD as the stable source of truth. Canadian visitors see converted CAD estimates, and submitted quotes include the currency and conversion rate used.

**Why:** Using one source currency avoids inconsistent catalog math while still giving Canadian customers useful localized estimates.

**How to apply:** Any new product, add-on, delivery fee, or quote total should enter calculations as USD and pass through the shared market formatter. Preserve the U.S./Canada visitor override and use a live server-proxied rate with a safe fallback.