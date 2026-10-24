"use client";

import { useMemo, useState } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { trips, type Mood, type Tempo, type Duration, type Trip } from "@/lib/trips";

const moodOptions: { id: Mood; label: string; icon: string }[] = [
  { id: "all", label: "Surprise me", icon: "✦" },
  { id: "water", label: "Water & calm", icon: "≈" },
  { id: "history", label: "History & wonder", icon: "◈" },
  { id: "wild", label: "Nature & escape", icon: "⌁" },
  { id: "city", label: "City energy", icon: "✧" },
];

const durationOptions: { id: Duration; label: string }[] = [
  { id: "any", label: "Any length" },
  { id: "quick", label: "2–4 days" },
  { id: "week", label: "5–7 days" },
  { id: "deep", label: "8+ days" },
];

const timeScenes = ["First light", "Full day", "Golden hour", "After dark"];

function getTimeScene(value: number) {
  if (value < 25) return timeScenes[0];
  if (value < 55) return timeScenes[1];
  if (value < 80) return timeScenes[2];
  return timeScenes[3];
}

export default function TripsPage() {
  const [mood, setMood] = useState<Mood>("all");
  const [tempo, setTempo] = useState<Tempo>("balanced");
  const [duration, setDuration] = useState<Duration>("any");
  const [activeId, setActiveId] = useState(trips[0].id);
  const [sceneTime, setSceneTime] = useState(50);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [notice, setNotice] = useState<string | null>(null);

  const filteredTrips = useMemo(() => {
    const matching = trips.filter((trip) => {
      const moodMatch = mood === "all" || trip.mood === mood;
      const durationMatch = duration === "any" || trip.duration === duration;
      return moodMatch && durationMatch;
    });
    return matching.length > 0 ? matching : trips;
  }, [duration, mood]);

  const activeTrip = filteredTrips.find((trip) => trip.id === activeId) ?? filteredTrips[0];
  const activeIndex = filteredTrips.findIndex((trip) => trip.id === activeTrip.id);
  const previousTrip = filteredTrips[(activeIndex - 1 + filteredTrips.length) % filteredTrips.length];
  const nextTrip = filteredTrips[(activeIndex + 1) % filteredTrips.length];
  const timeScene = getTimeScene(sceneTime);
  const matchScore = Math.min(98, 86 + (activeTrip.tempo === tempo ? 8 : 0) + (mood === "all" ? 0 : 3));

  function selectTrip(trip: Trip) {
    setActiveId(trip.id);
    setNotice(null);
  }

  function moveTrip(direction: -1 | 1) {
    const nextIndex = (activeIndex + direction + filteredTrips.length) % filteredTrips.length;
    selectTrip(filteredTrips[nextIndex]);
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <main className="trips-page min-h-screen overflow-hidden bg-[#06181c] text-white">
      <section className="relative isolate px-5 pb-16 pt-0 sm:px-8 lg:px-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_15%,rgba(39,215,203,0.17),transparent_34%),linear-gradient(180deg,rgba(3,20,24,0.82),#06181c_94%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[780px] bg-cover bg-center opacity-25" style={{ backgroundImage: "url('/nilora-hero-bg-v2.png')" }} />

        <SiteHeader />

        <div className="relative mx-auto max-w-[1536px]">
          <div className="flex flex-col gap-8 pb-12 pt-16 sm:pt-20 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs uppercase tracking-[0.34em] text-cream">Nilora journey lab · 3D / 4D</p>
              <h1 className="font-display text-6xl leading-[0.9] tracking-[-0.055em] text-white sm:text-8xl">Find the Egypt<br /><span className="text-cream">that fits you.</span></h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Move through a living route gallery. Choose how you want the journey to feel, then scrub through its light from first dawn to after dark.</p>
            </div>
            <div className="flex items-center gap-3 text-right text-[10px] uppercase tracking-[0.23em] text-white/50">
              <span className="h-2 w-2 rounded-full bg-[#5ee4d5] shadow-[0_0_16px_#5ee4d5]" />
              <span>{filteredTrips.length} routes in focus</span>
            </div>
          </div>

          <section className="smart-filter glass-panel rounded-[26px] border border-white/15 p-4 sm:p-5 lg:p-6" aria-labelledby="smart-filter-title">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xs">
                <p className="text-xs uppercase tracking-[0.28em] text-cream">The easy filter</p>
                <h2 id="smart-filter-title" className="mt-2 font-display text-3xl leading-none text-white">What should it feel like?</h2>
              </div>
              <div className="flex flex-1 flex-wrap gap-2 lg:justify-end" role="group" aria-label="Choose your travel feeling">
                {moodOptions.map((option) => (
                  <button key={option.id} type="button" onClick={() => setMood(option.id)} aria-pressed={mood === option.id} className={`filter-chip ${mood === option.id ? "filter-chip-active" : ""}`}>
                    <span aria-hidden="true">{option.icon}</span>{option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-5 border-t border-white/10 pt-5 lg:grid-cols-[1fr_1fr_1.3fr] lg:items-center">
              <div>
                <p className="filter-label">Your time</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Choose trip length">
                  {durationOptions.map((option) => (
                    <button key={option.id} type="button" onClick={() => setDuration(option.id)} aria-pressed={duration === option.id} className={`mini-chip ${duration === option.id ? "mini-chip-active" : ""}`}>{option.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="filter-label">Your tempo</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Choose travel tempo">
                  {(["slow", "balanced", "electric"] as Tempo[]).map((option) => (
                    <button key={option} type="button" onClick={() => setTempo(option)} aria-pressed={tempo === option} className={`mini-chip capitalize ${tempo === option ? "mini-chip-active" : ""}`}>{option}</button>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-white/55">Smart match</span>
                  <span className="font-bold text-cream">{matchScore}% aligned</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-gradient-to-r from-[#34cfc4] to-[#f4d29b] transition-all duration-500" style={{ width: `${matchScore}%` }} /></div>
              </div>
            </div>
          </section>

          <section className="trip-lab-grid mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start" aria-labelledby="route-gallery-title">
            <div>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-cream">3D route gallery</p>
                  <h2 id="route-gallery-title" className="mt-2 font-display text-4xl leading-none text-white sm:text-5xl">Choose a point of view.</h2>
                </div>
                <div className="hidden items-center gap-2 text-xs text-white/45 sm:flex"><span className="h-px w-8 bg-white/30" /> Drag the scene</div>
              </div>

              <div className="trip-stage" style={{ ["--trip-accent" as string]: activeTrip.accent }}>
                <button type="button" onClick={() => moveTrip(-1)} className="scene-arrow scene-arrow-left" aria-label={`Previous route: ${previousTrip.title}`}>‹</button>
                <div className="scene-side scene-side-left" aria-hidden="true">
                  <div className="scene-side-image" style={{ backgroundImage: `url('${previousTrip.image}')` }} />
                  <span>{previousTrip.title}</span>
                </div>
                <div
                  className="trip-card-3d"
                  style={{ transform: `perspective(1300px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
                  onPointerMove={(event) => {
                    const bounds = event.currentTarget.getBoundingClientRect();
                    const x = (event.clientY - bounds.top) / bounds.height - 0.5;
                    const y = (event.clientX - bounds.left) / bounds.width - 0.5;
                    setTilt({ x: Number((-x * 7).toFixed(2)), y: Number((y * 9).toFixed(2)) });
                  }}
                  onPointerLeave={resetTilt}
                >
                  <div className="trip-card-image" style={{ backgroundImage: `url('${activeTrip.image}')` }} />
                  <div className="trip-card-time" style={{ opacity: 0.2 + sceneTime / 140 }} />
                  <div className="trip-card-glow" />
                  <div className="trip-card-content">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/65">{activeTrip.subtitle}</p>
                        <h3 className="mt-2 font-display text-5xl leading-[0.9] tracking-[-0.045em] text-white sm:text-6xl">{activeTrip.title}</h3>
                      </div>
                      <span className="trip-day-badge">{activeTrip.days}<small>days</small></span>
                    </div>
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2">{activeTrip.tags.map((tag) => <span key={tag} className="trip-tag">{tag}</span>)}</div>
                      <p className="mt-4 max-w-lg text-sm leading-6 text-white/75">{activeTrip.description}</p>
                      <div className="mt-6 flex flex-col gap-3 border-t border-white/15 pt-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">Route pulse</p>
                          <p className="mt-1 text-sm text-white/80">{activeTrip.region}</p>
                        </div>
                        <a href={`/trips/${activeTrip.id}`} className="primary-button rounded-full px-5 py-3 text-sm font-bold">View trip details</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="scene-side scene-side-right" aria-hidden="true">
                  <div className="scene-side-image" style={{ backgroundImage: `url('${nextTrip.image}')` }} />
                  <span>{nextTrip.title}</span>
                </div>
                <button type="button" onClick={() => moveTrip(1)} className="scene-arrow scene-arrow-right" aria-label={`Next route: ${nextTrip.title}`}>›</button>
              </div>

              <div className="route-dots mt-5 flex justify-center gap-2" role="tablist" aria-label="Choose a route">
                {filteredTrips.map((trip) => <button key={trip.id} type="button" onClick={() => selectTrip(trip)} role="tab" aria-selected={activeTrip.id === trip.id} aria-label={`Show ${trip.title}`} className={`route-dot ${activeTrip.id === trip.id ? "route-dot-active" : ""}`} />)}
              </div>
            </div>

            <aside className="time-console rounded-[26px] border border-white/12 bg-[#071d21]/85 p-5 backdrop-blur-md lg:mt-[69px]" aria-labelledby="time-console-title">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-cream">4D scene control</p>
                  <h2 id="time-console-title" className="mt-2 font-display text-3xl leading-none text-white">Move through the light.</h2>
                </div>
                <span className="time-live-dot" aria-label="Live scene" />
              </div>
              <div className="time-window mt-7 rounded-2xl border border-white/10 p-4" style={{ background: `linear-gradient(145deg, ${activeTrip.accent}20, rgba(3,20,24,0.78))` }}>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">Now showing</p>
                <p className="mt-2 font-display text-4xl text-white">{timeScene}</p>
                <p className="mt-2 text-xs leading-5 text-white/55">The route changes character as your day moves with it.</p>
              </div>
              <label htmlFor="scene-time" className="sr-only">Move through the route from dawn to night</label>
              <input id="scene-time" className="timeline-range mt-8 w-full" type="range" min="0" max="100" value={sceneTime} onChange={(event) => setSceneTime(Number(event.target.value))} style={{ accentColor: activeTrip.accent }} />
              <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.12em] text-white/40"><span>Dawn</span><span>Day</span><span>Sunset</span><span>Night</span></div>
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="filter-label">Your route rhythm</p>
                <div className="mt-3 flex items-center gap-2"><span className="rhythm-line rhythm-line-active" /><span className="rhythm-line" /><span className="rhythm-line rhythm-line-short" /></div>
                <p className="mt-3 text-sm leading-6 text-white/60">{activeTrip.tempo === "slow" ? "Open space, soft transitions, and time to notice the details." : activeTrip.tempo === "electric" ? "A brighter pulse with more movement, flavor, and after-dark energy." : "A balanced rhythm that leaves room for both landmarks and detours."}</p>
              </div>
              {notice && <div role="status" className="mt-5 rounded-xl border border-cream/40 bg-cream/10 px-3 py-2 text-xs leading-5 text-cream">{notice}</div>}
            </aside>
          </section>

          <section className="mt-16 border-t border-white/10 pt-10" aria-label="Route stops">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="text-xs uppercase tracking-[0.28em] text-cream">The route in four beats</p><p className="mt-2 text-sm text-white/55">{activeTrip.title} · {activeTrip.region}</p></div>
              <div className="flex flex-wrap gap-2">{activeTrip.stops.map((stop, index) => <span key={stop} className="stop-pill"><span>{String(index + 1).padStart(2, "0")}</span>{stop}</span>)}</div>
            </div>
          </section>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
