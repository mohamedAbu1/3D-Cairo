export type JourneyMode = "solo" | "family";

export type JourneyStop = {
  id: string;
  name: string;
  detail: string;
  x: number;
  y: number;
};

export type PlannerDestination = {
  name: string;
  eyebrow: string;
  summary: string;
  accent: string;
  image: string;
  baseDays: number;
  tags: string[];
  stops: JourneyStop[];
  routes: Record<JourneyMode, string[]>;
  connections: string[];
  familyNote: string;
  soloNote: string;
};

export const plannerModes: Array<{ id: JourneyMode; label: string; description: string }> = [
  { id: "solo", label: "Solo / couple", description: "A flexible route with room for spontaneous detours." },
  { id: "family", label: "Family", description: "Shorter transfers, easy rhythm, and shared moments." },
];

export const plannerDurations = [4, 7, 10, 14];

export const plannerInterests = ["History", "Water", "Nature", "Food"] as const;
export type PlannerInterest = (typeof plannerInterests)[number];

export const plannerDestinations: PlannerDestination[] = [
  {
    name: "Cairo",
    eyebrow: "THE CAPITAL, IN LAYERS",
    summary: "A high-contrast beginning: ancient stone, river light, and neighbourhoods that stay awake after dark.",
    accent: "#f4d29b",
    image: "/map-cairo.png",
    baseDays: 4,
    tags: ["History", "Food", "City"],
    connections: ["Nile Cruise", "Fayoum"],
    stops: [
      { id: "giza", name: "Giza", detail: "First light by the pyramids", x: 30, y: 28 },
      { id: "cairo", name: "Cairo", detail: "Markets, museums, and river cafés", x: 43, y: 22 },
      { id: "saqqara", name: "Saqqara", detail: "A quieter ancient horizon", x: 35, y: 42 },
      { id: "khan", name: "Khan el-Khalili", detail: "Lantern-lit lanes and local texture", x: 49, y: 35 },
    ],
    routes: {
      solo: ["giza", "saqqara", "khan", "cairo"],
      family: ["giza", "cairo", "khan"],
    },
    familyNote: "The family rhythm keeps the biggest landmarks close and adds generous pauses between visits.",
    soloNote: "The solo route leaves space for a slower museum morning and an evening built around your appetite.",
  },
  {
    name: "Fayoum",
    eyebrow: "THE DESERT, SOFTENED",
    summary: "A low-tempo escape where salt lakes, dunes, pottery, and open sky make the day feel longer.",
    accent: "#e4b978",
    image: "/map-fayoum.png",
    baseDays: 4,
    tags: ["Nature", "Water", "Slow"],
    connections: ["Cairo", "Red Sea"],
    stops: [
      { id: "fayoum", name: "Fayoum", detail: "Palm-lined water and village life", x: 29, y: 42 },
      { id: "tunis", name: "Tunis Village", detail: "Handmade ceramics and a calm lunch", x: 20, y: 56 },
      { id: "rayan", name: "Wadi El Rayan", detail: "Waterfalls in the desert", x: 28, y: 70 },
      { id: "whale", name: "Wadi El Hitan", detail: "A fossil valley under wide skies", x: 15, y: 76 },
    ],
    routes: {
      solo: ["fayoum", "tunis", "whale", "rayan"],
      family: ["fayoum", "tunis", "rayan"],
    },
    familyNote: "A gentle sequence of water, craft, and short scenic drives that works for mixed ages.",
    soloNote: "Add the fossil valley and a longer desert sunset when you want the landscape to lead the day.",
  },
  {
    name: "Luxor",
    eyebrow: "THE OPEN-AIR MUSEUM",
    summary: "Temple silhouettes, quiet river crossings, and a day that moves between the east and west banks.",
    accent: "#f1c884",
    image: "/map-luxor.png",
    baseDays: 5,
    tags: ["History", "Water", "Sunrise"],
    connections: ["Nile Cruise", "Aswan"],
    stops: [
      { id: "karnak", name: "Karnak", detail: "Columns that catch the early sun", x: 54, y: 48 },
      { id: "west-bank", name: "West Bank", detail: "Valleys, tombs, and local guides", x: 48, y: 58 },
      { id: "luxor", name: "Luxor Temple", detail: "An evening walk by the river", x: 58, y: 63 },
      { id: "esna", name: "Esna", detail: "A slower market town by water", x: 59, y: 73 },
    ],
    routes: {
      solo: ["karnak", "west-bank", "luxor", "esna"],
      family: ["karnak", "luxor", "west-bank"],
    },
    familyNote: "The shorter version balances two iconic temple moments with a boat ride and an early finish.",
    soloNote: "Take the west bank slowly, then continue south for a more local final day in Esna.",
  },
  {
    name: "Red Sea",
    eyebrow: "THE BLUE EDGE",
    summary: "A bright-water reset built around reef time, easy boat days, and the rhythm of the coast.",
    accent: "#72e6dc",
    image: "/map-red-sea.png",
    baseDays: 5,
    tags: ["Water", "Nature", "Slow"],
    connections: ["Cairo", "Aswan"],
    stops: [
      { id: "hurghada", name: "Hurghada", detail: "The coast as your starting point", x: 77, y: 42 },
      { id: "giftun", name: "Giftun", detail: "A clear-water island day", x: 85, y: 51 },
      { id: "gouna", name: "El Gouna", detail: "Canals, cafés, and a soft sunset", x: 82, y: 33 },
      { id: "reef", name: "House Reef", detail: "An easy morning under the surface", x: 72, y: 58 },
    ],
    routes: {
      solo: ["hurghada", "reef", "giftun", "gouna"],
      family: ["hurghada", "giftun", "gouna"],
    },
    familyNote: "The family route keeps boat time simple and pairs the reef with calm, walkable evenings.",
    soloNote: "Stay longer on the water and finish with El Gouna when you want a more social final night.",
  },
  {
    name: "Nile Cruise",
    eyebrow: "THE RIVER, IN MOTION",
    summary: "A moving base between ancient temples, with the Nile doing the work between each considered stop.",
    accent: "#8be8dc",
    image: "/map-nile-cruise.png",
    baseDays: 7,
    tags: ["Water", "History", "Slow"],
    connections: ["Luxor", "Aswan"],
    stops: [
      { id: "luxor-start", name: "Luxor", detail: "Begin with the river at first light", x: 55, y: 51 },
      { id: "esna-cruise", name: "Esna", detail: "A quiet lock and a local market", x: 58, y: 64 },
      { id: "edfu", name: "Edfu", detail: "A temple reached by carriage", x: 61, y: 75 },
      { id: "aswan-end", name: "Aswan", detail: "Granite islands and Nubian warmth", x: 65, y: 87 },
    ],
    routes: {
      solo: ["luxor-start", "esna-cruise", "edfu", "aswan-end"],
      family: ["luxor-start", "edfu", "aswan-end"],
    },
    familyNote: "A floating base, short guided visits, and built-in rest make this the easiest multi-stop family route.",
    soloNote: "Keep the full four-stop rhythm and use the sail days as your space to read, sketch, or simply watch.",
  },
  {
    name: "Aswan",
    eyebrow: "THE SOUTHERN LIGHT",
    summary: "Warm stone, Nubian colour, and a slower river edge that makes room for the details between landmarks.",
    accent: "#e9bc7e",
    image: "/map-aswan.png",
    baseDays: 5,
    tags: ["Culture", "Water", "History"],
    connections: ["Nile Cruise", "Red Sea"],
    stops: [
      { id: "aswan", name: "Aswan", detail: "A riverfront beginning in gold light", x: 65, y: 86 },
      { id: "philae", name: "Philae", detail: "A temple reached by water", x: 72, y: 78 },
      { id: "nubian", name: "Nubian Village", detail: "Colour, tea, and a generous welcome", x: 76, y: 91 },
      { id: "abu-simbel", name: "Abu Simbel", detail: "A monumental southern finale", x: 84, y: 82 },
    ],
    routes: {
      solo: ["aswan", "philae", "nubian", "abu-simbel"],
      family: ["aswan", "philae", "nubian"],
    },
    familyNote: "The family plan stays close to the river and gives the south a relaxed, story-led rhythm.",
    soloNote: "Extend south to Abu Simbel when you want the route to end with one unforgettable scale moment.",
  },
];

export function getPlannerDestination(name: string | null | undefined) {
  return plannerDestinations.find((destination) => destination.name.toLowerCase() === name?.toLowerCase()) ?? plannerDestinations[0];
}
