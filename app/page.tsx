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

const benefits = [
  {
    title: "Passive income",
    body: "Earn a cut of every sale with zero cost and zero work. The machine runs itself; the money is hands-off.",
  },
  {
    title: "A built-in draw",
    body: "A sealed-pack machine pulls people in and gives your regulars one more reason to stay and spend.",
  },
  {
    title: "Tiny footprint",
    body: "About 2 ft × 2 ft against a wall or in a corner. All it needs from you is a standard outlet.",
  },
  {
    title: "Fully hands-off",
    body: "We own, stock, service, insure, and run the payments. You never touch the hardware or the cash.",
  },
  {
    title: "Risk-free",
    body: "The machine is small and mobile. If a spot doesn't perform, we relocate it — no obligation on you.",
  },
  {
    title: "Your split, your call",
    body: "Take a 10–20% revenue share or a flat $100–$300 monthly rent. Whichever suits your venue.",
  },
];

const steps = [
  {
    step: "01",
    title: "You host",
    body: "Give the machine a few square feet and an outlet. That's the whole ask.",
  },
  {
    step: "02",
    title: "We install & run it",
    body: "We deliver it, stock genuine sealed packs, service it, insure it, and run the payments.",
  },
  {
    step: "03",
    title: "You earn",
    body: "Revenue share or flat monthly rent — your choice — on every sale.",
  },
  {
    step: "04",
    title: "We handle the rest",
    body: "Restocking, maintenance, payments, insurance. If a spot underperforms, we move it.",
  },
];

const faqs = [
  {
    question: "What's the catch?",
    answer:
      "There isn't one. We own the machine, stock it, service it, insure it, and run the payments. You provide a few square feet and an outlet, and take a cut of every sale. You never touch the hardware.",
  },
  {
    question: "How much will I make?",
    answer:
      "It depends on your foot traffic, so we only give ranges — never a guarantee. Most hosts choose a 10–20% revenue share or a flat $100–$300 per month. We'll talk through what fits your spot.",
  },
  {
    question: "How much room does it take?",
    answer:
      "Very little — about 2 ft × 2 ft of floor, roughly 5.9 ft tall, around 35 lbs. It tucks into a corner or against a wall and runs off a standard outlet.",
  },
  {
    question: "Is this official Pokémon or Nintendo?",
    answer:
      "No. Salish Trading Co. is an independent operator and is not affiliated with or endorsed by The Pokémon Company or Nintendo. We stock genuine sealed collectible trading-card packs.",
  },
  {
    question: "Who services and stocks it?",
    answer:
      "We do — entirely. Restocking, maintenance, the payment hardware, and insurance are all on us. It's fully hands-off for you.",
  },
  {
    question: "What does it cost me?",
    answer:
      "Nothing. There's no cost and no work on your end. If a location underperforms, we relocate the machine, so hosting is genuinely risk-free.",
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
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#how-it-works" className="text-muted hover:text-dark transition-colors">
              How It Works
            </a>
            <a href="#where-it-fits" className="text-muted hover:text-dark transition-colors">
              Where It Fits
            </a>
            <a href="#waitlist" className="text-muted hover:text-dark transition-colors">
              Host Waitlist
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
                Seattle, WA
              </motion.p>
              <motion.h1
                variants={fadeIn}
                className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
              >
                Passive income
                <br />
                <span className="italic">from a few square feet.</span>
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-lg md:text-xl text-muted max-w-xl leading-relaxed"
              >
                A sealed trading-card vending machine in your bar — we own it, stock it,
                and service it. You give it a corner and an outlet, and earn a cut of
                every sale.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#waitlist"
                  className="bg-dark text-cream px-8 py-4 text-sm tracking-wide hover:bg-forest transition-colors"
                >
                  Join the Host Waitlist
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

      {/* Why host one */}
      <section id="why-host" className="py-32 px-6 bg-dark text-cream">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
              Why host one
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Found money in the corner
              <br />
              <span className="italic">of a room you already have.</span>
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

      {/* Where it fits */}
      <section id="where-it-fits" className="py-32 px-6 bg-cream/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
              Where it fits
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Built for adult, high-dwell spots
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              The buyer is an adult with disposable income and nostalgia for the hobby —
              so we place machines where those people already linger.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {venueTypes.map((v) => (
              <div
                key={v.slug}
                className="border border-border p-8 bg-[#f5f4e1] hover:border-gold/50 transition-colors"
              >
                <h3 className="font-serif text-2xl mb-4">{v.displayName}</h3>
                <p className="text-muted leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={faqs} subtitle="Questions hosts ask" />

      {/* Host Waitlist */}
      <section id="waitlist" className="py-32 px-6 border-t border-border">
        <div className="max-w-xl mx-auto">
          {!formSubmitted ? (
            <>
              <div className="text-center mb-12">
                <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
                  Founding Hosts
                </p>
                <h2 className="font-serif text-4xl md:text-5xl mb-4">
                  Join the host waitlist
                </h2>
                <p className="text-muted">
                  We&apos;re selecting founding-host locations in Seattle now — early spots
                  get priority. No cost, no commitment.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="businessName" className="block text-sm mb-2">
                    Business name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    required
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors placeholder:text-muted/70"
                    placeholder="Your venue's name"
                  />
                </div>
                <div>
                  <label htmlFor="venueType" className="block text-sm mb-2">
                    Venue type
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
                    <option value="Barcade">Barcade</option>
                    <option value="Brewery or Taproom">Brewery or Taproom</option>
                    <option value="Dive bar">Dive bar</option>
                    <option value="Pool hall">Pool hall</option>
                    <option value="Tattoo parlor">Tattoo parlor</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="neighborhood" className="block text-sm mb-2">
                    Neighborhood
                  </label>
                  <input
                    type="text"
                    id="neighborhood"
                    name="neighborhood"
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors placeholder:text-muted/70"
                    placeholder="e.g. Ballard, Capitol Hill"
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
                  {isSubmitting ? "Submitting..." : "Join the Host Waitlist"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="font-serif text-3xl mb-2">You&apos;re on the founding-host list.</p>
              <p className="text-muted">We&apos;ll be in touch.</p>
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
