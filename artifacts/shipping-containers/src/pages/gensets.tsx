import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Zap, Weight, Volume2, Fuel, X } from "lucide-react";

interface Genset {
  id: string;
  brand: string;
  model: string;
  power: string;
  fuel: string;
  engine: string;
  weight: string;
  noise: string;
  compatible: string;
  buyPrice: string;
  rentPrice: string;
  features: string[];
  badge?: string;
  desc: string;
}

const GENSETS: Genset[] = [
  // ── Thermo King ────────────────────────────────────────────────
  {
    id: "tk-sl400e",
    brand: "Thermo King",
    model: "SL-400e",
    power: "6.5 kW",
    fuel: "Diesel",
    engine: "Yanmar 3TNV88",
    weight: "370 lbs",
    noise: "72 dB(A)",
    compatible: "20 ft, 30 ft",
    buyPrice: "$5,800",
    rentPrice: "$280/mo",
    features: ["Electronic control panel", "Auto-start on power loss", "Low oil shutdown", "Hour meter", "Lockable enclosure"],
    desc: "Entry-level Thermo King undermount. Compact, reliable, and purpose-built for 20ft reefer units with minimal fuel burn.",
  },
  {
    id: "tk-ut800",
    brand: "Thermo King",
    model: "UT-800",
    power: "8.0 kW",
    fuel: "Diesel",
    engine: "Yanmar 3TNV82A",
    weight: "430 lbs",
    noise: "74 dB(A)",
    compatible: "20 ft, 30 ft, 40 ft",
    buyPrice: "$7,200",
    rentPrice: "$340/mo",
    badge: "Best Seller",
    features: ["Digital SmartPower controller", "Remote monitoring ready", "Auto-start / auto-stop", "Low-temp cold start kit", "Lockable enclosure", "Hour meter"],
    desc: "The UT-800 is Thermo King's most popular undermount. Rugged, versatile, and compatible with all standard reefer sizes.",
  },
  {
    id: "tk-ut1000",
    brand: "Thermo King",
    model: "UT-1000",
    power: "10.0 kW",
    fuel: "Diesel",
    engine: "Yanmar 4TNV88",
    weight: "490 lbs",
    noise: "76 dB(A)",
    compatible: "40 ft, 40 ft HC",
    buyPrice: "$8,900",
    rentPrice: "$420/mo",
    features: ["Heavy-duty 4-cylinder engine", "Digital SmartPower controller", "Remote monitoring ready", "Dual-voltage output", "Cold-climate package", "Hour meter"],
    desc: "Maximum output for 40ft and high-cube reefers. The UT-1000 handles demanding loads and extended runtimes without breaking a sweat.",
  },

  // ── Carrier Transicold ─────────────────────────────────────────
  {
    id: "ct-gen6300",
    brand: "Carrier Transicold",
    model: "GEN 6300",
    power: "6.3 kW",
    fuel: "Diesel",
    engine: "Kubota D1105",
    weight: "355 lbs",
    noise: "71 dB(A)",
    compatible: "20 ft",
    buyPrice: "$5,500",
    rentPrice: "$265/mo",
    features: ["Carrier APX controller", "Auto-start on grid loss", "Low-noise muffler", "Lockable enclosure", "Hour meter"],
    desc: "Carrier's compact undermount designed specifically for 20ft reefer containers. Quiet operation and solid Kubota engineering.",
  },
  {
    id: "ct-gen7500",
    brand: "Carrier Transicold",
    model: "GEN 7500",
    power: "7.5 kW",
    fuel: "Diesel",
    engine: "Kubota D1305",
    weight: "420 lbs",
    noise: "73 dB(A)",
    compatible: "20 ft, 30 ft, 40 ft",
    buyPrice: "$7,000",
    rentPrice: "$330/mo",
    badge: "Most Popular",
    features: ["Carrier APX+ controller", "CAN-bus monitoring", "Auto-start / auto-stop", "Anti-theft immobilizer", "Lockable enclosure", "Hour meter"],
    desc: "The GEN 7500 is the fleet favorite. Compatible with all major reefer brands and sizes, with Carrier's industry-leading APX+ controls.",
  },
  {
    id: "ct-naturaline",
    brand: "Carrier Transicold",
    model: "NaturaLINE NG",
    power: "7.5 kW",
    fuel: "CNG / LNG",
    engine: "Westport 3.8L NG",
    weight: "380 lbs",
    noise: "68 dB(A)",
    compatible: "20 ft, 40 ft",
    buyPrice: "$9,400",
    rentPrice: "$460/mo",
    badge: "Eco",
    features: ["Natural gas / LNG fuel", "55% lower CO₂ vs diesel", "Ultra-low NOx certified", "Carrier APX+ controller", "Port-compliant emissions", "Hour meter"],
    desc: "Carrier's clean-energy undermount. Runs on CNG or LNG for port-compliant, ultra-low-emission operation — the future-proof choice.",
  },

  // ── Genmark ────────────────────────────────────────────────────
  {
    id: "gm-460",
    brand: "Genmark",
    model: "GM-460",
    power: "4.6 kW",
    fuel: "Diesel",
    engine: "Hatz 1B50",
    weight: "310 lbs",
    noise: "69 dB(A)",
    compatible: "20 ft",
    buyPrice: "$4,200",
    rentPrice: "$210/mo",
    features: ["Single-cylinder Hatz engine", "Compact low-profile mount", "Manual start with auto-backup", "Lockable enclosure", "Hour meter"],
    desc: "Genmark's lightest undermount. Best-in-class noise levels and the lowest weight on the market — ideal for residential areas and urban sites.",
  },
  {
    id: "gm-540",
    brand: "Genmark",
    model: "GM-540",
    power: "5.4 kW",
    fuel: "Diesel",
    engine: "Hatz 2G40",
    weight: "340 lbs",
    noise: "70 dB(A)",
    compatible: "20 ft, 30 ft",
    buyPrice: "$5,100",
    rentPrice: "$248/mo",
    features: ["2-cylinder Hatz engine", "Digital control unit", "Auto-start on power loss", "Extended fuel tank (+30%)", "Lockable enclosure", "Hour meter"],
    desc: "The mid-range Genmark. Quiet, fuel-efficient, and built for continuous-duty operation on construction sites and port facilities.",
  },
  {
    id: "gm-750",
    brand: "Genmark",
    model: "GM-750",
    power: "7.5 kW",
    fuel: "Diesel",
    engine: "Hatz 3M41",
    weight: "415 lbs",
    noise: "72 dB(A)",
    compatible: "20 ft, 30 ft, 40 ft",
    buyPrice: "$6,800",
    rentPrice: "$320/mo",
    badge: "Best Value",
    features: ["3-cylinder Hatz engine", "Digital control unit", "Remote start compatible", "Cold-climate kit included", "Anti-theft immobilizer", "Hour meter"],
    desc: "Genmark's flagship model. Full reefer compatibility, great fuel economy, and the lowest price point in the 7.5 kW class.",
  },

  // ── ReeGen ─────────────────────────────────────────────────────
  {
    id: "rg-6500",
    brand: "ReeGen",
    model: "RG-6500 Eco",
    power: "6.5 kW",
    fuel: "Hybrid Diesel-Electric",
    engine: "Kubota + Li-Ion Battery Pack",
    weight: "395 lbs",
    noise: "65 dB(A)",
    compatible: "20 ft",
    buyPrice: "$8,400",
    rentPrice: "$410/mo",
    badge: "Hybrid",
    features: ["Hybrid diesel-electric operation", "Battery-only silent mode", "65% reduced idle fuel burn", "Smart load management", "Fleet telematics included", "Hour meter"],
    desc: "ReeGen's hybrid undermount runs on battery at low load and fires the diesel engine only when needed. Best noise and emission performance in the class.",
  },
  {
    id: "rg-9000",
    brand: "ReeGen",
    model: "RG-9000 Pro",
    power: "9.0 kW",
    fuel: "Hybrid Diesel-Electric",
    engine: "Perkins 403F + Li-Ion Pack",
    weight: "460 lbs",
    noise: "67 dB(A)",
    compatible: "30 ft, 40 ft, 40 ft HC",
    buyPrice: "$11,200",
    rentPrice: "$530/mo",
    badge: "Hybrid",
    features: ["Hybrid diesel-electric operation", "Battery-only silent mode", "Fleet telematics + cloud dashboard", "Smart load management", "Cold-climate package", "Dual-voltage output", "Hour meter"],
    desc: "ReeGen's high-output hybrid. Covers 40ft and HC reefers with class-leading fuel savings and real-time cloud monitoring for fleet operators.",
  },
  {
    id: "rg-1200",
    brand: "ReeGen",
    model: "RG-1200 Max",
    power: "12.0 kW",
    fuel: "Hybrid Diesel-Electric",
    engine: "Perkins 404F + Li-Ion Pack",
    weight: "520 lbs",
    noise: "68 dB(A)",
    compatible: "40 ft, 40 ft HC",
    buyPrice: "$13,500",
    rentPrice: "$640/mo",
    badge: "Hybrid",
    features: ["Highest output in class — 12.0 kW", "Hybrid diesel-electric operation", "Battery-only silent mode", "Port-compliant low-emission mode", "Fleet telematics + cloud dashboard", "Dual-voltage output", "Cold-climate package"],
    desc: "ReeGen's premium flagship. 12 kW of hybrid power for the most demanding 40ft and HC fleets — with port-compliant emission modes built in.",
  },
];

