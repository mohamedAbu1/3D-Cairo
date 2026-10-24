"use client";

import { useState } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

type IconProps = { size?: number; strokeWidth?: number };

function IconBase({ children, size = 21, strokeWidth = 1.8 }: IconProps & { children: React.ReactNode }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function ArrowLeft(props: IconProps) { return <IconBase {...props}><path d="m15 18-6-6 6-6" /><path d="M9 12h12" /></IconBase>; }
function ArrowRight(props: IconProps) { return <IconBase {...props}><path d="M3 12h12" /><path d="m12 5 7 7-7 7" /></IconBase>; }
function SearchIcon(props: IconProps) { return <IconBase {...props}><circle cx="10.9" cy="10.9" r="6.9" /><path d="m16.2 16.2 4.4 4.4" /></IconBase>; }
function MenuIcon(props: IconProps) { return <IconBase {...props}><path d="M4 7h16M4 12h16M4 17h16" /></IconBase>; }
function CloseIcon(props: IconProps) { return <IconBase {...props}><path d="m6 6 12 12M18 6 6 18" /></IconBase>; }
function MapPin(props: IconProps) { return <IconBase {...props}><path d="M20 10.2c0 5-8 11-8 11s-8-6-8-11a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></IconBase>; }
function CalendarDays(props: IconProps) { return <IconBase {...props}><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M16 3v4M8 3v4M3.5 9.5h17M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01" /></IconBase>; }
function Users(props: IconProps) { return <IconBase {...props}><path d="M16 20v-1.7a3.7 3.7 0 0 0-3.7-3.7H7.7A3.7 3.7 0 0 0 4 18.3V20" /><circle cx="10" cy="7.4" r="3.2" /><path d="M16 4.4a3.2 3.2 0 0 1 0 6.1M20 20v-1.7a3.7 3.7 0 0 0-2.7-3.5" /></IconBase>; }
function Plane(props: IconProps) { return <IconBase {...props}><path d="m3 20 7.3-7.3L4 5l1.4-1.4 9 6.4L20 7.6a1.6 1.6 0 1 1 2.3 2.3l-2.4 2.4-1.4 1.4-3.8 3.8-1.9-1.9-4.7 4.7Z" /></IconBase>; }
function Bed(props: IconProps) { return <IconBase {...props}><path d="M3 18v-7.5M3 15h18M21 18v-5.5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2V15M6 15v3M18 15v3M8 9.5V7.8A1.8 1.8 0 0 1 9.8 6h2.4A1.8 1.8 0 0 1 14 7.8v1.7" /></IconBase>; }
function MapIcon(props: IconProps) { return <IconBase {...props}><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15M15 6v15" /></IconBase>; }
function ChevronDown(props: IconProps) { return <IconBase {...props}><path d="m6 9 6 6 6-6" /></IconBase>; }

const destinations = [
  { name: "Red Sea", copy: "Crystal waters\nvibrant marine life", tone: "card-red-sea" },
  { name: "Nile Cruise", copy: "Sail through\nhistory", tone: "card-nile" },
  { name: "Fayoum", copy: "Natural beauty\nbeyond the desert", tone: "card-fayoum" },
  { name: "Luxor", copy: "Temples that\ntell eternal stories", tone: "card-luxor" },
  { name: "Cairo", copy: "Where the past\nmeets today", tone: "card-cairo" },
  { name: "Aswan", copy: "Serenity\non the Nile", tone: "card-aswan" },
];

const categories = [
  { label: "Trips", icon: Plane },
  { label: "Hotels", icon: Bed },
  { label: "Tours", icon: MapIcon },
];

const smartMoods = ["History", "Water", "Nature", "Food"] as const;
const smartMoodCopy = {
  History: "Temple light, layered stories, and time to take it all in.",
  Water: "River mornings, boat days, and a softer route between the landmarks.",
  Nature: "Wide skies, desert textures, and the places that feel far from the postcard.",
  Food: "Local tables, market lanes, and the flavours that make the route memorable.",
};

const mapPins = [
  { name: "Cairo", left: "56%", top: "14%" },
  { name: "Fayoum", left: "43%", top: "25%" },
  { name: "Luxor", left: "60%", top: "31%" },
  { name: "Red Sea", left: "73%", top: "33%" },
  { name: "Nile Cruise", left: "53%", top: "49%" },
  { name: "Aswan", left: "63%", top: "50%" },
];

const mascotMessages = [
  <>Are you ready<br />to explore<br />Egypt?</>,
  <>Follow the Nile<br />to your next<br />story.</>,
  <>Your next<br />adventure<br />starts here.</>,
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Trips");
  const [selectedPlace, setSelectedPlace] = useState("Cairo");
  const [travelers, setTravelers] = useState(2);
  const [travelDate, setTravelDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [smartMood, setSmartMood] = useState<(typeof smartMoods)[number]>("History");
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [mascotMessageIndex, setMascotMessageIndex] = useState(0);
  const [notice, setNotice] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  function handleMascotMove(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - bounds.left) / bounds.width;
    setMascotMessageIndex(position < 0.34 ? 1 : position > 0.67 ? 2 : 0);
  }

  function handleSearch() {
    if (!travelDate) {
      setNotice({ tone: "error", text: "Choose your travel date to continue." });
      return;
    }

    if (returnDate && returnDate < travelDate) {
      setNotice({ tone: "error", text: "Your return date must be after your arrival date." });
      return;
    }

    const requestedDays = returnDate
      ? Math.max(1, Math.round((new Date(`${returnDate}T00:00:00`).getTime() - new Date(`${travelDate}T00:00:00`).getTime()) / 86400000) + 1)
      : 7;
    const duration = [4, 7, 10, 14].reduce((closest, days) => Math.abs(days - requestedDays) < Math.abs(closest - requestedDays) ? days : closest, 7);

    const query = new URLSearchParams({
      destination: selectedPlace,
      start: travelDate,
      duration: String(duration),
      focus: smartMood,
      travelers: String(travelers),
      mode: travelers > 2 ? "family" : "solo",
      category: activeCategory,
    });
    if (returnDate) query.set("return", returnDate);
    window.location.href = `/plan?${query.toString()}`;
  }

  function openPlanner(place: string) {
    setSelectedPlace(place);
    window.location.href = `/plan?destination=${encodeURIComponent(place)}`;
  }

  const formatDate = (value: string, fallback: string) => value
    ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T00:00:00`))
    : fallback;

  const formattedDate = formatDate(travelDate, "Choose arrival");
  const formattedReturnDate = formatDate(returnDate, "Choose return");

  return (
    <main className="bg-[#06181c]">
      <section className="hero-shell relative isolate px-5 pb-7 pt-0 text-white sm:px-8 lg:px-20" aria-label="Nilora Egypt travel discovery">
        <a href="#journey" className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-50 focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink">Skip to search</a>
        <SiteHeader />

        <div className="relative z-10 mx-auto flex max-w-[1536px] flex-col lg:min-h-[calc(100%-70px)]">
          <div className="mt-5 flex flex-col lg:mt-5 lg:w-[380px] xl:w-[400px]">
            <h1 className="font-display max-w-[400px] text-[48px] font-bold leading-[0.89] tracking-[-0.055em] text-white sm:text-[66px] lg:text-[54px] xl:text-[58px]">
              <span className="text-cream">Egypt —</span><br />
              closer than<br />
              <span className="whitespace-nowrap">you imagine</span>
            </h1>
            <p className="mt-3 max-w-[340px] text-[16px] tracking-[0.025em] text-white/80 sm:text-[18px]">Timeless history ... new stories await</p>

            <div className="glass-panel mt-5 rounded-[22px] p-3 sm:mt-5 sm:p-3.5" id="journey">
              <div className="mb-3 grid grid-cols-3 gap-1.5 rounded-2xl bg-black/10 p-1" role="tablist" aria-label="Travel type">
                {categories.map(({ label, icon: CategoryIcon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveCategory(label)}
                    role="tab"
                    aria-selected={activeCategory === label}
                    className={`flex items-center justify-center gap-2 rounded-xl px-2 py-3 text-xs transition sm:text-sm ${activeCategory === label ? "bg-white/[0.09] text-cream shadow-inner" : "text-white/60 hover:text-white"}`}
                  >
                    <CategoryIcon size={19} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              <div className="relative mb-2">
                <button type="button" onClick={() => setDestinationOpen((open) => !open)} className="field-surface flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-white/75" aria-haspopup="listbox" aria-expanded={destinationOpen} aria-controls="destination-menu">
                  <MapPin size={21} />
                  <span className="flex-1">{selectedPlace}</span>
                  <ChevronDown size={18} />
                </button>
                {destinationOpen && (
                  <div id="destination-menu" className="field-menu absolute left-0 right-0 top-[calc(100%+6px)] z-40 rounded-2xl p-1.5" role="listbox" aria-label="Choose a destination">
                    {destinations.map((destination) => (
                      <button key={destination.name} type="button" role="option" aria-selected={selectedPlace === destination.name} onClick={() => { setSelectedPlace(destination.name); setDestinationOpen(false); }} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-white/80 transition hover:bg-white/10 hover:text-cream">
                        <span>{destination.name}</span>
                        {selectedPlace === destination.name && <span className="text-cream">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="smart-search-intent mb-3" aria-label="Smart travel preference">
                <div className="smart-search-intent-heading"><span>Make it feel</span><strong>Smart match</strong></div>
                <div className="smart-search-moods" role="group" aria-label="What should lead your journey?">
                  {smartMoods.map((mood) => <button key={mood} type="button" onClick={() => setSmartMood(mood)} className={smartMood === mood ? "smart-search-mood-active" : ""} aria-pressed={smartMood === mood}>{mood}</button>)}
                </div>
              </div>
              <div className="smart-detail-grid mb-3">
                <label htmlFor="travel-date" className="field-surface relative flex min-w-0 cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-sm text-white/75">
                  <CalendarDays size={17} />
                  <span className="smart-date-copy"><small>Arrival</small><strong>{formattedDate}</strong></span>
                  <input id="travel-date" type="date" value={travelDate} onInput={(event) => { setTravelDate(event.currentTarget.value); setNotice(null); }} onChange={(event) => { setTravelDate(event.currentTarget.value); setNotice(null); }} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" aria-label="Choose arrival date" />
                </label>
                <label htmlFor="return-date" className="field-surface relative flex min-w-0 cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-sm text-white/75">
                  <CalendarDays size={17} />
                  <span className="smart-date-copy"><small>Return</small><strong>{formattedReturnDate}</strong></span>
                  <input id="return-date" type="date" value={returnDate} min={travelDate || undefined} onInput={(event) => { setReturnDate(event.currentTarget.value); setNotice(null); }} onChange={(event) => { setReturnDate(event.currentTarget.value); setNotice(null); }} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" aria-label="Choose return date" />
                </label>
                <div className="field-surface flex min-w-0 items-center gap-2 rounded-xl px-2.5 py-2 text-sm text-white/75" role="group" aria-label="Number of travelers">
                  <Users size={18} />
                  <span className="smart-traveler-label flex-1">Travelers</span>
                <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))} className="control-button disabled:cursor-not-allowed disabled:opacity-30" aria-label="Remove traveler" disabled={travelers === 1}>−</button>
                <span className="w-4 text-center text-white" aria-live="polite">{travelers}</span>
                <button type="button" onClick={() => setTravelers(Math.min(9, travelers + 1))} className="control-button disabled:cursor-not-allowed disabled:opacity-30" aria-label="Add traveler" disabled={travelers === 9}>+</button>
                </div>
              </div>
              <div className="smart-match-card mb-3" aria-live="polite"><span className="smart-match-orb">✦</span><span><small>Nilora smart match</small><strong>{selectedPlace} · {smartMood}</strong><em>{smartMoodCopy[smartMood]}</em></span><b>{travelers} <small>travellers</small></b></div>
              <button type="button" onClick={handleSearch} className="primary-button flex w-full items-center justify-center gap-3 rounded-full px-5 py-3.5 text-sm font-bold sm:text-base">
                <SearchIcon size={22} strokeWidth={2.1} />
                <span>Build my smart route</span>
              </button>
              {notice && <p className={`status-toast px-2 pt-2 text-center text-xs ${notice.tone === "error" ? "text-[#ffd5a3]" : "text-cream"}`} role="status" aria-live="polite">{notice.text}</p>}
            </div>
          </div>

        </div>

        <div className="map-annotations pointer-events-none absolute inset-0 z-[12] hidden lg:block" aria-label="Explore destinations on the map">
          {mapPins.map((pin) => (
            <button
              key={pin.name}
              type="button"
              onClick={() => openPlanner(pin.name)}
              aria-label={`Choose ${pin.name} as your destination`}
              title={`Explore ${pin.name}`}
              aria-pressed={selectedPlace === pin.name}
              className={`map-pin pointer-events-auto absolute inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${selectedPlace === pin.name ? "map-pin-active" : ""}`}
              style={{ left: pin.left, top: pin.top }}
            >
              <span className="map-pin-orb" aria-hidden="true" />
              <MapPin size={15} strokeWidth={2.2} />
              {pin.name}
            </button>
          ))}
        </div>

        <div
          className="mascot-stage absolute bottom-[24%] right-[1.5%] z-10 hidden xl:block"
          onMouseMove={handleMascotMove}
          onMouseLeave={() => setMascotMessageIndex(0)}
          onFocus={() => setMascotMessageIndex(1)}
          onBlur={() => setMascotMessageIndex(0)}
          tabIndex={0}
          aria-label="Nilora Egypt travel guide"
        >
          <div className="mascot-pedestal absolute bottom-0 left-1/2 z-0 h-14 w-64 -translate-x-1/2 rounded-t-[18px]" />
          <div className="speech-bubble absolute -left-20 top-[-32px] z-20 w-44 rounded-[28px] px-5 py-4 text-center text-sm font-bold leading-[1.15]" aria-live="polite">
            {mascotMessages[mascotMessageIndex]}
          </div>
          <img src="/nilora-pharaoh.png" alt="" className="relative z-10 w-[270px] drop-shadow-[0_24px_30px_rgba(0,0,0,0.38)] 2xl:w-[320px]" />
        </div>

        <div className="card-backdrop absolute bottom-0 left-0 right-0 z-[5] h-[300px]" aria-hidden="true" />
        <div className="absolute bottom-[22px] left-5 right-5 z-20 sm:left-8 sm:right-8 lg:left-14 lg:right-14">
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" id="destinations" role="listbox" aria-label="Explore destinations">
            {destinations.map((destination) => {
              const active = selectedPlace === destination.name;
              return (
                <button
                  key={destination.name}
                  type="button"
                  role="option"
                  aria-selected={active}
                  aria-label={`Choose ${destination.name} as your destination`}
                  onClick={() => openPlanner(destination.name)}
                  className={`destination-card ${destination.tone} snap-start text-left`}
                >
                  <span className="card-scrim" />
                  <span className="absolute bottom-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-cream text-cream">
                    {active ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
                  </span>
                  <span className="absolute bottom-3 right-3 z-10 text-right">
                    <span className="block text-[19px] font-bold leading-none text-white">{destination.name}</span>
                    <span className="mt-1 block whitespace-pre-line text-[11px] leading-[1.2] text-white/75">{destination.copy}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <footer className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-white/70 sm:left-8 sm:right-8 lg:left-20 lg:right-20">
          <p>Explore <span className="mx-1 text-cream">•</span> Discover <span className="mx-1 text-cream">•</span> Belong</p>
          <p className="hidden items-center gap-3 md:flex"><span className="h-2 w-2 rounded-full bg-[#c1dfe2]" /><span className="h-px w-12 bg-white/70" /> Egypt forever in your story</p>
        </footer>
      </section>

      <SiteFooter />
    </main>
  );
}
