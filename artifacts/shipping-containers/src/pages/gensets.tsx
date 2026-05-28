import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Zap, Weight, Volume2, Fuel, Check } from "lucide-react";

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
  "Thermo King":       "bg-blue-900/50 text-blue-300",
  "Carrier Transicold":"bg-sky-900/50 text-sky-300",
  "Genmark":           "bg-amber-900/50 text-amber-300",
  "ReeGen":            "bg-emerald-900/50 text-emerald-300",
};

const BRAND_IMAGES: Record<string, string> = {
  "Thermo King":        "/images/genset-thermo-king.png",
  "Carrier Transicold": "/images/genset-carrier.png",
  "Genmark":            "/images/genset-genmark.png",
  "ReeGen":             "/images/genset-reegen.png",
};

const BADGE_COLORS: Record<string, string> = {
  "Best Seller":  "bg-primary/20 text-primary",
  "Most Popular": "bg-primary/20 text-primary",
  "Best Value":   "bg-amber-900/50 text-amber-300",
  "Eco":          "bg-emerald-900/60 text-emerald-300",
  "Hybrid":       "bg-emerald-900/60 text-emerald-300",
};

function SpecPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 bg-muted border border-border px-3 py-2">
      <span className="text-primary flex-shrink-0">{icon}</span>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground leading-none">{label}</p>
        <p className="text-xs font-bold text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function Gensets() {
  const [activeBrand, setActiveBrand] = useState("All");
  const [selected, setSelected] = useState<Genset | null>(null);

  const filtered = activeBrand === "All" ? GENSETS : GENSETS.filter(g => g.brand === activeBrand);

  return (
    <div className="bg-background min-h-screen pt-16">
      {/* Header */}
      <section className="border-b border-border bg-card py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <p className="text-primary text-sm font-bold tracking-widest uppercase mb-3">Power Solutions</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">
            Undermount Gensets
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Diesel and hybrid generator sets from the world's leading reefer power brands — sold and rented to fit any container in our fleet.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {BRANDS.slice(1).map(b => (
              <span key={b} className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 ${BRAND_COLORS[b] ?? "bg-muted text-foreground"}`}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Brand filter */}
      <section className="border-b border-border bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex gap-1 flex-wrap py-3">
            {BRANDS.map(b => (
              <button
                key={b}
                onClick={() => setActiveBrand(b)}
                data-testid={`brand-filter-${b.toLowerCase().replace(/ /g, "-")}`}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
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

      {/* Genset grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(g => (
              <div
                key={g.id}
                onClick={() => setSelected(g)}
                data-testid={`genset-card-${g.id}`}
                className="group border border-border bg-card hover:border-primary/50 transition-all duration-300 relative cursor-pointer flex flex-col"
              >
                {/* Product image */}
                <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                  <img
                    src={BRAND_IMAGES[g.brand]}
                    alt={`${g.brand} ${g.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {g.badge && (
                    <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 ${BADGE_COLORS[g.badge] ?? "bg-muted text-muted-foreground"}`}>
                      {g.badge}
                    </span>
                  )}
                </div>

                {/* Header stripe */}
                <div className={`px-5 py-3 flex items-center justify-between border-b border-border`}>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${BRAND_COLORS[g.brand]?.split(" ")[1] ?? "text-foreground"}`}>
                    {g.brand}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Model + power */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-display font-bold uppercase tracking-tight">{g.model}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-primary font-bold text-sm">{g.power}</span>
                      <span className="text-muted-foreground text-xs">·</span>
                      <span className="text-muted-foreground text-xs font-semibold">{g.fuel}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-5 line-clamp-2">{g.desc}</p>

                  {/* Spec pills */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    <SpecPill icon={<Weight className="h-3.5 w-3.5" />} label="Weight" value={g.weight} />
                    <SpecPill icon={<Volume2 className="h-3.5 w-3.5" />} label="Noise" value={g.noise} />
                    <SpecPill icon={<Fuel className="h-3.5 w-3.5" />} label="Engine" value={g.engine.split(" ")[0] + " " + (g.engine.split(" ")[1] ?? "")} />
                    <SpecPill icon={<ArrowRight className="h-3.5 w-3.5" />} label="Fits" value={g.compatible} />
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {g.features.slice(0, 3).map(f => (
                      <span key={f} className="text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 border border-border">
                        {f}
                      </span>
                    ))}
                    {g.features.length > 3 && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 border border-border">
                        +{g.features.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mt-auto flex items-end justify-between pt-4 border-t border-border">
                    <div>
                      <div className="text-2xl font-display font-bold">{g.buyPrice}</div>
                      <div className="text-xs text-muted-foreground">{g.rentPrice}</div>
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

      {/* Compatibility table */}
      <section className="border-t border-border bg-card py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-2">Quick Reference</h2>
          <p className="text-muted-foreground mb-8">All models, pricing, and compatibility at a glance.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">Brand</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">Model</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider hidden sm:table-cell">Power</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider hidden md:table-cell">Fuel</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider hidden lg:table-cell">Fits</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider">Buy</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider hidden sm:table-cell">Rent/mo</th>
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
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${BRAND_COLORS[g.brand]}`}>
                        {g.brand}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold">{g.model}</td>
                    <td className="px-4 py-3 hidden sm:table-cell font-mono">{g.power}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{g.fuel}</td>
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

      {/* CTA */}
      <section className="border-t border-border bg-background py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-4">
            Need a Genset with Your Container?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Bundle a genset with any reefer container purchase or rental and get it mounted and tested before delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="inline-flex h-12 items-center justify-center bg-primary px-8 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all uppercase tracking-wider">
              Add to Quote
            </Link>
            <Link href="/contact" className="inline-flex h-12 items-center justify-center border-2 border-border bg-background px-8 text-sm font-bold hover:bg-muted transition-all uppercase tracking-wider">
              Talk to a Specialist
            </Link>
          </div>
        </div>
      </section>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal image */}
            <div className="aspect-video overflow-hidden bg-muted">
              <img
                src={BRAND_IMAGES[selected.brand]}
                alt={`${selected.brand} ${selected.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Brand header */}
            <div className={`px-8 py-4 border-b border-border ${BRAND_COLORS[selected.brand]?.split(" ")[0] ?? "bg-muted"}`}>
              <span className={`text-xs font-bold uppercase tracking-widest ${BRAND_COLORS[selected.brand]?.split(" ")[1] ?? "text-foreground"}`}>
                {selected.brand}
              </span>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <div>
                  <h2 className="text-3xl font-display font-bold uppercase">{selected.model}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-primary font-bold">{selected.power}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground text-sm">{selected.fuel}</span>
                  </div>
                </div>
                {selected.badge && (
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 ${BADGE_COLORS[selected.badge] ?? ""}`}>
                    {selected.badge}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-8">{selected.desc}</p>

              {/* Specs grid */}
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Specifications</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { l: "Power Output", v: selected.power },
                    { l: "Fuel Type", v: selected.fuel },
                    { l: "Engine", v: selected.engine },
                    { l: "Weight", v: selected.weight },
                    { l: "Noise Level", v: selected.noise },
                    { l: "Compatible With", v: selected.compatible },
                  ].map(({ l, v }) => (
                    <div key={l} className="border border-border p-3">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{l}</p>
                      <p className="text-sm font-bold mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Included Features</p>
                <div className="flex flex-col gap-2">
                  {selected.features.map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing + actions */}
              <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-border">
                <div>
                  <div className="text-3xl font-display font-bold">{selected.buyPrice}</div>
                  <div className="text-sm text-muted-foreground">{selected.rentPrice}</div>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/quote"
                    onClick={() => setSelected(null)}
                    className="inline-flex h-11 items-center justify-center bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all uppercase tracking-wider"
                  >
                    Add to Quote
                  </Link>
                  <button
                    onClick={() => setSelected(null)}
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
