"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import FAQ from "@/app/components/FAQ";
import { venueTypes } from "@/app/lib/seo-data";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Decorative hero card — fictional, Salish-branded (not Pokémon/Nintendo IP).
function TradingCard({
  name,
  type,
  hp,
  attack,
  damage,
  className = "",
  style = {},
}: {
  name: string;
  type: "electric" | "water" | "fire";
  hp: number;
  attack: string;
  damage: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const typeColors = {
    electric: {
      bg: "from-amber-300 to-yellow-400",
      border: "border-amber-500",
      accent: "#F59E0B",
      icon: "⚡",
    },
    water: {
      bg: "from-cyan-400 to-blue-500",
      border: "border-blue-500",
      accent: "#0EA5E9",
      icon: "💧",
    },
    fire: {
      bg: "from-orange-400 to-red-500",
      border: "border-red-500",
      accent: "#EF4444",
      icon: "🔥",
    },
  };

  const colors = typeColors[type];

  return (
    <div
      className={`relative w-48 h-68 rounded-xl shadow-2xl overflow-hidden ${className}`}
      style={style}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg}`} />
      <div className="absolute inset-2 bg-cream/95 rounded-lg flex flex-col">
        <div className="flex justify-between items-center px-3 pt-2">
          <span className="font-serif font-bold text-sm text-dark">{name}</span>
          <span className="text-xs font-bold" style={{ color: colors.accent }}>
            {hp} HP
          </span>
        </div>
        <div className={`mx-3 mt-1 h-24 rounded bg-gradient-to-br ${colors.bg} flex items-center justify-center ${colors.border} border-2`}>
          <span className="text-4xl">{colors.icon}</span>
        </div>
        <div className="px-3 mt-2">
          <span
            className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full text-[#f5f4e1] font-medium"
            style={{ backgroundColor: colors.accent }}
          >
            {type}
          </span>
        </div>
        <div className="px-3 mt-2 flex-1">
          <div className="flex items-center gap-2 text-xs">
            <span style={{ color: colors.accent }}>{colors.icon}</span>
            <span className="font-medium text-dark">{attack}</span>
            <span className="ml-auto font-bold text-dark">{damage}</span>
          </div>
        </div>
        <div className="px-3 pb-2 flex justify-between items-center">
          <span className="text-[8px] text-muted">Salish Trading Co.</span>
          <span className="text-[10px] text-gold">★★★</span>
        </div>
      </div>
    </div>
  );
}

// Primary audience = property managers, markets, operators. Value props are
// framed for them (incremental revenue, zero ops, insured, flexible terms) —
// the independent-host revenue-share pitch lives in its own section lower down.
const benefits = [
  {
    title: "Incremental revenue",
    body: "A new income line from a few square feet of common-area space you already have. No capital outlay.",
  },
  {
    title: "Zero operations",
    body: "We deliver, stock, service, and run cashless payments. Your team never touches the machine or the cash.",
  },
  {
    title: "Tiny footprint",
    body: "About 2 ft × 2 ft and a standard outlet. It fits a concourse, a market hall, or an entrance.",
  },
  {
    title: "Fully insured",
    body: "COI provided on request. We carry the liability and the hardware — the placement is clean for you.",
  },
  {
    title: "Flexible terms",
    body: "A license fee or a percentage, permanent or seasonal. We work within your specialty-leasing process.",
  },
  {
    title: "On-trend category",
    body: "Sealed trading-card packs are a high-margin impulse draw with a devoted collector and family following.",
  },
];

const steps = [
  {
    step: "01",
    title: "We talk terms",
    body: "A quick call on placement and terms that fit how you handle vendors — license, percentage, or seasonal.",
  },
  {
    step: "02",
    title: "We install",
    body: "Delivered and set up, fully insured, with a COI in hand. No work or cost on your side.",
  },
  {
    step: "03",
    title: "We stock & service",
    body: "Genuine sealed packs, restocking, maintenance, and the payment hardware — all handled by us.",
  },
  {
    step: "04",
    title: "You collect",
    body: "A hands-off revenue line with clean reporting. If a spot underperforms, we simply relocate it.",
  },
];

// Primary fit: properties / markets / operators (hardcoded — not the SEO venueTypes).
const propertyFits = [
  {
    title: "Malls & shopping centers",
    body: "Concourse and common-area placements through your specialty-leasing or RMU program — permanent or seasonal.",
  },
  {
    title: "Markets & market halls",
    body: "Indoor common areas with steady, year-round foot traffic and a built-in browsing crowd.",
  },
  {
    title: "Seasonal farms & event venues",
    body: "Pumpkin patches, tree farms, festivals — big seasonal crowds with plenty of room near the entrance or market.",
  },
  {
    title: "Multi-location operators",
    body: "One agreement, placements across your whole portfolio. We scale with you.",
  },
];

const faqs = [
  {
    question: "How does a placement work for a property?",
    answer:
      "We work within your specialty-leasing or vendor process. Terms are flexible — a monthly license fee, a percentage of sales, or a seasonal/holiday placement. We deliver, stock, service, and run the machine; your team does nothing.",
  },
  {
    question: "Are you insured?",
    answer:
      "Yes. We carry full liability coverage and provide a certificate of insurance on request, naming the property as required. We own and maintain the hardware.",
  },
  {
    question: "How much space and power does it need?",
    answer:
      "Very little — about 2 ft × 2 ft of floor, roughly 5.9 ft tall, around 35 lbs. It tucks against a wall or in a corner and runs off a standard outlet.",
  },
  {
    question: "Who stocks and services it?",
    answer:
      "We do — entirely. Restocking, maintenance, the cashless payment hardware, and insurance are all on us. It's fully hands-off.",
  },
  {
    question: "Can you place across multiple locations?",
    answer:
      "Yes. One agreement can cover placements across a portfolio — malls, centers, or a market operator's sites. We start with one spot and scale where it performs.",
  },
  {
    question: "I run an independent venue — can I host one?",
    answer:
      "Absolutely, and the deal is different: for independent spots the machine is free and you earn a 10–20% revenue share (or a flat monthly rate). See “Great for independent operators” above, or just get in touch.",
  },
  {
    question: "Is this official Pokémon or Nintendo?",
    answer:
      "No. Salish Trading Co. is an independent operator and is not affiliated with or endorsed by The Pokémon Company or Nintendo. We stock genuine sealed collectible trading-card packs.",
  },
];

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    // Honeypot: if the hidden field is filled, it's a bot — fake success, send nothing.
    if (formData.get("company_website")) {
      setFormSubmitted(true);
      setIsSubmitting(false);
      return;
    }

    const data = {
      businessName: formData.get("businessName"),
      venueType: formData.get("venueType"),
      neighborhood: formData.get("neighborhood"),
      contactName: formData.get("contactName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      notes: formData.get("notes"),
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");
      setFormSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f4e1]/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#">
            <img src="/salishlogo.png" alt="Salish Trading Co." className="h-10" />
          </a>
          <div className="hidden md:flex gap-8 text-sm items-center">
            <a href="#how-it-works" className="text-muted hover:text-dark transition-colors">
              How It Works
            </a>
            <a href="#where-it-fits" className="text-muted hover:text-dark transition-colors">
              Where It Fits
            </a>
            <a href="#hosts" className="text-muted hover:text-dark transition-colors">
              For Hosts
            </a>
            <a href="#contact" className="bg-dark text-cream px-5 py-2 hover:bg-forest transition-colors">
              Get in touch
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: Text content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-8"
            >
              <motion.p
                variants={fadeIn}
                className="text-sm tracking-[0.2em] uppercase text-gold"
              >
                Greater Seattle
              </motion.p>
              <motion.h1
                variants={fadeIn}
                className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
              >
                High-traffic space,
                <br />
                <span className="italic">meet high-margin retail.</span>
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-lg md:text-xl text-muted max-w-xl leading-relaxed"
              >
                Trading-card vending machines for malls, markets, and event venues — fully run
                and insured by us. You just provide the outlet.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#contact"
                  className="bg-dark text-cream px-8 py-4 text-sm tracking-wide hover:bg-forest transition-colors"
                >
                  Start a conversation
                </a>
                <a
                  href="#how-it-works"
                  className="border border-dark px-8 py-4 text-sm tracking-wide hover:bg-dark hover:text-cream transition-colors"
                >
                  How it works
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Card fan display */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
            >
              <motion.div
                initial={{ rotate: -15, y: 20 }}
                animate={{ rotate: -15, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute"
                style={{ transform: "rotate(-15deg) translateX(-60px)" }}
              >
                <TradingCard
                  name="Zaplet"
                  type="electric"
                  hp={80}
                  attack="Thunder Shock"
                  damage="40"
                />
              </motion.div>
              <motion.div
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute z-10"
              >
                <TradingCard
                  name="Aquarix"
                  type="water"
                  hp={90}
                  attack="Hydro Splash"
                  damage="50"
                />
              </motion.div>
              <motion.div
                initial={{ rotate: 15, y: 20 }}
                animate={{ rotate: 15, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute"
                style={{ transform: "rotate(15deg) translateX(60px)" }}
              >
                <TradingCard
                  name="Embrix"
                  type="fire"
                  hp={70}
                  attack="Flame Burst"
                  damage="60"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-radial from-gold/20 via-transparent to-transparent rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-muted">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-muted to-transparent"
          />
        </motion.div>
      </section>

      {/* Why add one */}
      <section id="why-add" className="py-32 px-6 bg-dark text-cream">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
              Why add one
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Incremental revenue from space
              <br />
              <span className="italic">you already have.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="border border-cream/15 p-8">
                <h3 className="font-serif text-2xl mb-4">{b.title}</h3>
                <p className="text-cream/75 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-32 px-6 bg-forest text-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
              Process
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">How it works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <span className="inline-block border border-gold text-gold text-sm px-4 py-2 mb-6">
                  {item.step}
                </span>
                <h3 className="font-serif text-2xl mb-4">{item.title}</h3>
                <p className="text-cream/75 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What it is */}
      <section id="what-it-is" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
                What it is
              </p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
                A small machine,
                <br />
                <span className="italic">genuine sealed product.</span>
              </h2>
              <div className="space-y-6 text-muted leading-relaxed text-lg">
                <p>
                  A compact sealed-pack vending unit that fits in about two square feet
                  against a wall or in a corner. It runs off a standard outlet — that&apos;s
                  the only thing it needs from you.
                </p>
                <p>
                  It dispenses genuine sealed collectible trading-card packs — a popular
                  impulse buy that draws a crowd. Cashless payments throughout. We keep it
                  stocked and serviced; you keep your floor space earning.
                </p>
              </div>
            </div>
            {/* Machine illustration placeholder */}
            <div className="relative">
              <div className="aspect-[3/4] max-w-sm mx-auto bg-dark rounded-2xl border border-border flex flex-col overflow-hidden shadow-2xl">
                <div className="bg-forest text-cream text-center py-4 text-sm tracking-[0.2em] uppercase">
                  Salish Trading Co.
                </div>
                <div className="flex-1 grid grid-cols-3 grid-rows-4 gap-2 p-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-cream/10 border border-cream/20 rounded flex items-center justify-center"
                    >
                      <span className="text-cream/30 text-xs">pack</span>
                    </div>
                  ))}
                </div>
                <div className="bg-cream/5 border-t border-cream/15 py-4 px-4 flex items-center justify-between">
                  <span className="text-cream/40 text-xs">tap to pay</span>
                  <span className="text-gold text-xs">cashless</span>
                </div>
              </div>
              <p className="text-center text-xs text-muted mt-4">
                Illustration — final unit may vary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where it fits — properties / markets / operators (primary) */}
      <section id="where-it-fits" className="py-32 px-6 bg-cream/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
              Where it fits
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Built for high-traffic properties
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Anywhere collectors and families already gather and dwell — with a little
              common-area space and an outlet to spare.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {propertyFits.map((v) => (
              <div
                key={v.title}
                className="border border-border p-8 bg-[#f5f4e1] hover:border-gold/50 transition-colors"
              >
                <h3 className="font-serif text-2xl mb-4">{v.title}</h3>
                <p className="text-muted leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Great for independent operators (host model — secondary) */}
      <section id="hosts" className="py-32 px-6 bg-forest text-cream">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
              For independent venues
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
              Great for independent operators, too.
            </h2>
            <p className="text-cream/80 text-lg leading-relaxed">
              Run your own spot? Host a machine for free and earn a cut of every sale. We
              own it, stock it, service it, and insure it — you just give it a corner and an
              outlet. Take a 10–20% revenue share or a flat monthly rate, and we relocate it
              if it doesn&apos;t perform.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {venueTypes.map((v) => (
              <div key={v.slug} className="border border-cream/15 p-6">
                <h3 className="font-serif text-xl mb-2">{v.displayName}</h3>
                <p className="text-cream/70 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
          <a
            href="#contact"
            className="inline-block bg-cream text-dark px-8 py-4 text-sm tracking-wide hover:bg-gold hover:text-cream transition-colors"
          >
            Host a machine
          </a>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={faqs} subtitle="Common questions" />

      {/* Contact */}
      <section id="contact" className="py-32 px-6 border-t border-border">
        <div className="max-w-xl mx-auto">
          {!formSubmitted ? (
            <>
              <div className="text-center mb-12">
                <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
                  Get in touch
                </p>
                <h2 className="font-serif text-4xl md:text-5xl mb-4">
                  Let&apos;s find a spot for one.
                </h2>
                <p className="text-muted">
                  Property, market, event venue, or an independent spot of your own — tell us
                  a bit and we&apos;ll be in touch. No cost, no commitment.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* honeypot — bots fill this; humans never see it */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div>
                  <label htmlFor="businessName" className="block text-sm mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    required
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors placeholder:text-muted/70"
                    placeholder="Property, market, or venue name"
                  />
                </div>
                <div>
                  <label htmlFor="venueType" className="block text-sm mb-2">
                    I&apos;m a&hellip;
                  </label>
                  <select
                    id="venueType"
                    name="venueType"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors"
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    <option value="Mall / shopping center">Mall / shopping center</option>
                    <option value="Market or market operator">Market or market operator</option>
                    <option value="Farm or event venue">Farm or event venue</option>
                    <option value="Multi-location operator">Multi-location operator</option>
                    <option value="Independent venue (host)">Independent venue (host)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="neighborhood" className="block text-sm mb-2">
                    City / area
                  </label>
                  <input
                    type="text"
                    id="neighborhood"
                    name="neighborhood"
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors placeholder:text-muted/70"
                    placeholder="e.g. Bellevue, Snohomish, Ballard"
                  />
                </div>
                <div>
                  <label htmlFor="contactName" className="block text-sm mb-2">
                    Contact name
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors placeholder:text-muted/70"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors placeholder:text-muted/70"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm mb-2">
                    Phone <span className="text-muted">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors placeholder:text-muted/70"
                    placeholder="(206) 555-0123"
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm mb-2">
                    Anything else <span className="text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors resize-none placeholder:text-muted/70"
                    placeholder="Foot traffic, hours, anything we should know..."
                  />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-dark text-cream py-4 text-sm tracking-wide hover:bg-forest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Get in touch"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="font-serif text-3xl mb-2">Thanks — we&apos;ve got it.</p>
              <p className="text-muted">We&apos;ll be in touch shortly.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <img src="/salishlogo.png" alt="Salish Trading Co." className="h-8" />
            <p className="text-sm text-muted mt-2">Seattle, WA</p>
          </div>
          <p className="text-sm text-muted max-w-md md:text-right">
            Independent operator. Not affiliated with or endorsed by The Pokémon Company
            or Nintendo. &copy; 2026 Salish Trading Co.
          </p>
        </div>
      </footer>
    </main>
  );
}
