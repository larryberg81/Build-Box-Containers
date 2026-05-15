import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Thermometer, Box, Layers, Wrench } from "lucide-react";

interface Container {
  id: string;
  name: string;
  category: string;
  size: string;
  extDimensions: string;
  intDimensions: string;
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
  // --- Standard ---
  {
    id: "std-10",
    name: "10' Standard",
    category: "Standard",
    size: "10 ft",
    extDimensions: "10'L × 8'W × 8.5'H",
    intDimensions: "9'4\"L × 7'8\"W × 7'10\"H",
    payload: "21,700 lbs",
    volume: "573 cu ft",
    price: "From $2,400",
    rentPrice: "From $120/mo",
    image: "/images/product-20ft.png",
    features: ["Wind & watertight", "Lockbox ready", "Forklift pockets"],
    desc: "The most compact option in our fleet. Ideal for residential storage, small tool sheds, or tight urban sites.",
  },
  {
    id: "std-20",
    name: "20' Standard",
    category: "Standard",
    size: "20 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "19'4\"L × 7'8\"W × 7'10\"H",
    payload: "47,900 lbs",
    volume: "1,170 cu ft",
    price: "From $3,800",
    rentPrice: "From $175/mo",
    image: "/images/product-20ft.png",
    badge: "Most Popular",
    features: ["Wind & watertight", "Double doors standard", "Forklift pockets", "Corner castings"],
    desc: "The industry standard. Handles everything from job-site storage to retail pop-ups. Fits most driveways and sites without a permit.",
  },
  {
    id: "std-40",
    name: "40' Standard",
    category: "Standard",
    size: "40 ft",
    extDimensions: "40'L × 8'W × 8.5'H",
    intDimensions: "39'5\"L × 7'8\"W × 7'10\"H",
    payload: "59,040 lbs",
    volume: "2,390 cu ft",
    price: "From $5,200",
    rentPrice: "From $240/mo",
    image: "/images/product-40ft.png",
    features: ["Double cargo doors", "Forklift pockets", "Corner castings", "Vent plugs"],
    desc: "Double the capacity of a 20ft. The go-to for large-scale construction storage, industrial use, and multi-room modifications.",
  },
  // --- High Cube ---
  {
    id: "hc-20",
    name: "20' High Cube",
    category: "High Cube",
    size: "20 ft HC",
    extDimensions: "20'L × 8'W × 9.5'H",
    intDimensions: "19'4\"L × 7'8\"W × 8'10\"H",
    payload: "44,100 lbs",
    volume: "1,300 cu ft",
    price: "From $4,400",
    rentPrice: "From $200/mo",
    image: "/images/container-high-cube.png",
    features: ["Extra 1ft headroom", "Wind & watertight", "Double doors", "Ideal for HVAC fitout"],
    desc: "One foot taller than a standard 20ft, making it the preferred choice for office and retail conversions where headroom matters.",
  },
  {
    id: "hc-40",
    name: "40' High Cube",
    category: "High Cube",
    size: "40 ft HC",
    extDimensions: "40'L × 8'W × 9.5'H",
    intDimensions: "39'5\"L × 7'8\"W × 8'10\"H",
    payload: "58,600 lbs",
    volume: "2,700 cu ft",
    price: "From $6,100",
    rentPrice: "From $280/mo",
    image: "/images/container-high-cube.png",
    badge: "Best for Conversions",
    features: ["Extra 1ft headroom", "Preferred for modular builds", "Corner castings", "Vent plugs"],
    desc: "Maximum volume and headroom. The foundation of choice for modular homes, multi-room offices, and stacked builds.",
  },
  // --- Reefer ---
  {
    id: "reefer-20",
    name: "20' Reefer",
    category: "Reefer",
    size: "20 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "17'8\"L × 7'6\"W × 7'5\"H",
    payload: "44,900 lbs",
    volume: "1,000 cu ft",
    price: "From $5,800",
    rentPrice: "From $320/mo",
    image: "/images/container-reefer.png",
    badge: "Temperature Controlled",
    features: ["Integrated refrigeration unit", "-25°C to +25°C range", "Insulated walls, floor & ceiling", "ThermoKing or Carrier unit", "Shore power connection"],
    desc: "Fully operational refrigerated container for food storage, pharmaceuticals, floral, or cold-chain logistics. Plugs into standard 3-phase power.",
  },
  {
    id: "reefer-40",
    name: "40' Reefer",
    category: "Reefer",
    size: "40 ft",
    extDimensions: "40'L × 8'W × 8.5'H",
    intDimensions: "37'9\"L × 7'6\"W × 7'5\"H",
    payload: "59,500 lbs",
    volume: "2,040 cu ft",
    price: "From $9,200",
    rentPrice: "From $520/mo",
    image: "/images/container-reefer.png",
    features: ["High-capacity refrigeration", "-25°C to +25°C range", "Insulated panels", "Digital temp monitoring", "Dual air circulation"],
    desc: "Large-scale cold storage for food distributors, event caterers, and pharmaceutical companies. Best-in-class insulation and temperature consistency.",
  },
  // --- Specialty ---
  {
    id: "open-top",
    name: "Open Top",
    category: "Specialty",
    size: "20 ft / 40 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "19'4\"L × 7'8\"W × 7'7\"H",
    payload: "48,500 lbs",
    volume: "1,160 cu ft",
    price: "From $4,200",
    rentPrice: "From $210/mo",
    image: "/images/container-open-top.png",
    features: ["Removable tarpaulin roof", "Top-loading via crane", "Collapsible bow rings", "Standard end doors"],
    desc: "No fixed roof — loads via overhead crane. Ideal for tall machinery, scrap metal, timber, and construction materials that can't go in through the doors.",
  },
  {
    id: "flat-rack",
    name: "Flat Rack",
    category: "Specialty",
    size: "20 ft / 40 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "18'5\"L × 7'4\"W (deck)",
    payload: "52,900 lbs",
    volume: "N/A",
    price: "From $3,600",
    rentPrice: "From $190/mo",
    image: "/images/container-flat-rack.png",
    features: ["No walls or roof", "Collapsible end walls", "Stake pockets for lashing", "Rated for heavy OOG cargo"],
    desc: "Just a steel deck with collapsible end walls. Perfect for out-of-gauge (OOG) cargo: heavy plant, vehicles, oversized equipment, and pipes.",
  },
  {
    id: "double-door",
    name: "Double-Door (Tunnel)",
    category: "Specialty",
    size: "20 ft / 40 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "19'4\"L × 7'8\"W × 7'10\"H",
    payload: "47,900 lbs",
    volume: "1,170 cu ft",
    price: "From $4,600",
    rentPrice: "From $230/mo",
    image: "/images/container-double-door.png",
    features: ["Cargo doors on both ends", "Drive-through loading possible", "Full accessibility", "Standard forklift pockets"],
    desc: "Doors on both ends create a tunnel. Eliminates the need to reposition cargo, perfect for retail pop-ups, pass-through storage, and event spaces.",
  },
  // --- Modified ---
  {
    id: "mod-retail",
    name: "Retail Pop-Up",
    category: "Modified",
    size: "20 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "Custom interior layout",
    payload: "N/A",
    volume: "N/A",
    price: "Custom Quote",
    image: "/images/product-retail.png",
    badge: "Built to Order",
    features: ["Roll-up service window", "Electrical & LED lighting", "Custom paint", "Interior cladding", "Brand signage mount"],
    desc: "Purpose-built for retail and hospitality. Every unit configured to your brand. Used for cafés, bars, merch stands, and food trucks.",
  },
  {
    id: "mod-office",
    name: "Jobsite Office",
    category: "Modified",
    size: "20 ft / 40 ft",
    extDimensions: "20–40'L × 8'W × 8.5'H",
    intDimensions: "Custom interior layout",
    payload: "N/A",
    volume: "N/A",
    price: "Custom Quote",
    image: "/images/product-modular.png",
    badge: "Built to Order",
    features: ["HVAC system", "Full electrical package", "Spray foam insulation", "Windows & man door", "Interior partition walls"],
    desc: "A climate-controlled, fully wired office that deploys in days. Standard or custom configurations available. Relocates to your next site in one lift.",
  },
];

