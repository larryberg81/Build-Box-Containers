import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Thermometer, Flame, DoorOpen, ShieldCheck, Truck, ClipboardCheck } from "lucide-react";

interface Container {
  id: string;
  name: string;
  condition: "Used" | "One-Trip";
  type: "Standard" | "Modified" | "Heated" | "Reefer";
  category: string;
  size: string;
  extDimensions: string;
  intDimensions: string;
  doorOpening?: string;
  payload: string;
  volume: string;
  price: string;
  rentPrice?: string;
  image: string;
  badge?: string;
  features: string[];
  desc: string;
}

const CONTAINERS: Container[] = [
  // ── 10 FT ──────────────────────────────────────────────────────
  {
    id: "10-used",
    name: "10' Used",
    condition: "Used",
    type: "Standard",
    category: "10 ft",
    size: "10 ft",
    extDimensions: "10'L × 8'W × 8.5'H",
    intDimensions: "9'4\"L × 7'8\"W × 7'10\"H",
    payload: "21,700 lbs",
    volume: "573 cu ft",
    price: "$850",
    rentPrice: "From $95/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-10-used-yard.jpg",
    features: ["Wind & watertight", "Lockbox ready", "Forklift pockets", "Cargo-grade floor"],
    desc: "A compact, battle-tested unit. Light cosmetic wear, fully watertight and structurally sound. Ideal for residential storage and tight urban sites.",
  },
  {
    id: "10-new-side",
    name: "10' New — Side Door",
    condition: "One-Trip",
    type: "Modified",
    category: "10 ft",
    size: "10 ft",
    extDimensions: "10'L × 8'W × 8.5'H",
    intDimensions: "9'4\"L × 7'8\"W × 7'10\"H",
    payload: "21,700 lbs",
    volume: "573 cu ft",
    price: "$1,200",
    rentPrice: "From $120/mo",
    doorOpening: "Personnel side door: 3' W × 6'8\" H",
    image: "/images/container-10-side-door-yard.jpg",
    badge: "New",
    features: ["One-trip condition", "Personnel side door", "Lockbox ready", "Forklift pockets"],
    desc: "Factory-fresh one-trip unit with a fitted personnel side door — great for tool sheds and backyard studios where front access isn't practical.",
  },

  // ── 20 FT ──────────────────────────────────────────────────────
  {
    id: "20-used",
    name: "20' Used",
    condition: "Used",
    type: "Standard",
    category: "20 ft",
    size: "20 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "19'4\"L × 7'8\"W × 7'10\"H",
    payload: "47,900 lbs",
    volume: "1,170 cu ft",
    price: "$1,100",
    rentPrice: "From $140/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-20-used-yard.jpg",
    badge: "Best Value",
    features: ["Wind & watertight", "Double cargo doors", "Forklift pockets", "Corner castings"],
    desc: "The industry standard. Wind and watertight with cosmetic use marks. Handles job-site storage to event use with zero fuss.",
  },
  {
    id: "20-new",
    name: "20' New",
    condition: "One-Trip",
    type: "Standard",
    category: "20 ft",
    size: "20 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "19'4\"L × 7'8\"W × 7'10\"H",
    payload: "47,900 lbs",
    volume: "1,170 cu ft",
    price: "$2,200",
    rentPrice: "From $175/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-20-new-yard.jpg",
    badge: "Most Popular",
    features: ["One-trip condition", "Double cargo doors", "Forklift pockets", "Corner castings", "Vent plugs"],
    desc: "Fresh from the factory, one cargo trip. Pristine corten steel interior — the right choice when condition matters for conversions or client-facing use.",
  },
  {
    id: "20-hc-side",
    name: "20' HC — Side Doors",
    condition: "Used",
    type: "Modified",
    category: "20 ft",
    size: "20 ft HC",
    extDimensions: "20'L × 8'W × 9.5'H",
    intDimensions: "19'4\"L × 7'8\"W × 8'10\"H",
    payload: "44,100 lbs",
    volume: "1,300 cu ft",
    price: "$2,600",
    rentPrice: "From $210/mo",
    doorOpening: "Side access opening: approx. 14' W × 8'5\" H",
    image: "/images/container-20-side-door-yard.jpg",
    features: ["High Cube — extra 1ft headroom", "Modified side access doors", "Wind & watertight", "Ideal for retail & office fitouts"],
    desc: "Extra headroom plus a side-door opening makes this the go-to for pop-up retail, cafés, and site offices where walk-in access from the side is key.",
  },
  {
    id: "20-heated-side",
    name: "20' Heated — Side Doors",
    condition: "One-Trip",
    type: "Heated",
    category: "20 ft",
    size: "20 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "19'4\"L × 7'8\"W × 7'10\"H",
    payload: "47,900 lbs",
    volume: "1,170 cu ft",
    price: "$3,400",
    rentPrice: "From $280/mo",
    doorOpening: "Side access door: 3' W × 6'8\" H",
    image: "/images/container-20-heated-yard.jpg",
    features: ["Integrated heating system", "Side access doors", "Spray foam insulation", "Electrical package included", "Thermostat control"],
    desc: "Cold-climate ready. A fully insulated and heated 20ft with side door access — built for year-round use in northern job sites, workshops, and storage.",
  },

  // ── 30 FT ──────────────────────────────────────────────────────
  {
    id: "30-used",
    name: "30' Used",
    condition: "Used",
    type: "Standard",
    category: "30 ft",
    size: "30 ft",
    extDimensions: "30'L × 8'W × 8.5'H",
    intDimensions: "29'4\"L × 7'8\"W × 7'10\"H",
    payload: "54,000 lbs",
    volume: "1,760 cu ft",
    price: "$1,650",
    rentPrice: "From $195/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-30-used-yard.jpg",
    features: ["Wind & watertight", "Double cargo doors", "Forklift pockets", "Corner castings"],
    desc: "The middle ground between a 20ft and 40ft. Wind and watertight with standard use marks — great for mid-size construction sites and commercial storage.",
  },
  {
    id: "30-new",
    name: "30' New",
    condition: "One-Trip",
    type: "Standard",
    category: "30 ft",
    size: "30 ft",
    extDimensions: "30'L × 8'W × 8.5'H",
    intDimensions: "29'4\"L × 7'8\"W × 7'10\"H",
    payload: "54,000 lbs",
    volume: "1,760 cu ft",
    price: "$2,550",
    rentPrice: "From $235/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-30-new-yard.jpg",
    badge: "New",
    features: ["One-trip condition", "Double cargo doors", "Forklift pockets", "Corner castings", "Vent plugs"],
    desc: "One-trip 30ft — pristine steel, maximum volume for a mid-size footprint. Fits sites where a 40ft is too long but a 20ft isn't enough.",
  },

  // ── 40 FT ──────────────────────────────────────────────────────
  {
    id: "40-used",
    name: "40' Used",
    condition: "Used",
    type: "Standard",
    category: "40 ft",
    size: "40 ft",
    extDimensions: "40'L × 8'W × 8.5'H",
    intDimensions: "39'5\"L × 7'8\"W × 7'10\"H",
    payload: "59,040 lbs",
    volume: "2,390 cu ft",
    price: "$1,900",
    rentPrice: "From $220/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-40-used-yard.jpg",
    features: ["Wind & watertight", "Double cargo doors", "Forklift pockets", "Corner castings"],
    desc: "Maximum capacity at used pricing. Structurally sound with standard cosmetic wear — the workhorse for large construction sites and industrial storage.",
  },
  {
    id: "40-new",
    name: "40' New",
    condition: "One-Trip",
    type: "Standard",
    category: "40 ft",
    size: "40 ft",
    extDimensions: "40'L × 8'W × 8.5'H",
    intDimensions: "39'5\"L × 7'8\"W × 7'10\"H",
    payload: "59,040 lbs",
    volume: "2,390 cu ft",
    price: "$3,200",
    rentPrice: "From $270/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-40-new-yard.jpg",
    badge: "New",
    features: ["One-trip condition", "Double cargo doors", "Forklift pockets", "Corner castings", "Vent plugs"],
    desc: "One-trip 40ft. Clean steel throughout — the benchmark choice for large-scale modifications, multi-room layouts, and permanent installations.",
  },
  {
    id: "40-hc-side",
    name: "40' HC — Side Doors",
    condition: "Used",
    type: "Modified",
    category: "40 ft",
    size: "40 ft HC",
    extDimensions: "40'L × 8'W × 9.5'H",
    intDimensions: "39'5\"L × 7'8\"W × 8'10\"H",
    payload: "58,600 lbs",
    volume: "2,700 cu ft",
    price: "$3,600",
    rentPrice: "From $310/mo",
    doorOpening: "Side access opening: approx. 14' W × 8'5\" H",
    image: "/images/container-40-side-door-yard.jpg",
    features: ["High Cube — extra 1ft headroom", "Modified side access doors", "2,700 cu ft capacity", "Preferred for modular builds"],
    desc: "The largest modified unit in the fleet. Extra headroom plus side-door access for walk-in layouts — the foundation of choice for modular offices and retail.",
  },
  {
    id: "40-heated-side",
    name: "40' Heated — Side Doors",
    condition: "One-Trip",
    type: "Heated",
    category: "40 ft",
    size: "40 ft",
    extDimensions: "40'L × 8'W × 8.5'H",
    intDimensions: "39'5\"L × 7'8\"W × 7'10\"H",
    payload: "59,040 lbs",
    volume: "2,390 cu ft",
    price: "$4,400",
    rentPrice: "From $380/mo",
    doorOpening: "Side access door: 3' W × 6'8\" H",
    image: "/images/container-40-side-door-yard.jpg",
    features: ["Integrated heating system", "Side access doors", "Spray foam insulation", "Electrical package included", "Thermostat control", "220V power ready"],
    desc: "Full-size, year-round ready. Insulated, heated, and side-door accessible — built for northern climate job sites, large workshops, and permanent installs.",
  },

  // ── REEFER ─────────────────────────────────────────────────────
  {
    id: "reefer-20-used",
    name: "20' Reefer — Used",
    condition: "Used",
    type: "Reefer",
    category: "20 ft",
    size: "20 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "17'8\"L × 7'6\"W × 7'5\"H",
    payload: "47,900 lbs",
    volume: "1,000 cu ft",
    price: "$3,500",
    rentPrice: "From $320/mo",
    doorOpening: "Cargo doors: 7'6\" W × 7'5\" H",
    image: "/images/container-20-reefer-yard.jpg",
    features: ["Refrigeration unit included", "Temp range: -25°F to +77°F", "Insulated floor & walls", "Wind & watertight", "Genset-ready mounting"],
    desc: "Wind and watertight 20ft reefer with operational refrigeration unit. Light cosmetic wear — temperature-verified and tested before delivery.",
  },
  {
    id: "reefer-20-new",
    name: "20' Reefer — New",
    condition: "One-Trip",
    type: "Reefer",
    category: "20 ft",
    size: "20 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "17'8\"L × 7'6\"W × 7'5\"H",
    payload: "47,900 lbs",
    volume: "1,000 cu ft",
    price: "$6,800",
    rentPrice: "From $520/mo",
    doorOpening: "Cargo doors: 7'6\" W × 7'5\" H",
    image: "/images/container-20-reefer-yard.jpg",
    features: ["One-trip condition", "Refrigeration unit included", "Temp range: -25°F to +77°F", "T-floor aluminum decking", "Insulated walls & ceiling", "Genset-ready mounting"],
    desc: "One-trip factory-fresh 20ft reefer. Pristine insulated interior with full refrigeration system — the right choice for cold-chain, food storage, and pharma logistics.",
  },
  {
    id: "reefer-40-used",
    name: "40' Reefer — Used",
    condition: "Used",
    type: "Reefer",
    category: "40 ft",
    size: "40 ft",
    extDimensions: "40'L × 8'W × 8.5'H",
    intDimensions: "37'9\"L × 7'6\"W × 7'5\"H",
    payload: "59,040 lbs",
    volume: "2,100 cu ft",
    price: "$4,800",
    rentPrice: "From $420/mo",
    doorOpening: "Cargo doors: 7'6\" W × 7'5\" H",
    image: "/images/container-40-reefer-yard.jpg",
    features: ["Refrigeration unit included", "Temp range: -25°F to +77°F", "T-floor aluminum decking", "Insulated walls & ceiling", "Wind & watertight", "Genset-ready mounting"],
    desc: "Maximum cold-storage capacity at used pricing. Structurally sound with standard cosmetic wear — temperature-tested and ready for immediate deployment.",
  },
  {
    id: "reefer-40hc-new",
    name: "40' HC Reefer — New",
    condition: "One-Trip",
    type: "Reefer",
    category: "40 ft",
    size: "40 ft HC",
    extDimensions: "40'L × 8'W × 9.5'H",
    intDimensions: "37'9\"L × 7'6\"W × 8'5\"H",
    payload: "58,600 lbs",
    volume: "2,400 cu ft",
    price: "$9,200",
    rentPrice: "From $680/mo",
    doorOpening: "Cargo doors: 7'6\" W × 8'5\" H",
    image: "/images/container-40-reefer-yard.jpg",
    features: ["One-trip condition", "High Cube — extra 1ft headroom", "Refrigeration unit included", "Temp range: -25°F to +77°F", "T-floor aluminum decking", "Insulated walls & ceiling", "Genset-ready mounting"],
    desc: "Premium one-trip 40ft high-cube reefer. Extra headroom, maximum capacity, and full refrigeration system — the flagship choice for large-scale cold-chain operations.",
  },
];

