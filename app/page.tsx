"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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

// Card component for the hero
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
      {/* Card background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg}`} />

      {/* Card frame */}
      <div className="absolute inset-2 bg-cream/95 rounded-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-3 pt-2">
          <span className="font-serif font-bold text-sm text-dark">{name}</span>
          <span className="text-xs font-bold" style={{ color: colors.accent }}>
            {hp} HP
          </span>
        </div>

        {/* Image area */}
        <div className={`mx-3 mt-1 h-24 rounded bg-gradient-to-br ${colors.bg} flex items-center justify-center ${colors.border} border-2`}>
          <span className="text-4xl">{colors.icon}</span>
        </div>

        {/* Type badge */}
        <div className="px-3 mt-2">
          <span
            className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full text-[#f5f4e1] font-medium"
            style={{ backgroundColor: colors.accent }}
          >
            {type}
          </span>
        </div>

        {/* Attack */}
        <div className="px-3 mt-2 flex-1">
          <div className="flex items-center gap-2 text-xs">
            <span style={{ color: colors.accent }}>{colors.icon}</span>
            <span className="font-medium text-dark">{attack}</span>
            <span className="ml-auto font-bold text-dark">{damage}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 pb-2 flex justify-between items-center">
          <span className="text-[8px] text-muted">Salish Trading Co.</span>
          <span className="text-[10px] text-gold">★★★</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
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
            <a href="#events" className="text-muted hover:text-dark transition-colors">
              Events
            </a>
            <a href="#waitlist" className="text-muted hover:text-dark transition-colors">
              Waitlist
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
                An open bar
                <br />
                <span className="italic">for trading cards.</span>
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-lg md:text-xl text-muted max-w-xl leading-relaxed"
              >
                A counter stacked with sealed Pokémon packs at your wedding, bar mitzvah, or celebration. Guests walk up, pick a pack, rip it open, and keep whatever they pull.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#waitlist"
                  className="bg-dark text-cream px-8 py-4 text-sm tracking-wide hover:bg-forest transition-colors"
                >
                  Join the Waitlist
                </a>
                <a
                  href="#how-it-works"
                  className="border border-dark px-8 py-4 text-sm tracking-wide hover:bg-dark hover:text-cream transition-colors"
                >
                  See How It Works
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
              {/* Cards fanned out */}
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

              {/* Glow effect behind cards */}
              <div className="absolute inset-0 bg-gradient-radial from-gold/20 via-transparent to-transparent rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-muted">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-muted to-transparent"
          />
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 bg-dark text-cream">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
              The Experience
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
              Think open bar.
              <br />
              <span className="italic">But for Pokémon cards.</span>
            </h2>
            <div className="space-y-6 text-cream/70 leading-relaxed text-lg">
              <p>
                Guests line up. They pick a pack. They rip it open. The whole room watches. Someone pulls a holographic Charizard and doesn&apos;t know what they&apos;re holding until everyone loses their mind.
              </p>
              <p>
                The bride rips a 1999 base set pack. A grandfather pulls a rare card and suddenly he&apos;s the center of attention. Kids and adults end up at the same counter for the first time all night — all of them excited about the same thing.
              </p>
              <p>
                No cost to the guest. No prices visible. Just the pop of foil wrappers, the thrill of the pull, and stories they&apos;ll be telling for years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
              Events
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">
              Built for the nights that matter
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Weddings",
                description:
                  "The reception moment that brings every generation to the same counter. Uncles and nieces, new in-laws, the friend who didn't know anyone — suddenly they're all talking.",
                status: "waitlist",
              },
              {
                title: "Bar & Bat Mitzvahs",
                description:
                  "A centerpiece the kids will actually remember, and one the adults will fight for a turn at.",
                status: "waitlist",
              },
              {
                title: "Sweet 16s",
                description:
                  "Forget the photo booth. Give them the party their whole feed will be posting from.",
                status: "waitlist",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="border border-border p-8 hover:border-gold/50 transition-colors group"
              >
                <h3 className="font-serif text-2xl mb-4">{event.title}</h3>
                <p className="text-muted leading-relaxed mb-6">{event.description}</p>
                <a
                  href="#waitlist"
                  className="text-sm tracking-wide text-gold group-hover:underline"
                >
                  Join Waitlist &rarr;
                </a>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="border border-border p-8 hover:border-gold/50 transition-colors group">
              <h3 className="font-serif text-2xl mb-4">Company Events</h3>
              <p className="text-muted leading-relaxed mb-6">
                Team building that doesn&apos;t feel forced. The whole office around one counter, finally having fun together.
              </p>
              <a
                href="#waitlist"
                className="text-sm tracking-wide text-gold group-hover:underline"
              >
                Join Waitlist &rarr;
              </a>
            </div>
            <div className="border border-border p-8">
              <h3 className="font-serif text-2xl mb-4">Fairs & Festivals</h3>
              <p className="text-muted leading-relaxed mb-6">
                Crowd-drawing, memory-making, and impossible to walk past.
              </p>
              <span className="text-sm tracking-wide text-muted">
                Stay tuned for dates
              </span>
            </div>
            <div className="border border-border p-8">
              <h3 className="font-serif text-2xl mb-4">Retail & Vending</h3>
              <p className="text-muted leading-relaxed mb-6">
                Automated pack-ripping stations for game stores and entertainment venues.
              </p>
              <span className="text-sm tracking-wide text-muted">Coming soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 px-6 bg-forest text-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
              Process
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">How it works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {[
              {
                step: "01",
                title: "Book",
                description: "Tell us about your event. We design the setup around your venue and guest count.",
              },
              {
                step: "02",
                title: "Choose your packs",
                description: "Modern sets, premium vintage, or a mix. Everything sealed and authenticated.",
              },
              {
                step: "03",
                title: "We show up",
                description: "Counter, lighting, staff, supplies, teardown. You don't lift a thing.",
              },
              {
                step: "04",
                title: "They rip",
                description: "Guests line up, pick a pack, rip it open, and go home with real cards.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <span className="inline-block border border-gold text-gold text-sm px-4 py-2 mb-6">
                  {item.step}
                </span>
                <h3 className="font-serif text-2xl mb-4">{item.title}</h3>
                <p className="text-cream/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-32 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
              Get Started
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Get on the list</h2>
            <p className="text-muted">
              We&apos;re booking our first season now. Tell us about your event.
            </p>
          </div>

          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors"
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
                  required
                  className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="eventType" className="block text-sm mb-2">
                  Event type
                </label>
                <select
                  id="eventType"
                  required
                  className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="wedding">Wedding</option>
                  <option value="barmitzvah">Bar / Bat Mitzvah</option>
                  <option value="sweet16">Sweet 16</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm mb-2">
                  Approximate date
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm mb-2">
                  Guest count
                </label>
                <select
                  id="guests"
                  className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="under50">Under 50</option>
                  <option value="50-100">50–100</option>
                  <option value="100-200">100–200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm mb-2">
                  Anything else we should know <span className="text-muted">(optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full px-4 py-3 bg-transparent border border-border focus:border-dark outline-none transition-colors resize-none"
                  placeholder="Tell us about your event..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-dark text-cream py-4 text-sm tracking-wide hover:bg-forest transition-colors"
              >
                Get on the list
              </button>
            </form>
          ) : (
            <div className="text-center py-12">
              <p className="font-serif text-2xl mb-4">You&apos;re in.</p>
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
          <p className="text-sm text-muted">
            &copy; 2026 Salish Trading Co. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
