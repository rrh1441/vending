# Rebuild Prompt — Salish Trading Co (Host-Acquisition Site)

> Paste this as the task prompt for an agent working in the `~/vending` Next.js repo.
> It is self-contained: it carries the full business model so you don't need outside context.

---

## What you're building

Rebuild this site to reflect Salish Trading Co's **current business model: placing premium sealed
trading-card (Pokémon) vending machines into adult, high-traffic venues, where the venue hosts the
machine and earns passive income.** The visitor we're converting is a **venue owner/manager**, not a
consumer.

**This replaces the old positioning.** `copy.md` describes a prior, different business (a pack-ripping
counter for weddings/parties). Treat that as superseded — do not carry over the events/weddings framing.
If a "we also do events" mention is wanted later, it's a secondary page, not the homepage.

## The business model (ground truth)

- We (Salish Trading Co, Seattle) **own, stock, service, insure, and run the payment hardware** on a
  small trading-card vending machine. The host gives it **a few square feet and an outlet** — nothing else.
- The host earns **passive income**: their choice of a **revenue share (10–20% of sales)** — lead with
  this — or a flat monthly rent ($100–$300). **Zero cost, zero work** to the host.
- The product is **sealed trading-card packs** (Pokémon and similar), a popular impulse/collectible buy
  that draws a crowd. Genuine sealed product.
- Target hosts: **adult, high-dwell, independent venues** — barcades, breweries/taprooms, dive bars,
  pool halls, tattoo parlors. The buyer at the machine is an adult (25–40) with disposable income and
  nostalgia for the hobby. (Not kids; not card shops — those are competitors.)
- The machine is **small and mobile**: ~2 ft × 2 ft of floor, ~5.9 ft tall, ~35 lbs. If a location
  underperforms, we relocate it — so hosting is genuinely risk-free for the venue.
- We're selecting **founding host locations now** — early spots get priority. The site's job is to get
  venue owners onto the **host waitlist**.

## Pages / sections to build (host POV)

1. **Hero** — headline speaks to a venue owner. e.g. "Passive income from a few square feet."
   Subhead: a trading-card vending machine in your bar — we own it, stock it, service it; you earn a
   cut of every sale. CTAs: **Join the Host Waitlist** · **How it works**.
2. **Why host one** — benefit cards: passive income (zero cost/work), a draw that pulls people in and
   makes them linger, tiny footprint, fully hands-off, risk-free (mobile — we move it if it doesn't
   perform).
3. **How it works** — 1) You host (space + outlet). 2) We install, stock, service, insure, run payments.
   3) You earn — revenue share or flat rent, your choice. 4) We handle everything else.
4. **What it is** — the machine + product. Small sealed-pack vending unit (~2×2 ft, ~5.9 ft tall, 35 lbs,
   wall-or-stand). Genuine sealed collectible packs. Cashless. Photo/illustration placeholder.
5. **Where it fits** — venue types: barcades, breweries & taprooms, dive bars, pool halls, tattoo
   parlors, and similar adult, high-dwell spots.
6. **FAQ** — answer the real objections: What's the catch? (none — we own/stock/service, you take a cut)
   · How much will I make? (depends on traffic — ranges only, never a guarantee; most hosts do a 10–20%
   share or flat rent) · How much room? (~2×2 ft) · Is it official Pokémon/Nintendo? (**No — independent
   operator, genuine sealed product, not affiliated with or endorsed by The Pokémon Company or Nintendo**)
   · Who services it? (we do) · What does it cost me? (nothing).
7. **Host waitlist** — the conversion. Form fields: **Business name · Venue type (Barcade / Brewery or
   Taproom / Dive bar / Pool hall / Tattoo parlor / Other) · Neighborhood · Contact name · Email · Phone
   (optional) · Anything else**. Success: "You're on the founding-host list. We'll be in touch."

## Hard guardrails (must follow — legal/brand)

- **Never claim affiliation with The Pokémon Company or Nintendo** and never use their logos/IP for
  branding. Say "trading cards" / "collectibles." Genuine sealed product, independent operator.
- **Never guarantee earnings.** Ranges only ("most hosts do a 10–20% share or a flat $100–$300/month").
- Be honest it's an **early founding-locations waitlist**, not "machine installed tomorrow."
- Tone: clean, confident, local PNW, plain language. No hype, no exclamation spam.

## Technical constraints

- This is a **non-standard Next.js** (see `CLAUDE.md`/`AGENTS.md`): **read the relevant guides in
  `node_modules/next/dist/docs/` before writing code.** Honor deprecation notices. Don't assume training-data APIs.
- **Reuse the existing waitlist plumbing.** Inspect `app/` and `data/` first — there's already a waitlist
  flow (the old events form). Adapt its API route + storage to the new host fields rather than rebuilding
  submission from scratch. Keep submissions landing wherever they currently land.
- Tailwind + `framer-motion` are available. Keep it fast, accessible, mobile-first.
- Run `npm run dev` (port 3000) and `npm run lint`; verify the waitlist submit works end-to-end before finishing.
- Update `copy.md` to the new host-model copy so the repo's source-of-truth copy matches the site.

## Definition of done

- Homepage sells the host/placement model to a venue owner; no wedding/events framing remains on it.
- Host waitlist form submits successfully and stores the new fields.
- FAQ includes the Pokémon/Nintendo non-affiliation line and the no-earnings-guarantee framing.
- `npm run lint` clean; `npm run build` succeeds.
