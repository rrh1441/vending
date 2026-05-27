const steps = [
  {
    step: "01",
    title: "You host",
    description: "Give the machine a few square feet and an outlet. That's the whole ask.",
  },
  {
    step: "02",
    title: "We set it up",
    description: "We install it, stock genuine sealed packs, service it, insure it, and run the payments.",
  },
  {
    step: "03",
    title: "You earn",
    description: "Take a revenue share or a flat monthly rent — your choice — on every sale.",
  },
  {
    step: "04",
    title: "We handle the rest",
    description: "Restocking, maintenance, payments, insurance. If a spot underperforms, we relocate it.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-forest text-cream">
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