const BRANDS = ["All", "Thermo King", "Carrier Transicold", "Genmark", "ReeGen"];

const BRAND_COLORS: Record<string, string> = {
  "Thermo King":        "bg-blue-900/60 text-blue-300",
  "Carrier Transicold": "bg-sky-900/60 text-sky-300",
  "Genmark":            "bg-amber-900/60 text-amber-300",
  "ReeGen":             "bg-emerald-900/60 text-emerald-300",
};

const BRAND_ACCENT: Record<string, string> = {
  "Thermo King":        "border-blue-500/40",
  "Carrier Transicold": "border-sky-500/40",
  "Genmark":            "border-amber-500/40",
  "ReeGen":             "border-emerald-500/40",
};

const BRAND_IMAGES: Record<string, string> = {
  "Thermo King":        "/images/genset-thermo-king.png",
  "Carrier Transicold": "/images/genset-carrier.png",
  "Genmark":            "/images/genset-product-shot.jpg",
  "ReeGen":             "/images/genset-reegen.png",
};

const BADGE_COLORS: Record<string, string> = {
  "Best Seller":  "bg-primary text-primary-foreground",
  "Most Popular": "bg-primary text-primary-foreground",
  "Best Value":   "bg-amber-500 text-black",
  "Eco":          "bg-emerald-600 text-white",
  "Hybrid":       "bg-emerald-600 text-white",
};

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background border border-border p-3">
      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground leading-none mb-1">{label}</p>
      <p className="text-sm font-bold text-foreground">{value}</p>
    </div>
  );
}

