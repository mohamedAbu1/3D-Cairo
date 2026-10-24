"use client";

import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import {
  getPlannerDestination,
  plannerDestinations,
  plannerDurations,
  plannerInterests,
  plannerModes,
  type JourneyMode,
  type PlannerDestination,
  type PlannerInterest,
} from "@/lib/journey-planner";

function encodeWhatsApp(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

type JourneyPace = "Slow" | "Balanced" | "Full";
type StayStyle = "Signature" | "Family stay" | "Private villa";
type TransferStyle = "Private driver" | "River / boat" | "Mix of both";

const plannerPaces: JourneyPace[] = ["Slow", "Balanced", "Full"];
const plannerStays: StayStyle[] = ["Signature", "Family stay", "Private villa"];
const plannerTransfers: TransferStyle[] = ["Private driver", "River / boat", "Mix of both"];

function suggestedStopIds(destination: PlannerDestination, mode: JourneyMode, duration: number) {
  const baseRoute = destination.routes[mode];
  return duration >= 10 ? destination.stops.map((stop) => stop.id) : duration <= 4 ? baseRoute.slice(0, 3) : baseRoute;
}

export default function JourneyPlannerPage() {
  const [destinationName, setDestinationName] = useState("Cairo");
  const [mode, setMode] = useState<JourneyMode>("family");
  const [duration, setDuration] = useState(7);
  const [interest, setInterest] = useState<PlannerInterest>("History");
  const [activeStopId, setActiveStopId] = useState<string | null>(null);
  const [companionName, setCompanionName] = useState<string | null>(null);
  const [selectedStopIds, setSelectedStopIds] = useState<string[]>([]);
  const [arrivalDate, setArrivalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pace, setPace] = useState<JourneyPace>("Balanced");
  const [stayStyle, setStayStyle] = useState<StayStyle>("Signature");
  const [transferStyle, setTransferStyle] = useState<TransferStyle>("Mix of both");
  const [tripNotes, setTripNotes] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryDestination = params.get("destination");
    const destination = getPlannerDestination(queryDestination);
    const queryMode = params.get("mode");
    const nextMode: JourneyMode = queryMode === "solo" ? "solo" : "family";
    const queryDuration = Number(params.get("duration"));
    const nextDuration = plannerDurations.includes(queryDuration) ? queryDuration : destination.baseDays >= 7 ? destination.baseDays : 7;
    const queryInterest = params.get("focus") as PlannerInterest | null;
    const nextInterest = queryInterest && plannerInterests.includes(queryInterest) ? queryInterest : "History";
    const queryTravelers = Number(params.get("travelers"));
    setDestinationName(destination.name);
    setMode(nextMode);
    setDuration(nextDuration);
    setInterest(nextInterest);
    setArrivalDate(params.get("start") ?? "");
    setReturnDate(params.get("return") ?? "");
    if (Number.isFinite(queryTravelers) && queryTravelers >= 1) setAdults(Math.min(12, queryTravelers));
    setCompanionName(null);
    setSelectedStopIds(suggestedStopIds(destination, nextMode, nextDuration));
  }, []);

  const destination = useMemo(() => getPlannerDestination(destinationName), [destinationName]);
  const companion = companionName ? getPlannerDestination(companionName) : null;
  const activeCompanion = duration >= 10 ? companion : null;
  const validSelectedStopIds = selectedStopIds.filter((id) => destination.stops.some((stop) => stop.id === id));
  const routeIds = (validSelectedStopIds.length > 0 ? destination.stops.map((stop) => stop.id).filter((id) => validSelectedStopIds.includes(id)) : suggestedStopIds(destination, mode, duration));
  const routeStops = routeIds.map((id) => destination.stops.find((stop) => stop.id === id)).filter(Boolean);
  const activeStop = destination.stops.find((stop) => stop.id === activeStopId) ?? routeStops[0];
  const routePoints = routeStops.map((stop) => `${stop?.x ?? 0},${stop?.y ?? 0}`).join(" ");
  const recommendation = mode === "family" ? destination.familyNote : destination.soloNote;
  const whatsappText = `Hello Nilora, I want to build a ${mode === "family" ? "family" : "solo / couple"} journey in ${destination.name}${activeCompanion ? ` and ${activeCompanion.name}` : ""}.\nArrival: ${arrivalDate || "To be decided"}\nReturn: ${returnDate || "To be decided"}\nDuration: ${duration} days\nTravellers: ${adults} adults, ${children} children\nPace: ${pace}\nStay: ${stayStyle}\nTransfers: ${transferStyle}\nFocus: ${interest}\nStops: ${routeStops.map((stop) => stop?.name).join(" → ")}${activeCompanion ? ` → ${activeCompanion.name}` : ""}\nNotes: ${tripNotes || "No special notes yet"}\nPlease help me refine the details and share a tailored quote.`;

  function syncSuggestedRoute(nextDestination: PlannerDestination, nextMode = mode, nextDuration = duration) {
    setSelectedStopIds(suggestedStopIds(nextDestination, nextMode, nextDuration));
    setActiveStopId(null);
  }

  function focusStop(stopId: string) {
    setActiveStopId(stopId);
    setSelectedStopIds((current) => current.includes(stopId) ? current : [...current, stopId]);
  }

  function toggleStop(stopId: string) {
    setActiveStopId(stopId);
    setSelectedStopIds((current) => {
      if (current.includes(stopId)) return current.length === 1 ? current : current.filter((id) => id !== stopId);
      return [...current, stopId];
    });
  }

  function changeDestination(nextName: string) {
    setDestinationName(nextName);
    const nextDestination = getPlannerDestination(nextName);
    const nextDuration = nextDestination.baseDays >= 7 ? nextDestination.baseDays : 7;
    setDuration(nextDuration);
    setCompanionName(null);
    syncSuggestedRoute(nextDestination, mode, nextDuration);
    window.history.replaceState(null, "", `/plan?destination=${encodeURIComponent(nextName)}`);
  }

  return (
    <main className="planner-page min-h-screen overflow-hidden bg-[#06181c] text-white">
      <section className="relative isolate px-5 pb-16 pt-0 sm:px-8 lg:px-20">
        <div className="planner-page-glow pointer-events-none absolute inset-0 -z-10" />
        <SiteHeader />

        <div className="mx-auto max-w-[1536px]">
          <div className="mb-8 mt-6 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.22em] text-white/45">
            <div className="flex items-center gap-3"><a href="/" className="transition hover:text-cream">Home</a><span aria-hidden="true">/</span><span className="text-cream/80">Build your journey</span></div>
            <span className="planner-live-pill"><i aria-hidden="true" /> Smart route builder</span>
          </div>

          <div className="planner-intro grid gap-6 lg:grid-cols-[1fr_390px] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-cream">A route that follows you</p>
              <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl">Build the Egypt<br /><span className="text-cream">that feels like yours.</span></h1>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/65">Choose a place to begin, tell us who is travelling, and let the route adapt around your pace. Every stop below is a starting point, not a fixed schedule.</p>
          </div>

          <div className="planner-steps mt-8 grid gap-2 sm:grid-cols-3" aria-label="Journey planning steps">
            <div className="planner-step planner-step-active"><span>01</span><div><strong>Choose a place</strong><small>Start with a region</small></div></div>
            <div className="planner-step"><span>02</span><div><strong>Shape the rhythm</strong><small>Solo or family, slow or full</small></div></div>
            <div className="planner-step"><span>03</span><div><strong>Make it real</strong><small>Continue with a human guide</small></div></div>
          </div>

          <div className="planner-layout mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
            <section className="planner-map-panel rounded-[28px] border border-white/12 p-3 sm:p-4" aria-labelledby="planner-map-title">
              <div className="mb-3 flex flex-wrap items-end justify-between gap-3 px-2 py-1 sm:px-3">
                <div><p className="text-[10px] uppercase tracking-[0.28em] text-cream">Live route map</p><h2 id="planner-map-title" className="mt-1 font-display text-3xl text-white sm:text-4xl">{destination.name}</h2></div>
                <p className="max-w-xs text-right text-xs leading-5 text-white/50">The glowing line updates with your travel style.</p>
              </div>
              <div className="planner-map relative overflow-hidden rounded-[22px]" style={{ "--planner-accent": destination.accent } as React.CSSProperties}>
                <img src={destination.image} alt="" aria-hidden="true" className="planner-map-image" />
                <div className="planner-map-vignette" />
                <svg className="planner-route-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <polyline points={routePoints} className="planner-route-shadow" />
                  <polyline points={routePoints} className="planner-route-line" />
                </svg>
                {destination.stops.map((stop, index) => {
                  const isSelected = routeIds.includes(stop.id);
                  return <button key={stop.id} type="button" className={`planner-map-stop ${activeStop?.id === stop.id ? "planner-map-stop-active" : ""} ${!isSelected ? "planner-map-stop-unselected" : ""}`} style={{ left: `${stop.x}%`, top: `${stop.y}%` }} onClick={() => focusStop(stop.id)} aria-label={`${isSelected ? "Selected" : "Add"} ${stop.name} to the route`} aria-pressed={isSelected}>
                    <span className="planner-map-stop-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="planner-map-stop-dot" />
                    <span className="planner-map-stop-label"><strong>{stop.name}</strong><small>{stop.detail}</small></span>
                  </button>;
                })}
                <div className="planner-map-compass" aria-hidden="true"><span>N</span><i /></div>
                <div className="planner-map-scale" aria-hidden="true"><span /> <small>curated route</small></div>
                <div className="planner-map-caption"><span>{destination.eyebrow}</span><strong>{duration} days · {activeCompanion ? `${destination.name} + ${activeCompanion.name}` : mode === "family" ? "family" : "solo / couple"}</strong></div>
              </div>
              <div className="mt-4 flex items-end justify-between gap-3"><div><p className="planner-control-label">Choose exact stops</p><p className="mt-1 text-xs text-white/45">Click a map point to add it, or use the cards to include and remove stops.</p></div><span className="planner-stop-count">{routeStops.length} selected</span></div>
              <div className="planner-route-list mt-3 grid gap-2 sm:grid-cols-2" aria-label={`${destination.name} exact route stops`}>
                {destination.stops.map((stop, index) => {
                  const isSelected = routeIds.includes(stop.id);
                  return <button key={stop.id} type="button" onClick={() => toggleStop(stop.id)} className={`planner-route-card ${isSelected ? "planner-route-card-active" : "planner-route-card-off"} ${activeStop?.id === stop.id ? "planner-route-card-focused" : ""}`} aria-label={`${isSelected ? "Remove" : "Add"} ${stop.name} ${isSelected ? "from" : "to"} your route`} aria-pressed={isSelected}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stop.name}</strong><small>{isSelected ? "Included in route" : "Add this stop"} · {stop.detail}</small></button>;
                })}
              </div>
              {duration >= 10 && (
                <div className="planner-cross-map mt-4">
                  <div className="planner-cross-map-heading"><div><p className="planner-control-label">Cross-map extension</p><strong>{activeCompanion ? `${destination.name} → ${activeCompanion.name}` : "Connect another governorate"}</strong></div><span>10+ days</span></div>
                  <p className="mt-2 text-xs leading-5 text-white/50">Longer journeys can flow into a second map. Nilora will balance the transfer with your selected rhythm.</p>
                  <div className="planner-connection-options mt-3">{destination.connections.map((name) => <button key={name} type="button" onClick={() => setCompanionName(name)} className={`planner-connection-choice ${activeCompanion?.name === name ? "planner-connection-choice-active" : ""}`} aria-pressed={activeCompanion?.name === name}><span>{name}</span><small>{getPlannerDestination(name).baseDays} days+</small></button>)}</div>
                  {activeCompanion && <div className="planner-connection-preview mt-3" style={{ backgroundImage: `linear-gradient(90deg, rgba(3,20,24,0.93), rgba(3,20,24,0.22)), url('${activeCompanion.image}')` }}><span>Next map</span><strong>{activeCompanion.name}</strong><small>Route bridge ready</small></div>}
                </div>
              )}
            </section>

            <aside className="planner-control-panel rounded-[28px] border border-white/12 p-5 sm:p-6" aria-label="Smart journey controls">
              <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.28em] text-cream">Your starting point</p><h2 className="mt-2 font-display text-3xl text-white">Tune the feeling.</h2></div><span className="planner-ai-mark" aria-label="Smart recommendations">✦</span></div>
              <p className="mt-3 text-sm leading-6 text-white/60">Your choices shape the distances, number of stops, and pace of the route.</p>

              <div className="mt-6"><p className="planner-control-label">Where do you want to begin?</p><div className="planner-destination-grid mt-3 grid grid-cols-2 gap-2">{plannerDestinations.map((item) => <button key={item.name} type="button" onClick={() => changeDestination(item.name)} className={`planner-destination-choice ${destination.name === item.name ? "planner-destination-choice-active" : ""}`}><span>{item.name}</span><small>{item.baseDays} days+</small></button>)}</div></div>

              <div className="mt-6"><p className="planner-control-label">Who is travelling?</p><div className="mt-3 grid gap-2">{plannerModes.map((option) => <button key={option.id} type="button" onClick={() => { setMode(option.id); syncSuggestedRoute(destination, option.id); }} className={`planner-mode-choice ${mode === option.id ? "planner-mode-choice-active" : ""}`} aria-pressed={mode === option.id}><span className="planner-radio" /><span><strong>{option.label}</strong><small>{option.description}</small></span><b>{mode === option.id ? "✓" : ""}</b></button>)}</div></div>

              <div className="mt-6"><p className="planner-control-label">How much time do you have?</p><div className="mt-3 flex flex-wrap gap-2">{plannerDurations.map((days) => <button key={days} type="button" onClick={() => { setDuration(days); syncSuggestedRoute(destination, mode, days); }} className={`planner-duration ${duration === days ? "planner-duration-active" : ""}`} aria-pressed={duration === days}>{days} days</button>)}</div></div>

              <section className="planner-detail-section mt-6" aria-labelledby="planner-details-title">
                <div className="flex items-end justify-between gap-3"><div><p className="planner-control-label">Your exact details</p><h3 id="planner-details-title" className="mt-1 font-display text-2xl text-white">Make it yours.</h3></div><span className="planner-detail-badge">Personalised</span></div>
                <div className="planner-detail-grid mt-4">
                  <label className="planner-field"><span>Arrival date</span><input type="date" value={arrivalDate} onChange={(event) => setArrivalDate(event.target.value)} /></label>
                  <label className="planner-field"><span>Return date</span><input type="date" value={returnDate} min={arrivalDate || undefined} onChange={(event) => setReturnDate(event.target.value)} /></label>
                </div>
                <div className="planner-traveller-grid mt-3">
                  <div className="planner-stepper"><span>Adults</span><div><button type="button" onClick={() => setAdults((value) => Math.max(1, value - 1))} aria-label="Remove adult">−</button><strong>{adults}</strong><button type="button" onClick={() => setAdults((value) => value + 1)} aria-label="Add adult">+</button></div></div>
                  <div className="planner-stepper"><span>Children</span><div><button type="button" onClick={() => setChildren((value) => Math.max(0, value - 1))} aria-label="Remove child">−</button><strong>{children}</strong><button type="button" onClick={() => setChildren((value) => value + 1)} aria-label="Add child">+</button></div></div>
                </div>
                <div className="mt-4"><p className="planner-control-label">Trip pace</p><div className="planner-option-grid mt-2">{plannerPaces.map((option) => <button key={option} type="button" onClick={() => setPace(option)} className={`planner-option-chip ${pace === option ? "planner-option-chip-active" : ""}`} aria-pressed={pace === option}>{option}</button>)}</div></div>
                <div className="mt-4"><p className="planner-control-label">Stay style</p><div className="planner-option-grid mt-2">{plannerStays.map((option) => <button key={option} type="button" onClick={() => setStayStyle(option)} className={`planner-option-chip ${stayStyle === option ? "planner-option-chip-active" : ""}`} aria-pressed={stayStyle === option}>{option}</button>)}</div></div>
                <div className="mt-4"><p className="planner-control-label">Transfers</p><div className="planner-option-grid mt-2">{plannerTransfers.map((option) => <button key={option} type="button" onClick={() => setTransferStyle(option)} className={`planner-option-chip ${transferStyle === option ? "planner-option-chip-active" : ""}`} aria-pressed={transferStyle === option}>{option}</button>)}</div></div>
                <label className="planner-field planner-notes-field mt-4"><span>Anything else we should know?</span><textarea value={tripNotes} onChange={(event) => setTripNotes(event.target.value)} placeholder="Celebration, accessibility, food preferences..." rows={3} /></label>
              </section>

              {duration >= 10 && <div className="mt-6"><p className="planner-control-label">Connect a second map</p><p className="mt-2 text-xs leading-5 text-white/45">For 10+ days, add another governorate to make the route feel like one continuous story.</p><div className="mt-3 grid grid-cols-2 gap-2">{destination.connections.map((name) => <button key={name} type="button" onClick={() => setCompanionName(name)} className={`planner-destination-choice ${activeCompanion?.name === name ? "planner-destination-choice-active" : ""}`}><span>{name}</span><small>{activeCompanion?.name === name ? "Connected" : "Add map"}</small></button>)}</div></div>}

              <div className="mt-6"><p className="planner-control-label">What should lead the route?</p><div className="mt-3 flex flex-wrap gap-2">{plannerInterests.map((item) => <button key={item} type="button" onClick={() => setInterest(item)} className={`planner-interest ${interest === item ? "planner-interest-active" : ""}`} aria-pressed={interest === item}>{item}</button>)}</div></div>

              <div className="planner-smart-note mt-6"><span>✦</span><div><strong>Smart suggestion</strong><p>{recommendation}</p></div></div>
              <a href={encodeWhatsApp(whatsappText)} target="_blank" rel="noreferrer" className="whatsapp-button mt-6 w-full"><span className="whatsapp-mark">◌</span><span><strong>Continue on WhatsApp</strong><small>Shape the final details with Nilora</small></span><span className="text-xl" aria-hidden="true">↗</span></a>
              <p className="mt-3 text-center text-[9px] uppercase tracking-[0.18em] text-white/35">No payment · human confirmation first</p>
            </aside>
          </div>

          <section className="planner-bottom-note mt-6 grid gap-4 rounded-[24px] border border-white/10 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6"><div><p className="text-[10px] uppercase tracking-[0.28em] text-cream">Designed around you</p><h2 className="mt-2 font-display text-3xl text-white">A map that listens before it leads.</h2></div><p className="max-w-lg text-sm leading-6 text-white/55">{interest} is now the lead feeling for this route. When you continue, the Nilora team will refine stays, transfers, and timing around your exact group.</p></section>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
