import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, ChevronDown, ChevronUp } from "lucide-react";

const SIZES = [
  { id: "10ft", label: "10 ft", desc: "100 sq ft — Small storage, tool sheds", basePrice: 2400, baseRent: 120 },
  { id: "20ft", label: "20 ft", desc: "160 sq ft — Industry standard storage", basePrice: 3800, baseRent: 175 },
  { id: "40ft", label: "40 ft", desc: "320 sq ft — Large projects, retail", basePrice: 5200, baseRent: 240 },
  { id: "40hc", label: "40 ft High Cube", desc: "Extra 1ft headroom — Modular offices", basePrice: 6100, baseRent: 280 },
];

const MODIFICATIONS = [
  { id: "rollup", label: "Roll-up Door", price: 650, desc: "Forklift-friendly access" },
  { id: "windows", label: "Windows (x2)", price: 480, desc: "Security-barred steel-frame windows" },
  { id: "hvac", label: "HVAC Unit", price: 1800, desc: "Climate control for offices or cold storage" },
  { id: "electrical", label: "Electrical Package", price: 1200, desc: "Panel, outlets, LED lighting" },
  { id: "insulation", label: "Spray Foam Insulation", price: 900, desc: "Full interior insulation" },
  { id: "paint", label: "Custom Paint", price: 350, desc: "Any RAL color, industrial-grade finish" },
  { id: "shelving", label: "Interior Shelving", price: 420, desc: "Heavy-duty bolt-in racking" },
  { id: "vent", label: "Vents (x4)", price: 220, desc: "Anti-condensation louvered vents" },
];

const RENTAL_DURATIONS = [
  { id: "1mo", label: "1 Month", months: 1, discount: 0 },
  { id: "3mo", label: "3 Months", months: 3, discount: 0.05 },
  { id: "6mo", label: "6 Months", months: 6, discount: 0.1 },
  { id: "12mo", label: "12 Months", months: 12, discount: 0.15 },
];

const CONDITION = [
  { id: "new", label: "New / One-Trip", multiplier: 1.0, desc: "Never used, factory-fresh corten steel" },
  { id: "grade-a", label: "Grade A (WWT)", price: 0, multiplier: 0.82, desc: "Wind & watertight, minimal surface rust" },
  { id: "grade-b", label: "Grade B (Used)", multiplier: 0.67, desc: "Structurally sound, cosmetic wear" },
];

function SectionHeader({ step, title, subtitle }: { step: number; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <span className="inline-block bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase px-3 py-1 mb-3">
        Step {step}
      </span>
      <h2 className="text-2xl font-display font-bold uppercase tracking-tight text-foreground">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
    </div>
  );
}

