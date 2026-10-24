function ArrowRight() {
  return <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h15" /><path d="m13 5 7 7-7 7" /></svg>;
}

export default function SiteFooter() {
  return (
    <footer className="site-footer border-t border-white/10 px-5 pb-6 pt-16 sm:px-8 lg:px-20" id="experiences">
      <div className="mx-auto max-w-[1536px]">
        <div className="grid gap-10 pb-14 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-20">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cream">The Nilora point of view</p>
            <h2 className="font-display max-w-xl text-4xl leading-[0.96] text-white sm:text-6xl">One country.<br /><span className="text-cream">Infinite stories.</span></h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/65">From the first light over Giza to quiet sails on the Nile, every route is an invitation to feel Egypt beyond the postcard.</p>
        </div>

        <div className="footer-grid grid gap-10 border-y border-white/10 py-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-8">
          <div>
            <a href="/" className="inline-flex items-center gap-3" aria-label="Nilora home"><span className="font-display text-4xl tracking-[-0.06em] text-cream">Nilora</span><span className="text-sm tracking-[0.28em] text-cyan-100/70">≈≈≈</span></a>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">Egypt — closer than you imagine. Thoughtful journeys for curious travelers.</p>
            <a href="/plan?destination=Cairo" className="footer-link mt-5 inline-flex items-center gap-2 text-sm font-bold text-cream">Build your journey <ArrowRight /></a>
          </div>

          <div>
            <p className="footer-heading">Plan your journey</p>
            <div className="mt-4 grid gap-3 text-sm text-white/65">
              <a className="footer-link" href="/#destinations">Destinations</a>
              <a className="footer-link" href="/plan?destination=Cairo">Build your own route</a>
              <a className="footer-link" href="/trips">Trips &amp; stays</a>
              <a className="footer-link" href="/contact">Contact us</a>
            </div>
          </div>

          <div>
            <p className="footer-heading">Explore Egypt</p>
            <div className="mt-4 grid gap-3 text-sm text-white/65">
              <a className="footer-link" href="/plan?destination=Cairo">Cairo &amp; Giza</a>
              <a className="footer-link" href="/plan?destination=Nile%20Cruise">Nile Cruise</a>
              <a className="footer-link" href="/plan?destination=Luxor">Luxor</a>
              <a className="footer-link" href="/plan?destination=Aswan">Aswan</a>
            </div>
          </div>

          <div>
            <p className="footer-heading">Connect with us</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">Follow the next story, from the desert horizon to the blue edge of the Red Sea.</p>
            <div className="mt-5 flex flex-wrap gap-2" aria-label="Social links"><a className="social-link" href="/contact">Instagram</a><a className="social-link" href="/contact">Pinterest</a><a className="social-link" href="/contact">YouTube</a></div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[10px] uppercase tracking-[0.22em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Nilora Travel</p>
          <div className="flex gap-5"><a className="footer-link" href="/">Privacy</a><a className="footer-link" href="/">Terms</a></div>
          <p className="text-cream/75">Egypt forever in your story</p>
        </div>
      </div>
    </footer>
  );
}