const CATEGORIES = ["All", "Standard", "High Cube", "Reefer", "Specialty", "Modified"];

const CATEGORY_ICONS: Record<string, typeof Box> = {
  Standard: Box,
  "High Cube": Layers,
  Reefer: Thermometer,
  Specialty: ArrowRight,
  Modified: Wrench,
};

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-semibold text-right">{value}</span>
    </div>
  );
}

export default function Containers() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);

  const filtered = activeCategory === "All"
    ? CONTAINERS
    : CONTAINERS.filter(c => c.category === activeCategory);

  return (
    <div className="bg-background min-h-screen pt-16">
      {/* Header */}
      <section className="border-b border-border bg-card py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <p className="text-primary text-sm font-bold tracking-widest uppercase mb-3">Full Fleet</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">Containers</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Standard dry, high cube, refrigerated reefer, open top, flat rack, and fully modified units — all available to buy or rent.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-border bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex gap-1 overflow-x-auto py-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                data-testid={`category-filter-${cat.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat === "Reefer" && <Thermometer className="h-3 w-3" />}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category intro for Reefer */}
      {activeCategory === "Reefer" && (
        <div className="bg-blue-950/30 border-b border-blue-900/40">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl py-5 flex items-start gap-4">
            <Thermometer className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-200/80">
              Reefer containers require 3-phase shore power (460V / 32A). Temperature range -25°C to +25°C. Delivery includes pre-trip inspection and calibration. Rental includes monthly maintenance check.
            </p>
          </div>
        </div>
      )}

      {/* Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(container => (
              <div
                key={container.id}
                data-testid={`container-card-${container.id}`}
                className="group border border-border bg-card flex flex-col hover:border-primary/50 transition-all duration-300 relative cursor-pointer"
                onClick={() => setSelectedContainer(container)}
              >
                {/* Image */}
                <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                  <img
                    src={container.image}
                    alt={container.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                      {container.category}
                    </span>
                    {container.badge && (
                      <span className="bg-background/90 backdrop-blur text-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                        {container.badge}
                      </span>
                    )}
                  </div>
                  {container.category === "Reefer" && (
                    <div className="absolute top-3 right-3 bg-blue-900/90 backdrop-blur p-1.5">
                      <Thermometer className="h-4 w-4 text-blue-300" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-display font-bold uppercase mb-1">{container.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono mb-3">{container.extDimensions}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{container.desc}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {container.features.slice(0, 3).map(f => (
                      <span key={f} className="text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 border border-border">
                        {f}
                      </span>
                    ))}
                    {container.features.length > 3 && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 border border-border">
                        +{container.features.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <div className="font-bold text-foreground">{container.price}</div>
                      {container.rentPrice && (
                        <div className="text-xs text-muted-foreground">{container.rentPrice}</div>
                      )}
                    </div>
                    <button className="text-xs font-bold text-primary uppercase tracking-wider hover:text-primary/80 transition-colors flex items-center gap-1">
                      Specs <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-4">Not Sure Which Container?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Use our quote calculator to configure exactly what you need, or talk to one of our container experts.</p>
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

      {/* Spec Sheet Modal */}
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
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1 flex-shrink-0 mt-1">
                  {selectedContainer.category}
                </span>
                <h2 className="text-2xl font-display font-bold uppercase">{selectedContainer.name}</h2>
              </div>
              <p className="text-muted-foreground mb-6">{selectedContainer.desc}</p>

              {/* Specs */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Specifications</p>
                <div className="border border-border divide-y divide-border">
                  <SpecRow label="External Dimensions" value={selectedContainer.extDimensions} />
                  <SpecRow label="Internal Dimensions" value={selectedContainer.intDimensions} />
                  {selectedContainer.payload !== "N/A" && <SpecRow label="Max Payload" value={selectedContainer.payload} />}
                  {selectedContainer.volume !== "N/A" && <SpecRow label="Internal Volume" value={selectedContainer.volume} />}
                </div>
              </div>

              {/* Features */}
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

              {/* Price + CTA */}
              <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-border">
                <div>
                  <div className="text-2xl font-display font-bold">{selectedContainer.price}</div>
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
