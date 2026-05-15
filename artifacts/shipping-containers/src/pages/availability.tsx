import { useState } from "react";
import { MapPin, CheckCircle, Clock, XCircle } from "lucide-react";
import { Link } from "wouter";

type StockLevel = "in-stock" | "low" | "out";

interface DepotSize {
  label: string;
  stock: StockLevel;
  qty: number;
}

interface Depot {
  id: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  x: number; // percent position on map
  y: number;
  sizes: DepotSize[];
}

const DEPOTS: Depot[] = [
  {
    id: "seattle",
    city: "Seattle", state: "WA",
    address: "4200 Harbor Ave SW, Seattle, WA 98126",
    phone: "(206) 555-0182",
    x: 7, y: 18,
    sizes: [
      { label: "10 ft", stock: "in-stock", qty: 14 },
      { label: "20 ft", stock: "in-stock", qty: 31 },
      { label: "40 ft", stock: "low", qty: 4 },
      { label: "40 ft HC", stock: "out", qty: 0 },
    ],
  },
  {
    id: "los-angeles",
    city: "Los Angeles", state: "CA",
    address: "2280 E 220th St, Carson, CA 90810",
    phone: "(310) 555-0244",
    x: 9, y: 52,
    sizes: [
      { label: "10 ft", stock: "in-stock", qty: 22 },
      { label: "20 ft", stock: "in-stock", qty: 58 },
      { label: "40 ft", stock: "in-stock", qty: 27 },
      { label: "40 ft HC", stock: "low", qty: 6 },
    ],
  },
  {
    id: "phoenix",
    city: "Phoenix", state: "AZ",
    address: "3501 S 43rd Ave, Phoenix, AZ 85009",
    phone: "(602) 555-0371",
    x: 18, y: 55,
    sizes: [
      { label: "10 ft", stock: "low", qty: 3 },
      { label: "20 ft", stock: "in-stock", qty: 19 },
      { label: "40 ft", stock: "in-stock", qty: 11 },
      { label: "40 ft HC", stock: "in-stock", qty: 8 },
    ],
  },
  {
    id: "denver",
    city: "Denver", state: "CO",
    address: "5120 Race Court, Denver, CO 80216",
    phone: "(720) 555-0498",
    x: 27, y: 36,
    sizes: [
      { label: "10 ft", stock: "in-stock", qty: 9 },
      { label: "20 ft", stock: "in-stock", qty: 24 },
      { label: "40 ft", stock: "low", qty: 5 },
      { label: "40 ft HC", stock: "out", qty: 0 },
    ],
  },
  {
    id: "dallas",
    city: "Dallas", state: "TX",
    address: "8900 Diplomat Dr, Dallas, TX 75247",
    phone: "(214) 555-0562",
    x: 37, y: 65,
    sizes: [
      { label: "10 ft", stock: "in-stock", qty: 17 },
      { label: "20 ft", stock: "in-stock", qty: 44 },
      { label: "40 ft", stock: "in-stock", qty: 20 },
      { label: "40 ft HC", stock: "low", qty: 3 },
    ],
  },
  {
    id: "chicago",
    city: "Chicago", state: "IL",
    address: "3400 S Morgan St, Chicago, IL 60608",
    phone: "(312) 555-0633",
    x: 56, y: 25,
    sizes: [
      { label: "10 ft", stock: "out", qty: 0 },
      { label: "20 ft", stock: "in-stock", qty: 36 },
      { label: "40 ft", stock: "in-stock", qty: 18 },
      { label: "40 ft HC", stock: "in-stock", qty: 12 },
    ],
  },
  {
    id: "atlanta",
    city: "Atlanta", state: "GA",
    address: "1800 Joseph E Boone Blvd, Atlanta, GA 30314",
    phone: "(404) 555-0719",
    x: 62, y: 57,
    sizes: [
      { label: "10 ft", stock: "in-stock", qty: 11 },
      { label: "20 ft", stock: "low", qty: 7 },
      { label: "40 ft", stock: "in-stock", qty: 16 },
      { label: "40 ft HC", stock: "in-stock", qty: 9 },
    ],
  },
  {
    id: "new-york",
    city: "New York", state: "NY",
    address: "850 3rd Ave, Brooklyn, NY 11232",
    phone: "(718) 555-0841",
    x: 79, y: 22,
    sizes: [
      { label: "10 ft", stock: "in-stock", qty: 8 },
      { label: "20 ft", stock: "in-stock", qty: 29 },
      { label: "40 ft", stock: "low", qty: 4 },
      { label: "40 ft HC", stock: "out", qty: 0 },
    ],
  },
  {
    id: "miami",
    city: "Miami", state: "FL",
    address: "1055 NW 51st St, Miami, FL 33127",
    phone: "(305) 555-0917",
    x: 70, y: 75,
    sizes: [
      { label: "10 ft", stock: "in-stock", qty: 13 },
      { label: "20 ft", stock: "in-stock", qty: 32 },
      { label: "40 ft", stock: "in-stock", qty: 21 },
      { label: "40 ft HC", stock: "low", qty: 2 },
    ],
  },
];

