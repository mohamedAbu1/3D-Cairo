"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { trips, tripPackages, type TripPackageId } from "@/lib/trips";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export default function TripDetailPage() {
  const params = useParams<{ tripId: string }>();
  const trip = trips.find((item) => item.id === params.tripId) ?? trips[0];
  const [packageId, setPackageId] = useState<TripPackageId>("signature");
  const [travelers, setTravelers] = useState(2);
  const [arrivalDate, setArrivalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [ready, setReady] = useState(false);

  const selectedPackage = tripPackages.find((item) => item.id === packageId) ?? tripPackages[1];
  const whatsappMessage = useMemo(() => {
    const arrival = arrivalDate || "To be decided";
    const departure = returnDate || "To be decided";
    return [
      "Hello Nilora, I would like to plan this journey:",
      `Trip: ${trip.title}`,
      `Route: ${trip.region}`,
      `Package: ${selectedPackage.name}`,
      `Arrival date: ${arrival}`,
      `Return date: ${departure}`,
      `Travelers: ${travelers}`,
      "Please share availability and a tailored quote.",
    ].join("\n");
  }, [arrivalDate, returnDate, selectedPackage.name, travelers, trip.region, trip.title]);
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    : `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
  const galleryImage = trip.gallery[galleryIndex];
  const previousGalleryImage = trip.gallery[(galleryIndex + trip.gallery.length - 1) % trip.gallery.length];
  const nextGalleryImage = trip.gallery[(galleryIndex + 1) % trip.gallery.length];

  function changeGallery(direction: -1 | 1) {
    setGalleryIndex((current) => (current + direction + trip.gallery.length) % trip.gallery.length);
  }

  return (
    <main className="trip-detail-page min-h-screen overflow-hidden bg-[#06181c] text-white">
      <section className="relative isolate px-5 pb-20 pt-0 sm:px-8 lg:px-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_4%,rgba(39,215,203,0.18),transparent_30%),linear-gradient(180deg,rgba(3,20,24,0.82),#06181c_86%)]" />
        <SiteHeader />

        <div className="mx-auto max-w-[1536px]">
          <div className="mb-7 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/45">
            <a href="/trips" className="transition-colors hover:text-cream">Trips</a>
            <span aria-hidden="true">/</span>
            <span className="text-cream/80">{trip.title}</span>
          </div>

          <div className="trip-detail-hero overflow-hidden rounded-[30px] border border-white/15">
            <div className="trip-detail-image" style={{ backgroundImage: `url('${trip.image}')` }} />
            <div className="trip-detail-hero-shade" />
            <div className="trip-gallery-stage" aria-label={`${trip.title} interior gallery`}>
              <div className="trip-gallery-peek trip-gallery-peek-left" style={{ backgroundImage: `url('${previousGalleryImage}')` }} aria-hidden="true" />
              <div className="trip-gallery-peek trip-gallery-peek-right" style={{ backgroundImage: `url('${nextGalleryImage}')` }} aria-hidden="true" />
              <div className="trip-gallery-frame" style={{ backgroundImage: `url('${galleryImage}')` }}>
                <div className="trip-gallery-frame-shade" />
                <div className="trip-gallery-topline"><span>Inside the journey</span><strong>{galleryIndex + 1} / {trip.gallery.length}</strong></div>
                <div className="trip-gallery-bottomline">
                  <div className="trip-gallery-dots" aria-label="Choose gallery image">
                    {trip.gallery.map((image, index) => <button key={image} type="button" onClick={() => setGalleryIndex(index)} aria-label={`Show image ${index + 1}`} aria-current={galleryIndex === index ? "true" : undefined} className={galleryIndex === index ? "trip-gallery-dot trip-gallery-dot-active" : "trip-gallery-dot"} />)}
                  </div>
                  <div className="trip-gallery-arrows"><button type="button" onClick={() => changeGallery(-1)} aria-label="Previous gallery image">‹</button><button type="button" onClick={() => changeGallery(1)} aria-label="Next gallery image">›</button></div>
                </div>
              </div>
            </div>
            <div className="trip-detail-content relative flex min-h-[510px] flex-col justify-end p-6 sm:p-10 lg:min-h-[600px] lg:p-14">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.3em] text-cream">{trip.subtitle} · {trip.region}</p>
                <h1 className="mt-4 max-w-3xl font-display text-6xl leading-[0.88] tracking-[-0.06em] text-white sm:text-8xl">{trip.title}</h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{trip.description}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  <span className="trip-detail-meta">{trip.days} days</span>
                  <span className="trip-detail-meta">{trip.tempo} rhythm</span>
                  {trip.tags.map((tag) => <span key={tag} className="trip-detail-meta">{tag}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
            <div className="space-y-8">
              <section className="detail-copy-panel rounded-[26px] border border-white/12 p-6 sm:p-8" aria-labelledby="story-title">
                <p className="text-xs uppercase tracking-[0.28em] text-cream">The journey, in full</p>
                <h2 id="story-title" className="mt-3 font-display text-4xl leading-none text-white sm:text-5xl">A route with room to breathe.</h2>
                <p className="mt-6 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">Every Nilora route is a starting point, not a rigid schedule. We shape the details around the way you want to experience Egypt, then confirm the best available stays, hosts, and transfers with you on WhatsApp.</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="detail-feature"><span className="detail-feature-icon">✦</span><div><strong>Considered pacing</strong><p>Landmarks, local texture, and unhurried transitions.</p></div></div>
                  <div className="detail-feature"><span className="detail-feature-icon">≈</span><div><strong>Human support</strong><p>A real conversation before anything is confirmed.</p></div></div>
                  <div className="detail-feature"><span className="detail-feature-icon">◈</span><div><strong>Flexible by design</strong><p>Adapt the route to your dates, interests, and group.</p></div></div>
                  <div className="detail-feature"><span className="detail-feature-icon">⌁</span><div><strong>Local perspective</strong><p>Small details that make a familiar place feel new.</p></div></div>
                </div>
              </section>

              <section className="detail-copy-panel rounded-[26px] border border-white/12 p-6 sm:p-8" aria-labelledby="stops-title">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div><p className="text-xs uppercase tracking-[0.28em] text-cream">The route in four beats</p><h2 id="stops-title" className="mt-3 font-display text-4xl leading-none text-white">Follow the feeling.</h2></div>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40">{trip.region}</span>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {trip.stops.map((stop, index) => (
                    <div className="route-stop-detail" key={stop}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stop}</strong><i aria-hidden="true" /></div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="booking-panel rounded-[26px] border border-white/15 p-5 sm:p-6 lg:sticky lg:top-6" aria-labelledby="booking-title">
              <div className="booking-panel-glow" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.28em] text-cream">Make it yours</p>
                <h2 id="booking-title" className="mt-3 font-display text-4xl leading-none text-white">Build your route.</h2>
                <p className="mt-4 text-sm leading-6 text-white/55">Choose a starting style. We will confirm the live availability and final quote with you directly.</p>

                <div className="mt-7 space-y-2" role="radiogroup" aria-label="Choose a trip package">
                  {tripPackages.map((item) => (
                    <button key={item.id} type="button" role="radio" aria-checked={packageId === item.id} onClick={() => setPackageId(item.id)} className={`package-choice ${packageId === item.id ? "package-choice-active" : ""}`}>
                      <span className="package-radio" aria-hidden="true" /><span className="text-left"><strong>{item.name}</strong><small>{item.description}</small></span><span className="package-arrow" aria-hidden="true">↗</span>
                    </button>
                  ))}
                </div>

                <div className="date-range-card mt-6" aria-label="Choose arrival and return dates">
                  <div className="date-range-heading"><span>Plan your stay</span><small>{arrivalDate && returnDate ? "Dates selected" : "Arrival + return"}</small></div>
                  <div className="date-range-fields">
                    <label className="booking-field"><span>Arrival</span><input aria-label="Arrival date" type="date" value={arrivalDate} onInput={(event) => { const value = event.currentTarget.value; setArrivalDate(value); if (returnDate && value > returnDate) setReturnDate(""); }} onChange={(event) => { const value = event.currentTarget.value; setArrivalDate(value); if (returnDate && value > returnDate) setReturnDate(""); }} /></label>
                    <span className="date-range-arrow" aria-hidden="true">→</span>
                    <label className="booking-field"><span>Return</span><input aria-label="Return date" type="date" min={arrivalDate || undefined} value={returnDate} onInput={(event) => setReturnDate(event.currentTarget.value)} onChange={(event) => setReturnDate(event.currentTarget.value)} /></label>
                  </div>
                  {arrivalDate && returnDate && <p className="date-range-summary">Your journey runs from <strong>{arrivalDate}</strong> to <strong>{returnDate}</strong>.</p>}
                </div>
                <div className="mt-4">
                  <div className="booking-field"><span>Travelers</span><div className="traveler-control"><button type="button" aria-label="Remove traveler" onClick={() => setTravelers((value) => Math.max(1, value - 1))}>−</button><strong>{travelers}</strong><button type="button" aria-label="Add traveler" onClick={() => setTravelers((value) => Math.min(12, value + 1))}>+</button></div></div>
                </div>

                <a href={whatsappHref} target="_blank" rel="noreferrer" onClick={() => setReady(true)} className="whatsapp-button mt-6 w-full"><span className="whatsapp-mark">◌</span><span><strong>Continue on WhatsApp</strong><small>Start a real conversation about this route</small></span><span className="text-xl" aria-hidden="true">↗</span></a>
                <p className="mt-4 text-center text-[10px] uppercase tracking-[0.14em] text-white/35">No payment is taken on this page · quote first</p>
                {ready && <div role="status" className="mt-4 rounded-xl border border-[#5ee4d5]/35 bg-[#5ee4d5]/10 px-3 py-3 text-xs leading-5 text-[#a9fff5]">Your itinerary is ready to share. WhatsApp will open with the selected trip details.</div>}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