export default function Quote() {
  const [selectedSize, setSelectedSize] = useState<string>("20ft");
  const [mode, setMode] = useState<"purchase" | "rental">("purchase");
  const [selectedDuration, setSelectedDuration] = useState<string>("3mo");
  const [selectedCondition, setSelectedCondition] = useState<string>("grade-a");
  const [selectedMods, setSelectedMods] = useState<Set<string>>(new Set());
  const [showBreakdown, setShowBreakdown] = useState(false);

  const toggleMod = (id: string) => {
    setSelectedMods(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const estimate = useMemo(() => {
    const size = SIZES.find(s => s.id === selectedSize)!;
    const condition = CONDITION.find(c => c.id === selectedCondition)!;
    const modsTotal = MODIFICATIONS.filter(m => selectedMods.has(m.id)).reduce((sum, m) => sum + m.price, 0);

    if (mode === "purchase") {
      const base = Math.round(size.basePrice * condition.multiplier);
      const total = base + modsTotal;
      return { base, mods: modsTotal, total, monthly: null, label: "Estimated Purchase Price" };
    } else {
      const duration = RENTAL_DURATIONS.find(d => d.id === selectedDuration)!;
      const monthlyBase = Math.round(size.baseRent * (1 - duration.discount));
      const modsMonthly = Math.round(modsTotal * 0.08); // ~8%/month amortized
      const monthly = monthlyBase + modsMonthly;
      const total = monthly * duration.months;
      return { base: monthlyBase, mods: modsMonthly, total, monthly, label: "Estimated Rental Total", months: duration.months };
    }
  }, [selectedSize, mode, selectedCondition, selectedDuration, selectedMods]);

  return (
    <div className="bg-background min-h-screen pt-16">
      {/* Page Header */}
      <section className="border-b border-border bg-card py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <p className="text-primary text-sm font-bold tracking-widest uppercase mb-3">Instant Estimate</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">
            Quote Calculator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Configure your container and get a ballpark price in seconds. No sign-up required — a real quote follows after you contact us.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left: Configuration */}
          <div className="lg:col-span-2 flex flex-col gap-10">

            {/* Step 1: Size */}
            <div>
              <SectionHeader step={1} title="Container Size" subtitle="Choose the footprint that fits your project." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SIZES.map(size => (
                  <button
                    key={size.id}
                    data-testid={`size-option-${size.id}`}
                    onClick={() => setSelectedSize(size.id)}
                    className={`text-left p-5 border-2 transition-all relative ${
                      selectedSize === size.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                  >
                    {selectedSize === size.id && (
                      <span className="absolute top-3 right-3 bg-primary rounded-full p-0.5">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </span>
                    )}
                    <div className="text-lg font-display font-bold uppercase">{size.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{size.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Purchase vs Rental */}
            <div>
              <SectionHeader step={2} title="Purchase or Rent" />
              <div className="grid grid-cols-2 gap-3">
                {(["purchase", "rental"] as const).map(m => (
                  <button
                    key={m}
                    data-testid={`mode-${m}`}
                    onClick={() => setMode(m)}
                    className={`p-5 border-2 text-center font-display font-bold uppercase tracking-wider text-lg transition-all ${
                      mode === m
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
                    }`}
                  >
                    {m === "purchase" ? "Buy It" : "Rent It"}
                  </button>
                ))}
              </div>

              {/* Rental Duration */}
              {mode === "rental" && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-3">Rental Duration</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {RENTAL_DURATIONS.map(d => (
                      <button
                        key={d.id}
                        data-testid={`duration-${d.id}`}
                        onClick={() => setSelectedDuration(d.id)}
                        className={`py-3 px-2 border-2 text-center font-bold uppercase text-sm transition-all relative ${
                          selectedDuration === d.id
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-muted-foreground"
                        }`}
                      >
                        {d.label}
                        {d.discount > 0 && (
                          <span className="block text-[10px] font-semibold text-primary mt-0.5 tracking-wider">
                            Save {d.discount * 100}%
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Condition (purchase only) */}
              {mode === "purchase" && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-3">Container Condition</p>
                  <div className="flex flex-col gap-2">
                    {CONDITION.map(c => (
                      <button
                        key={c.id}
                        data-testid={`condition-${c.id}`}
                        onClick={() => setSelectedCondition(c.id)}
                        className={`text-left px-5 py-4 border-2 flex items-center gap-4 transition-all ${
                          selectedCondition === c.id
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-muted-foreground"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                          selectedCondition === c.id ? "border-primary bg-primary" : "border-muted-foreground"
                        }`}>
                          {selectedCondition === c.id && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                        </div>
                        <div>
                          <div className="font-bold text-sm uppercase tracking-wide">{c.label}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{c.desc}</div>
                        </div>
                        {c.multiplier < 1 && (
                          <div className="ml-auto text-primary font-bold text-sm">
                            -{Math.round((1 - c.multiplier) * 100)}%
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Modifications */}
            <div>
              <SectionHeader step={3} title="Modifications" subtitle="Optional add-ons — our fab team handles everything in-house." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MODIFICATIONS.map(mod => (
                  <button
                    key={mod.id}
                    data-testid={`mod-${mod.id}`}
                    onClick={() => toggleMod(mod.id)}
                    className={`text-left p-4 border-2 transition-all flex items-start gap-3 ${
                      selectedMods.has(mod.id)
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 flex-shrink-0 border-2 flex items-center justify-center transition-all ${
                      selectedMods.has(mod.id) ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}>
                      {selectedMods.has(mod.id) && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-bold text-sm uppercase tracking-wide">{mod.label}</span>
                        <span className="text-primary font-bold text-sm flex-shrink-0">+${mod.price.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{mod.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sticky Price Panel */}
          <div className="lg:sticky lg:top-24">
            <div className="border-2 border-border bg-card overflow-hidden">
              {/* Header strip */}
              <div className="bg-primary px-6 py-4">
                <p className="text-primary-foreground text-xs font-bold tracking-widest uppercase">{estimate.label}</p>
              </div>

              <div className="p-6">
                {/* Total */}
                <div className="mb-6">
                  <p className="text-5xl font-display font-bold text-foreground">
                    ${estimate.total.toLocaleString()}
                  </p>
                  {estimate.monthly !== null && (
                    <p className="text-muted-foreground text-sm mt-1">
                      ${estimate.monthly.toLocaleString()}/mo &times; {estimate.months} months
                    </p>
                  )}
                </div>

                {/* Breakdown toggle */}
                <button
                  data-testid="toggle-breakdown"
                  onClick={() => setShowBreakdown(v => !v)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 font-semibold uppercase tracking-wider"
                >
                  {showBreakdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  Price Breakdown
                </button>

                {showBreakdown && (
                  <div className="mb-6 border border-border divide-y divide-border text-sm">
                    <div className="flex justify-between px-4 py-2.5">
                      <span className="text-muted-foreground">
                        {mode === "purchase" ? "Base container" : "Monthly rent"}
                      </span>
                      <span className="font-bold">${estimate.base.toLocaleString()}</span>
                    </div>
                    {[...selectedMods].map(id => {
                      const mod = MODIFICATIONS.find(m => m.id === id)!;
                      const displayPrice = mode === "rental" ? Math.round(mod.price * 0.08) : mod.price;
                      return (
                        <div key={id} className="flex justify-between px-4 py-2.5">
                          <span className="text-muted-foreground">{mod.label}</span>
                          <span className="font-bold text-primary">+${displayPrice.toLocaleString()}</span>
                        </div>
                      );
                    })}
                    {mode === "rental" && (
                      <div className="flex justify-between px-4 py-2.5 bg-primary/5">
                        <span className="text-muted-foreground">Monthly total</span>
                        <span className="font-bold">${estimate.monthly!.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between px-4 py-2.5 bg-card font-bold">
                      <span>Total estimate</span>
                      <span>${estimate.total.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  Estimates are indicative. Final pricing depends on site location, delivery, and build complexity. Delivery not included.
                </p>

                <Link
                  href="/contact"
                  data-testid="cta-get-formal-quote"
                  className="flex w-full h-12 items-center justify-center gap-2 bg-primary text-primary-foreground font-bold uppercase tracking-wider hover:bg-primary/90 transition-all text-sm"
                >
                  Get a Formal Quote <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="h-3 w-3 text-primary flex-shrink-0" />
                    No commitment required
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5">
                    <Check className="h-3 w-3 text-primary flex-shrink-0" />
                    Response within 24 hours
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5">
                    <Check className="h-3 w-3 text-primary flex-shrink-0" />
                    Nationwide delivery available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
