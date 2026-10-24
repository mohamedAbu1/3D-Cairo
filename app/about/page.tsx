import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const principles = [
  {
    number: "01",
    title: "Routes with a point of view",
    copy: "We shape each itinerary around a feeling: a quiet morning on the Nile, a first look at ancient stone, or a table worth travelling for.",
  },
  {
    number: "02",
    title: "Egypt beyond the postcard",
    copy: "The well-known landmarks are only the beginning. Nilora makes room for slower moments, local detail, and the stories between the stops.",
  },
  {
    number: "03",
    title: "Clarity at every step",
    copy: "From the first destination search to the final plan, the experience stays calm, considered, and easy to navigate.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#06181c] text-white">
      <section className="relative isolate px-5 pb-16 pt-0 sm:px-8 lg:px-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_8%,rgba(39,215,203,0.18),transparent_34%),linear-gradient(180deg,rgba(3,20,24,0.76),#06181c_92%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[660px] bg-cover bg-center opacity-35" style={{ backgroundImage: "url('/nilora-hero-bg-v2.png')" }} />

        <SiteHeader />

        <div className="relative mx-auto max-w-[1536px]">
          <div className="grid min-h-[620px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-24">
            <div className="max-w-2xl">
              <p className="mb-5 text-xs uppercase tracking-[0.32em] text-cream">The Nilora point of view</p>
              <h1 className="font-display max-w-2xl text-6xl leading-[0.92] tracking-[-0.05em] text-white sm:text-8xl">
                Egypt is a feeling before it is a destination.
              </h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
                Nilora is a more thoughtful way to discover Egypt — a place where history, water, desert, and everyday life meet in one unforgettable story.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="/#destinations" className="primary-button inline-flex items-center rounded-full px-6 py-3.5 text-sm font-bold">Explore destinations</a>
                <a href="/contact" className="secondary-button inline-flex items-center rounded-full px-6 py-3.5 text-sm font-bold text-white">Talk to Nilora</a>
              </div>
            </div>

            <div className="about-orbit relative mx-auto aspect-square w-full max-w-[540px] overflow-hidden rounded-[34px] border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/nilora-hero-bg-v2.png')" }} />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(3,19,23,0.12),rgba(3,19,23,0.7))]" />
              <div className="absolute inset-x-7 bottom-7 rounded-2xl border border-white/15 bg-[#06181c]/75 p-5 backdrop-blur-md sm:inset-x-9 sm:bottom-9 sm:p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-cream">Our compass</p>
                <p className="mt-3 font-display text-3xl leading-tight text-white sm:text-4xl">Curiosity first.<br /><span className="text-cream">Always.</span></p>
              </div>
            </div>
          </div>

          <div className="border-y border-white/10 py-14 sm:py-16">
            <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cream">What guides us</p>
                <h2 className="mt-3 font-display text-4xl leading-none text-white sm:text-5xl">A softer way to travel.</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-white/55">Designed for travellers who want the landmarks, but also want to understand the place around them.</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {principles.map((principle) => (
                <article key={principle.number} className="about-card rounded-[24px] border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-cream/40 hover:bg-white/[0.06] sm:p-7">
                  <p className="text-sm text-cream">{principle.number}</p>
                  <h3 className="mt-14 font-display text-3xl leading-tight text-white">{principle.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/60">{principle.copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-7 py-14 sm:flex-row sm:items-center sm:justify-between sm:py-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cream">Ready when you are</p>
              <h2 className="mt-3 font-display text-4xl leading-none text-white sm:text-5xl">Your next story starts here.</h2>
            </div>
            <a href="/contact" className="secondary-button inline-flex w-fit items-center rounded-full px-6 py-3.5 text-sm font-bold text-white">Plan with us</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