export default function Gensets() {
  const [activeBrand, setActiveBrand] = useState("All");
  const [selected, setSelected] = useState<Genset | null>(null);

  const filtered = activeBrand === "All" ? GENSETS : GENSETS.filter(g => g.brand === activeBrand);

  return (
    <div className="bg-background min-h-screen pt-16">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background: real installed genset photo */}
        <div className="absolute inset-0">
          <img
            src="/images/genset-installed.jpg"
            alt="Undermount genset installed under container"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-background/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 md:px-8 max-w-7xl py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-4">Power Solutions</p>
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight leading-none mb-5">
              Undermount<br />Gensets
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mb-8">
              Low-profile diesel and hybrid generator sets that mount directly under any reefer container — sold or rented, delivered and installed.
            </p>
            <div className="flex flex-wrap gap-2">
              {BRANDS.slice(1).map(b => (
                <span key={b} className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border ${BRAND_COLORS[b]} ${BRAND_ACCENT[b]}`}>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────── */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { label: "Models in Stock", value: "11" },
              { label: "Brands Carried", value: "4" },
              { label: "Power Range", value: "4.6–12 kW" },
              { label: "Delivery", value: "48–72 hrs" },
            ].map(s => (
              <div key={s.label} className="px-6 py-5">
                <div className="text-3xl font-display font-bold text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand filter ──────────────────────────────────────────── */}
      <section className="border-b border-border bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex gap-1 flex-wrap py-3">
            {BRANDS.map(b => (
              <button
                key={b}
                onClick={() => setActiveBrand(b)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  activeBrand === b
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Genset grid ───────────────────────────────────────────── */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {filtered.map(g => (
              <div
                key={g.id}
                onClick={() => setSelected(g)}
                className="group bg-card hover:bg-muted/30 transition-all duration-200 cursor-pointer flex flex-col relative"
              >
                {/* Product photo — white bg, object-contain for clean studio shots */}
                <div className="bg-white relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={BRAND_IMAGES[g.brand]}
                    alt={`${g.brand} ${g.model}`}
                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Brand color accent bar at top */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${BRAND_COLORS[g.brand]?.split(" ")[0] ?? "bg-muted"}`} />
                  {g.badge && (
                    <span className={`absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 ${BADGE_COLORS[g.badge] ?? "bg-muted text-muted-foreground"}`}>
                      {g.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1 border-t border-border">
                  {/* Brand + model */}
                  <div className="mb-3">
                    <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${BRAND_COLORS[g.brand]?.split(" ")[1] ?? "text-muted-foreground"}`}>
                      {g.brand}
                    </span>
                    <h3 className="text-xl font-display font-bold uppercase tracking-tight mt-0.5">{g.model}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Zap className="h-3.5 w-3.5 text-primary" />
                      <span className="text-primary font-bold text-sm">{g.power}</span>
                      <span className="text-border">·</span>
                      <span className="text-muted-foreground text-xs">{g.fuel}</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{g.desc}</p>

                  {/* Compact spec grid */}
                  <div className="grid grid-cols-2 gap-px bg-border mb-4">
                    <SpecCell label="Weight" value={g.weight} />
                    <SpecCell label="Noise" value={g.noise} />
                    <SpecCell label="Engine" value={g.engine.split(" ")[0]} />
                    <SpecCell label="Fits" value={g.compatible} />
                  </div>

                  {/* Price row */}
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <div className="text-2xl font-display font-bold text-foreground">{g.buyPrice}</div>
                      <div className="text-xs text-muted-foreground">{g.rentPrice}</div>
                    </div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider group-hover:gap-2 flex items-center gap-1 transition-all">
                      Full Specs <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>

                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it installs ───────────────────────────────────────── */}
      <section className="border-t border-border bg-card py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">Installation</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-5">
                Mounts Under.<br />Out of the Way.
              </h2>
              <p className="text-muted-foreground mb-6">
                Undermount gensets bolt directly to the ISO corner castings beneath your container, keeping the full interior free. The unit travels with the container — no loose cables, no external power runs.
              </p>
              <ul className="space-y-3">
                {[
                  "Fits within the container's ground clearance envelope",
                  "Connects directly to the reefer unit's power inlet",
                  "Fuel tank sized for 48–72 hr autonomous runtime",
                  "Pre-wired and tested before delivery",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden">
              <img
                src="/images/genset-installed.jpg"
                alt="Undermount genset installed under container on trailer"
                className="w-full object-cover"
                style={{ aspectRatio: "16/9" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick-reference table ─────────────────────────────────── */}
      <section className="border-t border-border bg-background py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-2">Quick Reference</h2>
          <p className="text-muted-foreground text-sm mb-8">All models, pricing, and compatibility. Click any row for full specs.</p>
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest">Brand</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest">Model</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest hidden sm:table-cell">Power</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest hidden md:table-cell">Fuel</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest hidden lg:table-cell">Fits</th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-widest">Buy</th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-widest hidden sm:table-cell">Rent/mo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {GENSETS.map(g => (
                  <tr
                    key={g.id}
                    onClick={() => setSelected(g)}
                    className="hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 ${BRAND_COLORS[g.brand]}`}>
                        {g.brand}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold">{g.model}</td>
                    <td className="px-4 py-3 hidden sm:table-cell font-mono text-primary">{g.power}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground text-xs">{g.fuel}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs">{g.compatible}</td>
                    <td className="px-4 py-3 text-right font-display font-bold text-primary">{g.buyPrice}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground hidden sm:table-cell">{g.rentPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-card py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-3">
                Bundle with a Container
              </h2>
              <p className="text-muted-foreground max-w-lg">
                Add a genset to any reefer purchase or rental and we'll mount, fuel, and test it before delivery. One call, one delivery.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/quote" className="inline-flex h-12 items-center justify-center bg-primary px-8 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all uppercase tracking-wider">
                Build a Quote
              </Link>
              <Link href="/contact" className="inline-flex h-12 items-center justify-center border border-border bg-background px-8 text-sm font-bold hover:bg-muted transition-all uppercase tracking-wider">
                Talk to a Specialist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Detail modal ──────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card border border-border max-w-2xl w-full max-h-[92vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal product photo */}
            <div className="bg-white relative" style={{ aspectRatio: "16/9" }}>
              <img
                src={BRAND_IMAGES[selected.brand]}
                alt={`${selected.brand} ${selected.model}`}
                className="w-full h-full object-contain p-8"
              />
              <div className={`absolute top-0 left-0 right-0 h-1 ${BRAND_COLORS[selected.brand]?.split(" ")[0] ?? "bg-muted"}`} />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 bg-background/90 border border-border p-1.5 hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Brand + model header */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${BRAND_COLORS[selected.brand]?.split(" ")[1] ?? "text-muted-foreground"}`}>
                  {selected.brand}
                </span>
                <h2 className="text-2xl font-display font-bold uppercase tracking-tight">{selected.model}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  <span className="text-primary font-bold text-sm">{selected.power}</span>
                  <span className="text-border">·</span>
                  <span className="text-muted-foreground text-xs">{selected.fuel}</span>
                </div>
              </div>
              {selected.badge && (
                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 ${BADGE_COLORS[selected.badge] ?? "bg-muted text-muted-foreground"}`}>
                  {selected.badge}
                </span>
              )}
            </div>

            <div className="p-6">
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{selected.desc}</p>

              {/* Specs grid */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Specifications</p>
              <div className="grid grid-cols-2 gap-px bg-border mb-6">
                {[
                  { l: "Power Output",    v: selected.power },
                  { l: "Fuel Type",       v: selected.fuel },
                  { l: "Engine",          v: selected.engine },
                  { l: "Weight",          v: selected.weight },
                  { l: "Noise Level",     v: selected.noise },
                  { l: "Compatible With", v: selected.compatible },
                ].map(({ l, v }) => (
                  <SpecCell key={l} label={l} value={v} />
                ))}
              </div>

              {/* Features */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Included Features</p>
              <ul className="grid grid-cols-1 gap-1 mb-6">
                {selected.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Pricing + CTA */}
              <div className="border border-border p-4 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-3xl font-display font-bold">{selected.buyPrice}</div>
                  <div className="text-xs text-muted-foreground">Or rent from {selected.rentPrice}</div>
                </div>
                <Link
                  href="/quote"
                  onClick={() => setSelected(null)}
                  className="inline-flex h-11 items-center gap-2 bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all uppercase tracking-wider"
                >
                  Add to Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