const STOCK_CONFIG: Record<StockLevel, { label: string; color: string; dotColor: string; icon: typeof CheckCircle }> = {
  "in-stock": { label: "In Stock", color: "text-emerald-400", dotColor: "bg-emerald-400", icon: CheckCircle },
  "low":      { label: "Low Stock", color: "text-amber-400",  dotColor: "bg-amber-400",  icon: Clock },
  "out":      { label: "Out of Stock", color: "text-muted-foreground", dotColor: "bg-muted-foreground", icon: XCircle },
};

function depotDotColor(depot: Depot) {
  const hasInStock = depot.sizes.some(s => s.stock === "in-stock");
  const hasLow = depot.sizes.some(s => s.stock === "low");
  if (hasInStock) return "bg-emerald-400";
  if (hasLow) return "bg-amber-400";
  return "bg-muted-foreground";
}

export default function Availability() {
  const [selectedDepot, setSelectedDepot] = useState<Depot | null>(null);
  const [hoveredDepot, setHoveredDepot] = useState<string | null>(null);

  return (
    <div className="bg-background min-h-screen pt-16">
      {/* Page Header */}
      <section className="border-b border-border bg-card py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <p className="text-primary text-sm font-bold tracking-widest uppercase mb-3">Ready to Ship</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">
            Depot Availability
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            9 depots across the country. Click a location to see live stock levels and get containers on-site fast.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl py-10">
        {/* Legend */}
        <div className="flex flex-wrap gap-6 mb-6">
          {(["in-stock", "low", "out"] as StockLevel[]).map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${STOCK_CONFIG[s].dotColor}`} />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{STOCK_CONFIG[s].label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Map */}
          <div className="lg:col-span-2">
            <div
              className="relative w-full border border-border bg-card overflow-hidden"
              style={{ paddingBottom: "58%" }}
            >
              {/* US map SVG outline */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 960 600"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                {/* Simplified continental US outline */}
                <path
                  d="M 80 120 L 65 180 L 55 240 L 60 300 L 75 350 L 90 390 L 120 410 L 160 420 L 200 430 L 230 450 L 250 480 L 280 490 L 320 480 L 340 460 L 360 470 L 390 500 L 420 510 L 460 500 L 480 480 L 510 470 L 540 480 L 560 490 L 600 480 L 630 460 L 650 440 L 670 420 L 700 410 L 730 400 L 760 390 L 790 370 L 820 340 L 840 300 L 850 260 L 840 220 L 820 190 L 790 170 L 760 155 L 720 140 L 680 130 L 640 125 L 600 120 L 560 115 L 520 112 L 480 110 L 440 112 L 400 115 L 360 118 L 320 118 L 280 115 L 240 112 L 200 110 L 160 112 L 120 116 Z"
                  fill="none"
                  stroke="hsl(220 10% 20%)"
                  strokeWidth="2"
                />
                {/* State grid lines — subtle */}
                <line x1="200" y1="110" x2="200" y2="430" stroke="hsl(220 10% 16%)" strokeWidth="1" />
                <line x1="320" y1="118" x2="320" y2="480" stroke="hsl(220 10% 16%)" strokeWidth="1" />
                <line x1="440" y1="112" x2="440" y2="500" stroke="hsl(220 10% 16%)" strokeWidth="1" />
                <line x1="560" y1="115" x2="560" y2="490" stroke="hsl(220 10% 16%)" strokeWidth="1" />
                <line x1="680" y1="130" x2="680" y2="410" stroke="hsl(220 10% 16%)" strokeWidth="1" />
                <line x1="65" y1="220" x2="850" y2="220" stroke="hsl(220 10% 16%)" strokeWidth="1" />
                <line x1="65" y1="330" x2="850" y2="330" stroke="hsl(220 10% 16%)" strokeWidth="1" />
                <line x1="65" y1="430" x2="760" y2="430" stroke="hsl(220 10% 16%)" strokeWidth="1" />
              </svg>

              {/* Depot pins */}
              {DEPOTS.map(depot => {
                const isSelected = selectedDepot?.id === depot.id;
                const isHovered = hoveredDepot === depot.id;
                const dotColor = depotDotColor(depot);

                return (
                  <button
                    key={depot.id}
                    data-testid={`depot-pin-${depot.id}`}
                    onClick={() => setSelectedDepot(depot)}
                    onMouseEnter={() => setHoveredDepot(depot.id)}
                    onMouseLeave={() => setHoveredDepot(null)}
                    className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${depot.x}%`, top: `${depot.y}%` }}
                  >
                    {/* Pulse ring for selected */}
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-primary/30" style={{ width: 28, height: 28, top: -4, left: -4 }} />
                    )}
                    {/* Dot */}
                    <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${dotColor} ${isSelected ? "border-white scale-125" : isHovered ? "border-white scale-110" : "border-background"}`} />
                    {/* City label on hover/select */}
                    {(isHovered || isSelected) && (
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card border border-border px-2 py-1 text-[10px] font-bold uppercase tracking-wider z-20 pointer-events-none">
                        {depot.city}, {depot.state}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Side Panel */}
          <div className="flex flex-col gap-4">
            {selectedDepot ? (
              <div className="border border-border bg-card">
                <div className="bg-primary px-5 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary-foreground" />
                    <p className="text-primary-foreground font-display font-bold uppercase tracking-wide">
                      {selectedDepot.city}, {selectedDepot.state}
                    </p>
                  </div>
                  <p className="text-primary-foreground/70 text-xs mt-1">{selectedDepot.address}</p>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Current Stock</p>
                  <div className="divide-y divide-border">
                    {selectedDepot.sizes.map(size => {
                      const cfg = STOCK_CONFIG[size.stock];
                      const Icon = cfg.icon;
                      return (
                        <div key={size.label} className="flex items-center justify-between py-3">
                          <span className="font-bold text-sm uppercase">{size.label}</span>
                          <div className="flex items-center gap-2">
                            {size.qty > 0 && (
                              <span className="text-xs text-muted-foreground">{size.qty} units</span>
                            )}
                            <div className={`flex items-center gap-1 ${cfg.color}`}>
                              <Icon className="h-3.5 w-3.5" />
                              <span className="text-xs font-semibold uppercase tracking-wide">{cfg.label}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-5 pt-4 border-t border-border space-y-2">
                    <p className="text-xs text-muted-foreground">{selectedDepot.phone}</p>
                    <Link
                      href="/quote"
                      className="flex w-full h-10 items-center justify-center bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all"
                    >
                      Get a Quote from This Depot
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-border bg-card p-8 text-center">
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Click a depot on the map to see stock levels and contact info.</p>
              </div>
            )}

            {/* Depot list */}
            <div className="border border-border bg-card divide-y divide-border overflow-hidden">
              <div className="px-4 py-3 bg-muted">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">All Depots</p>
              </div>
              {DEPOTS.map(depot => {
                const dotColor = depotDotColor(depot);
                const totalUnits = depot.sizes.reduce((s, d) => s + d.qty, 0);
                return (
                  <button
                    key={depot.id}
                    data-testid={`depot-list-${depot.id}`}
                    onClick={() => setSelectedDepot(depot)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-muted transition-colors ${selectedDepot?.id === depot.id ? "bg-primary/5 border-l-2 border-primary" : ""}`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotColor}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold uppercase truncate">{depot.city}, {depot.state}</p>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{totalUnits} units</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Info strip */}
        <div className="mt-8 border border-border bg-card p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-display font-bold">{DEPOTS.length}</p>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">Depot Locations</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold">
              {DEPOTS.reduce((s, d) => s + d.sizes.reduce((ss, sz) => ss + sz.qty, 0), 0)}+
            </p>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">Containers Ready to Ship</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold">48h</p>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">Avg. Delivery Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