const CATEGORIES = ["All", "10 ft", "20 ft", "30 ft", "40 ft"];
const CONDITIONS = ["All", "Used", "One-Trip"];
const TYPES = ["All", "Standard", "High Cube", "Modified", "Heated", "Reefer"];

const CONDITION_COLORS: Record<string, string> = {
  Used:      "bg-muted text-muted-foreground border border-border",
  "One-Trip": "bg-emerald-900/60 text-emerald-300 border border-emerald-700/50",
};

const TYPE_COLORS: Record<string, string> = {
  Standard: "bg-muted text-foreground border border-border",
  Modified: "bg-primary/10 text-primary border border-primary/30",
  Heated:   "bg-orange-950/70 text-orange-300 border border-orange-800/60",
  Reefer:   "bg-blue-950/70 text-blue-300 border border-blue-800/60",
};

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-semibold text-right">{value}</span>
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {options.map(option => (
          <button
            key={option}
            data-testid={`${label.toLowerCase()}-filter-${option.toLowerCase().replace(/[\s-]/g, "-")}`}
            onClick={() => onChange(option)}
            className={`flex-shrink-0 border px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
              value === option
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Containers() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCondition, setActiveCondition] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);

  const filtered = CONTAINERS.filter(c => {
    const catMatch = activeCategory === "All" || c.category === activeCategory;
    const condMatch = activeCondition === "All" || c.condition === activeCondition;
    const typeMatch =
      activeType === "All" ||
      (activeType === "High Cube" ? c.size.includes("HC") : c.type === activeType);
    return catMatch && condMatch && typeMatch;
  });

  return (
    <div className="bg-background min-h-screen pt-16">
      {/* Header */}
      <section className="border-b border-border bg-card py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <p className="text-primary text-sm font-bold tracking-widest uppercase mb-3">Full Fleet</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">Containers</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
             Used, one-trip, heated, modified, and refrigerated units from 10ft to 40ft — all available to buy or rent.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid gap-4 py-4 md:grid-cols-3">
            <FilterGroup label="Size" options={CATEGORIES} value={activeCategory} onChange={setActiveCategory} />
            <FilterGroup label="Condition" options={CONDITIONS} value={activeCondition} onChange={setActiveCondition} />
            <FilterGroup label="Type" options={TYPES} value={activeType} onChange={setActiveType} />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          {filtered.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              <p className="text-lg font-display font-bold uppercase">No containers match those filters.</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(container => (
              <div
                key={container.id}
                data-testid={`container-card-${container.id}`}
                onClick={() => setSelectedContainer(container)}
                className="group border border-border bg-card flex flex-col hover:border-primary/60 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 relative cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-[16/10] relative overflow-hidden bg-muted">
                  <img
                    src={container.image}
                    alt={container.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/10" />
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                    <span className="bg-background/95 text-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-2 shadow-lg">
                      <span className="mr-2 text-primary">●</span>
                      {container.size} · {container.type}
                    </span>
                    {container.badge && (
                      <span className="bg-background/95 text-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-2 shadow-lg">
                        {container.badge}
                      </span>
                    )}
                  </div>
                  {/* Condition icon badges */}
                  <div className="absolute bottom-14 right-3 flex gap-1">
                    {container.type === "Heated" && (
                      <div className="bg-orange-900/90 backdrop-blur p-1.5"><Flame className="h-3.5 w-3.5 text-orange-300" /></div>
                    )}
                    {container.features.some(f => f.toLowerCase().includes("side")) && (
                      <div className="bg-background/80 backdrop-blur p-1.5"><DoorOpen className="h-3.5 w-3.5 text-foreground" /></div>
                    )}
                    {container.type === "Reefer" && (
                      <div className="bg-blue-900/90 backdrop-blur p-1.5"><Thermometer className="h-3.5 w-3.5 text-blue-300" /></div>
                    )}
                  </div>
                  <h3 className="absolute bottom-4 left-4 right-4 text-xl md:text-2xl font-display font-bold uppercase leading-tight text-white drop-shadow-lg">
                    {container.name}
                  </h3>
                </div>

                {/* Info */}
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 ${CONDITION_COLORS[container.condition]}`}>
                      {container.condition}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 ${TYPE_COLORS[container.type]}`}>
                      {container.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5 line-clamp-3 leading-relaxed">{container.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {container.features.slice(0, 3).map(f => (
                      <span key={f} className="text-[10px] font-semibold uppercase tracking-wider bg-primary/5 text-primary px-2 py-1 border border-primary/20">
                        {f}
                      </span>
                    ))}
                    {container.features.length > 3 && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 border border-border">
                        +{container.features.length - 3} more
                      </span>
                    )}
                  </div>

                  {container.doorOpening && (
                    <div className="mb-5 flex items-start gap-2 border-l-2 border-primary pl-3">
                      <DoorOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Door / opening</p>
                        <p className="mt-1 text-xs font-mono text-foreground">{container.doorOpening}</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto flex items-end justify-between border-t border-border pt-5">
                    <div>
                      <div className="text-2xl font-display font-bold text-foreground">{container.price}</div>
                      {container.rentPrice && (
                        <div className="text-xs text-muted-foreground">{container.rentPrice}</div>
                      )}
                    </div>
                    <button className="text-xs font-bold text-primary uppercase tracking-wider hover:text-primary/80 transition-colors flex items-center gap-1">
                      Full Specs <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price table */}
      <section className="border-t border-border bg-card py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-8">Quick Price Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-xs">Container</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-xs">Condition</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-xs hidden md:table-cell">Type</th>
                  <th className="text-right px-4 py-3 font-bold uppercase tracking-wider text-xs">Purchase Price</th>
                  <th className="text-right px-4 py-3 font-bold uppercase tracking-wider text-xs hidden sm:table-cell">Est. Rental/mo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {CONTAINERS.map(c => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedContainer(c)}
                    className="hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-bold">{c.name}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${CONDITION_COLORS[c.condition]}`}>
                        {c.condition}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${TYPE_COLORS[c.type]}`}>
                        {c.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-display font-bold text-primary">{c.price}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground hidden sm:table-cell">{c.rentPrice ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-background py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-4">Ready to Order?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Use our quote calculator to build your exact configuration, or talk directly with our team.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="inline-flex h-12 items-center justify-center bg-primary px-8 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all uppercase tracking-wider">
              Open Quote Calculator
            </Link>
            <Link href="/contact" className="inline-flex h-12 items-center justify-center border-2 border-border bg-background px-8 text-sm font-bold hover:bg-muted transition-all uppercase tracking-wider">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Spec sheet modal */}
      {selectedContainer && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedContainer(null)}
        >
          <div
            className="bg-card border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="aspect-video overflow-hidden">
              <img src={selectedContainer.image} alt={selectedContainer.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <div className="flex items-start gap-3 mb-2 flex-wrap">
                <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                  {selectedContainer.size}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${CONDITION_COLORS[selectedContainer.condition]}`}>
                  {selectedContainer.condition}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${TYPE_COLORS[selectedContainer.type]}`}>
                  {selectedContainer.type}
                </span>
                <h2 className="w-full text-2xl font-display font-bold uppercase">{selectedContainer.name}</h2>
              </div>
              <p className="text-muted-foreground mb-6">{selectedContainer.desc}</p>

              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Specifications</p>
                <div className="border border-border divide-y divide-border">
                  <SpecRow label="External Dimensions" value={selectedContainer.extDimensions} />
                  <SpecRow label="Internal Dimensions" value={selectedContainer.intDimensions} />
                  {selectedContainer.doorOpening && <SpecRow label="Door / Opening" value={selectedContainer.doorOpening} />}
                  {selectedContainer.payload !== "N/A" && <SpecRow label="Max Payload" value={selectedContainer.payload} />}
                  {selectedContainer.volume !== "N/A" && <SpecRow label="Internal Volume" value={selectedContainer.volume} />}
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Included Features</p>
                <div className="flex flex-wrap gap-2">
                  {selectedContainer.features.map(f => (
                    <span key={f} className="text-xs font-semibold uppercase tracking-wider bg-muted text-foreground px-3 py-1.5 border border-border">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8 border border-primary/30 bg-primary/5 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Coverage &amp; Delivery</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-bold">Guaranteed watertight</p>
                      <p className="text-xs text-muted-foreground mt-1">10-year structural warranty</p>
                      <p className="text-xs text-muted-foreground">3-year watertight warranty</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ClipboardCheck className="h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-bold">Inspected before delivery</p>
                      <p className="text-xs text-muted-foreground mt-1">Floors, doors, hinges, seals, and structure checked</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-bold">Fast delivery</p>
                      <p className="text-xs text-muted-foreground mt-1">Typically delivered to your specified location within 3–5 days</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-border">
                <div>
                  <div className="text-3xl font-display font-bold">{selectedContainer.price}</div>
                  {selectedContainer.rentPrice && (
                    <div className="text-sm text-muted-foreground">{selectedContainer.rentPrice}</div>
                  )}
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/quote"
                    onClick={() => setSelectedContainer(null)}
                    className="inline-flex h-11 items-center justify-center bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all uppercase tracking-wider"
                  >
                    Get a Quote
                  </Link>
                  <button
                    onClick={() => setSelectedContainer(null)}
                    className="inline-flex h-11 items-center justify-center border border-border px-6 text-sm font-bold hover:bg-muted transition-all uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
