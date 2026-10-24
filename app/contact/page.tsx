"use client";

import { FormEvent, useState } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#06181c] text-white">
      <section className="relative isolate px-5 pb-16 pt-0 sm:px-8 lg:px-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_28%_18%,rgba(244,210,155,0.13),transparent_30%),linear-gradient(180deg,rgba(3,20,24,0.84),#06181c_90%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[640px] bg-cover bg-center opacity-25" style={{ backgroundImage: "url('/nilora-hero-bg-v2.png')" }} />

        <SiteHeader />

        <div className="relative mx-auto grid max-w-[1536px] gap-12 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-24 lg:py-24">
          <div className="max-w-xl">
            <p className="mb-5 text-xs uppercase tracking-[0.32em] text-cream">Connect with Nilora</p>
            <h1 className="font-display text-6xl leading-[0.92] tracking-[-0.05em] text-white sm:text-8xl">Let&apos;s plan your Egypt story.</h1>
            <p className="mt-8 max-w-lg text-base leading-8 text-white/70 sm:text-lg">Tell us what you want to feel, see, and remember. We&apos;ll help shape a route that feels distinctly yours.</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <a href="mailto:hello@nilora.travel" className="contact-detail rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cream/50 hover:bg-white/[0.06]">
                <span className="text-xs uppercase tracking-[0.25em] text-cream">Email</span>
                <span className="mt-2 block text-sm text-white/75">hello@nilora.travel</span>
              </a>
              <div className="contact-detail rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <span className="text-xs uppercase tracking-[0.25em] text-cream">Response time</span>
                <span className="mt-2 block text-sm text-white/75">Thoughtful replies, within one day.</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[28px] border border-white/15 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.3)] sm:p-7 lg:p-9">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-start justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/60 bg-cream/10 text-2xl text-cream">✓</span>
                <p className="mt-7 text-xs uppercase tracking-[0.3em] text-cream">Message received</p>
                <h2 className="mt-3 font-display text-5xl leading-none text-white">We&apos;ll be in touch.</h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/60">Your first step toward Egypt is on its way. Keep an eye on your inbox for a thoughtful reply from the Nilora team.</p>
                <button type="button" onClick={() => setSent(false)} className="secondary-button mt-8 rounded-full px-5 py-3 text-sm font-bold text-white">Send another message</button>
              </div>
            ) : (
              <form className="grid gap-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/65">Your name</label>
                  <input id="contact-name" name="name" required className="contact-input" placeholder="How should we call you?" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/65">Email address</label>
                  <input id="contact-email" name="email" type="email" required className="contact-input" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/65">Your idea</label>
                  <textarea id="contact-message" name="message" required rows={6} className="contact-input resize-none" placeholder="What kind of Egypt story are you imagining?" />
                </div>
                <button type="submit" className="primary-button mt-1 rounded-full px-6 py-3.5 text-sm font-bold">Start the conversation</button>
                <p className="text-center text-xs leading-5 text-white/40">No pressure, no preset package — just a clear first conversation.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
