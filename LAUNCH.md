# TinyTaps launch kit

## 5 ready-to-post captions

**1. WhatsApp parent groups (the honest dad post)**
> Made something for my 16-month-old and sharing in case it helps your little one too 🙂 It's a free website — tinytaps.com — where babies can tap the screen and pop bubbles, hear animal names, play a big colour piano. No ads, no login, nothing to install. Parents' menu is hidden so tiny fingers can't exit. Would love feedback!

**2. Instagram Reel caption (film your kid's hands + reactions, not face)**
> POV: you hand your toddler your phone and it's NOT YouTube 🙈
> 7 play modes • says their name • zero ads • works offline
> Built by a dad, free forever → tinytaps.com
> #toddleractivities #babyplay #screentime #toddlermom #toddlerdad #parentinghacks

**3. X / Twitter (builder angle)**
> My 16-month-old kept smashing my keyboard, so I built him a website.
> TinyTaps: 7 sensory play modes for babies, pentatonic sounds so everything sounds musical, hidden parent lock, PWA that works offline. No ads, no tracking, $0/month to run on Cloudflare.
> tinytaps.com

**4. Instagram/Facebook (the "quiet dinner" hook)**
> The 10 minutes of a restaurant dinner where you NEED the toddler occupied 🍽️👶 TinyTaps works offline once you add it to your home screen — bubbles, peekaboo, animal sounds, finger painting. Free, no ads, made by a parent. tinytaps.com

**5. LinkedIn (reach parent-professionals + builders)**
> Side project shipped: TinyTaps — a free, privacy-first play web app for babies and toddlers. One static page on Cloudflare, a 60-line Durable Object for a live "kids playing now" counter, total infra cost ₹0/month. My toughest stakeholder is 16 months old and the reviews are… loud. tinytaps.com

## Reddit r/Parenting or r/InternetIsBeautiful launch post

**Title:** I made a free, ad-free website where babies can safely smash the screen (and keyboard) — my 16-month-old is the QA team

**Body:**
My son kept grabbing my laptop and phone, and every "baby game" app I tried was full of ads and manipulative popups. So I built TinyTaps — a plain website, nothing to install: seven fullscreen play modes (bubble popping, finger painting, a colour piano tuned so every note sounds nice, peekaboo, animal sounds that say the word aloud, colour names, and classic smash-anything).

Safety stuff parents will care about: no ads ever, no accounts, no analytics or tracking of any kind, and the menu is hidden behind a 2-second hold so toddlers can't exit or click anything. It works offline if you add it to your home screen — flights and restaurants are the whole reason I built that part.

It's free and I intend to keep it that way. Would genuinely love feedback on what your little ones gravitate to — that decides what I build next. → tinytaps.com

*(Product Hunt version: tagline "A safe, free play world for tiny hands"; first comment = the story above + the privacy stance.)*

## 3 measurable growth ideas (privacy-safe)

1. **The share loop is the parent menu.** The "💌 Share TinyTaps" button sits right where parents already are (switching modes). Measure via a `?ref=share` URL parameter counted server-side in aggregate — no cookies, no user IDs. Target: shares/week trending up.

2. **SEO pages for the moments, not the product.** Publish 3 static pages targeting real searches: "baby keyboard smash game", "toddler airplane activities offline", "free baby games without ads". Each is one paragraph + the app embedded. Measure with Cloudflare's server-side, cookie-less analytics (aggregate only). Target: organic visits/month.

3. **Creator seeding with a hook they can film.** DM 20 parenting creators one line: "your toddler's first painting, saved from your phone" (Paint mode + screenshot). The counter gives them a live social-proof moment on camera ("look, 340 kids are playing right now"). Measure: referral spikes on the days clips go up. Costs nothing but DMs.

## Launch-day checklist
- [ ] OG preview renders on WhatsApp (paste link in a chat with yourself)
- [ ] PWA installs on one Android + one iPhone
- [ ] Counter shows 2+ with two devices
- [ ] Post #1 in 2–3 WhatsApp groups (soft launch, gather feedback for 3 days)
- [ ] Fix top complaint, then Reddit + Instagram the same morning
- [ ] Reply to every single comment for 48h (the algorithm and the parents both reward it)
