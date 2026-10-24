export type Mood = "all" | "water" | "history" | "wild" | "city";
export type Tempo = "slow" | "balanced" | "electric";
export type Duration = "any" | "quick" | "week" | "deep";

export type Trip = {
  id: string;
  title: string;
  subtitle: string;
  region: string;
  days: number;
  mood: Exclude<Mood, "all">;
  tempo: Tempo;
  duration: Exclude<Duration, "any">;
  image: string;
  gallery: string[];
  stops: string[];
  description: string;
  tags: string[];
  accent: string;
};

export const trips: Trip[] = [
  {
    id: "blue-nile",
    title: "Blue Nile Drift",
    subtitle: "A moving postcard",
    region: "Luxor → Aswan",
    days: 7,
    mood: "water",
    tempo: "slow",
    duration: "week",
    image: "/trip-blue-nile-3d.png",
    gallery: ["/trip-blue-nile-a.png", "/trip-blue-nile-b.png", "/trip-blue-nile-c.png"],
    stops: ["Luxor", "Esna", "Edfu", "Aswan"],
    description: "Wake with the river, read the horizon, and let ancient temples arrive at their own pace.",
    tags: ["River", "Sunrise", "Slow travel"],
    accent: "#5ee4d5",
  },
  {
    id: "golden-kingdom",
    title: "Golden Kingdom",
    subtitle: "The deep-time route",
    region: "Cairo → Luxor",
    days: 9,
    mood: "history",
    tempo: "balanced",
    duration: "deep",
    image: "/trip-golden-kingdom-3d.png",
    gallery: ["/trip-golden-kingdom-a.png", "/trip-golden-kingdom-b.png", "/trip-golden-kingdom-c.png"],
    stops: ["Giza", "Saqqara", "Luxor", "Karnak"],
    description: "A layered passage through the monuments, rituals, and living details that shaped Egypt.",
    tags: ["Ancient", "Museums", "Story-rich"],
    accent: "#f4d29b",
  },
  {
    id: "desert-oasis",
    title: "Desert Oasis",
    subtitle: "The quiet edge",
    region: "Fayoum → Bahariya",
    days: 5,
    mood: "wild",
    tempo: "slow",
    duration: "week",
    image: "/trip-desert-oasis-3d.png",
    gallery: ["/trip-desert-oasis-a.png", "/trip-desert-oasis-b.png", "/trip-desert-oasis-c.png"],
    stops: ["Fayoum", "Wadi El Hitan", "Bahariya", "Black Desert"],
    description: "Trade the timetable for wide skies, freshwater, and the soft geometry of the desert.",
    tags: ["Nature", "Stargazing", "Oasis"],
    accent: "#eabf7d",
  },
  {
    id: "red-sea-pulse",
    title: "Red Sea Pulse",
    subtitle: "Salt, light, and open water",
    region: "Hurghada → Red Sea",
    days: 4,
    mood: "water",
    tempo: "electric",
    duration: "quick",
    image: "/trip-red-sea-pulse-3d.png",
    gallery: ["/trip-red-sea-pulse-a.png", "/trip-red-sea-pulse-b.png", "/trip-red-sea-pulse-c.png"],
    stops: ["Hurghada", "Giftun", "El Gouna", "Red Sea"],
    description: "A bright reset built around coral gardens, boat days, and the energy of the coast.",
    tags: ["Sea", "Diving", "Reset"],
    accent: "#4bd3ef",
  },
  {
    id: "cairo-after-dark",
    title: "Cairo After Dark",
    subtitle: "The city in layers",
    region: "Cairo → Islamic Cairo",
    days: 3,
    mood: "city",
    tempo: "electric",
    duration: "quick",
    image: "/trip-cairo-after-dark-3d.png",
    gallery: ["/trip-cairo-after-dark-a.png", "/trip-cairo-after-dark-b.png", "/trip-cairo-after-dark-c.png"],
    stops: ["Downtown", "Khan el-Khalili", "Al-Azhar", "Zamalek"],
    description: "Follow the city after sunset: warm lights, old lanes, rooftops, and late-night tables.",
    tags: ["City", "Food", "Night"],
    accent: "#ffb86b",
  },
  {
    id: "southern-light",
    title: "Southern Light",
    subtitle: "A slower kind of wonder",
    region: "Aswan → Abu Simbel",
    days: 6,
    mood: "history",
    tempo: "balanced",
    duration: "week",
    image: "/trip-southern-light-3d.png",
    gallery: ["/trip-southern-light-a.png", "/trip-southern-light-b.png", "/trip-southern-light-c.png"],
    stops: ["Aswan", "Philae", "Nubian villages", "Abu Simbel"],
    description: "A warm, unhurried route through Nubian color, island temples, and the far south.",
    tags: ["Nubia", "Islands", "Warmth"],
    accent: "#f0a86d",
  },
];

export const tripPackages = [
  { id: "essentials", name: "Essentials", description: "The route, the key sights, and room to wander." },
  { id: "signature", name: "Signature", description: "Handpicked stays, local hosts, and considered transfers." },
  { id: "private", name: "Private", description: "A flexible itinerary shaped around your pace and interests." },
] as const;

export type TripPackageId = (typeof tripPackages)[number]["id"];

