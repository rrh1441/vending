const steps = [
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
    description: "Counter, lighting, a dedicated host, supplies, teardown. You don't lift a thing.",
  },
  {
    step: "04",
    title: "They rip",
    description: "Guests line up, pick a pack, rip it open, and go home with real cards.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-forest text-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
            Process
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">How it works</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-12">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <span className="inline-block border border-gold text-gold text-sm px-4 py-2 mb-6">
                {item.step}
              </span>
              <h3 className="font-serif text-xl mb-4">{item.title}</h3>
              <p className="text-cream/60 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
