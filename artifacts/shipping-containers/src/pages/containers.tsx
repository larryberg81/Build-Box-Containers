import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Thermometer, Flame, DoorOpen, ShieldCheck, Truck, ClipboardCheck, Scale, X } from "lucide-react";

import {
  CONTAINERS,
  type Container,
  type ContainerColor,
  type ContainerConfiguration,
} from "@/data/containers";
import { useMarket } from "@/contexts/market";

const CATEGORIES = ["All", "10 ft", "20 ft", "30 ft", "40 ft", "Capsule"];
const CONDITIONS = ["All", "Used", "One-Trip"];
const TYPES = ["All", "Standard", "High Cube", "Modified", "Heated", "Reefer", "Capsule"];

const CONDITION_COLORS: Record<string, string> = {
  Used:      "bg-muted text-muted-foreground border border-border",
  "One-Trip": "bg-emerald-900/60 text-emerald-300 border border-emerald-700/50",
};

const TYPE_COLORS: Record<string, string> = {
  Standard: "bg-muted text-foreground border border-border",
  "High Cube": "bg-sky-950/70 text-sky-300 border border-sky-800/60",
  Modified: "bg-primary/10 text-primary border border-primary/30",
  Heated:   "bg-orange-950/70 text-orange-300 border border-orange-800/60",
  Reefer:   "bg-blue-950/70 text-blue-300 border border-blue-800/60",
  Capsule:  "bg-violet-950/70 text-violet-300 border border-violet-800/60",
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

function ComparisonView({
  containers,
  onRemove,
  onViewDetails,
}: {
  containers: Container[];
  onRemove: (id: string) => void;
  onViewDetails: (container: Container) => void;
}) {
  const { formatPriceLabel } = useMarket();
  const rows = [
    { label: "Exterior dimensions", getValue: (c: Container) => c.extDimensions },
    { label: "Interior dimensions", getValue: (c: Container) => c.intDimensions },
    { label: "Door / opening", getValue: (c: Container) => c.doorOpening ?? "—" },
    {
      label: "Capacity",
      getValue: (c: Container) => (
        <span className="flex flex-col gap-1">
          <span>{c.volume}</span>
          <span className="text-xs font-normal text-muted-foreground">Payload: {c.payload}</span>
        </span>
      ),
    },
    {
      label: "Condition",
      getValue: (c: Container) => (
        <span className={`inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 ${CONDITION_COLORS[c.condition]}`}>
          {c.condition}
        </span>
      ),
    },
    {
      label: "Type",
      getValue: (c: Container) => (
        <span className={`inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 ${TYPE_COLORS[c.type]}`}>
          {c.type}
        </span>
      ),
    },
    {
      label: "Purchase price",
      getValue: (c: Container) => <span className="text-lg font-display font-bold text-primary">{formatPriceLabel(c.price)}</span>,
    },
    {
      label: "Rental price",
      getValue: (c: Container) => formatPriceLabel(c.rentPrice) || "—",
    },
  ];

  return (
    <section id="compare" className="border-y border-primary/30 bg-primary/5 py-10 scroll-mt-36">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Scale className="h-4 w-4" /> Side-by-side comparison
            </p>
            <h2 className="text-3xl font-display font-bold uppercase tracking-tight">Compare your options</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Review the details that matter before requesting a quote.
            </p>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {containers.length} of 3 options selected
          </p>
        </div>

        <div className="overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="sticky left-0 z-10 w-36 min-w-36 border-r border-border bg-muted/50 p-3 text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:w-44 sm:min-w-44">
                  Specification
                </th>
                {containers.map(container => (
                  <th key={container.id} className="min-w-[190px] p-3 text-left align-top sm:min-w-[220px]">
                    <div className="relative">
                      <button
                        type="button"
                        aria-label={`Remove ${container.name} from comparison`}
                        onClick={() => onRemove(container.id)}
                        className="absolute right-0 top-0 inline-flex h-7 w-7 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <img src={container.image} alt="" className="mb-3 aspect-[16/9] w-full object-cover" />
                      <p className="pr-8 text-base font-display font-bold uppercase leading-tight">{container.name}</p>
                      <button
                        type="button"
                        onClick={() => onViewDetails(container)}
                        className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary hover:text-primary/80"
                      >
                        Full specs <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map(row => (
                <tr key={row.label}>
                  <th className="sticky left-0 z-10 border-r border-border bg-card p-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {row.label}
                  </th>
                  {containers.map(container => (
                    <td key={`${row.label}-${container.id}`} className="p-3 align-top font-mono text-xs font-semibold leading-relaxed">
                      {row.getValue(container)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground sm:hidden">Swipe sideways to see all options.</p>
      </div>
    </section>
  );
}

export default function Containers() {
  const { formatPriceLabel } = useMarket();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCondition, setActiveCondition] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);
  const [selectedColor, setSelectedColor] = useState<ContainerColor | null>(null);
  const [selectedConfiguration, setSelectedConfiguration] = useState<ContainerConfiguration | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const openContainer = (container: Container) => {
    setSelectedContainer(container);
    setSelectedColor(container.colorOptions?.[0] ?? null);
    setSelectedConfiguration(container.configurationOptions?.[0] ?? null);
  };

  const closeContainer = () => {
    setSelectedContainer(null);
    setSelectedColor(null);
    setSelectedConfiguration(null);
  };

  const filtered = CONTAINERS.filter(c => {
    const catMatch = activeCategory === "All" || c.category === activeCategory;
    const condMatch = activeCondition === "All" || c.condition === activeCondition;
    const typeMatch =
      activeType === "All" ||
      (activeType === "High Cube" ? c.size.includes("HC") : c.type === activeType);
    return catMatch && condMatch && typeMatch;
  });
  const comparedContainers = compareIds
    .map(id => CONTAINERS.find(container => container.id === id))
    .filter((container): container is Container => Boolean(container));
  const toggleCompare = (container: Container) => {
    setCompareIds(current => {
      if (current.includes(container.id)) return current.filter(id => id !== container.id);
      if (current.length >= 3) return current;
      return [...current, container.id];
    });
  };

  return (
    <div className="bg-background min-h-screen pt-16">
      {/* Header */}
      <section className="border-b border-border bg-card py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <p className="text-primary text-sm font-bold tracking-widest uppercase mb-3">Full Fleet</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">Shipping Containers for Sale &amp; Rent</h1>
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

      {compareIds.length > 0 && (
        <div className="border-b border-border bg-card">
          <div className="container mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-8">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <span className="text-primary">{compareIds.length} selected</span>
              {compareIds.length < 2 ? " — select one more to compare" : " — up to 3 containers"}
            </p>
            <div className="flex flex-wrap gap-2">
              {comparedContainers.map(container => (
                <button
                  key={container.id}
                  type="button"
                  onClick={() => toggleCompare(container)}
                  className="inline-flex items-center gap-2 border border-border bg-background px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
                >
                  {container.name} <X className="h-3 w-3" />
                </button>
              ))}
              {compareIds.length >= 2 && (
                <a
                  href="#compare"
                  className="inline-flex items-center gap-2 bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View comparison <ArrowRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {comparedContainers.length >= 2 && (
        <ComparisonView
          containers={comparedContainers}
          onRemove={id => setCompareIds(current => current.filter(compareId => compareId !== id))}
          onViewDetails={openContainer}
        />
      )}

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
                onClick={() => openContainer(container)}
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
                    {container.colorOptions && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 border border-border">
                        {container.colorOptions.length} colors
                      </span>
                    )}
                    {container.configurationOptions && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 border border-border">
                        {container.configurationOptions.length} configurations
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

                  <div className="mb-4 flex items-center justify-between border-t border-border pt-4">
                    <button
                      type="button"
                      aria-pressed={compareIds.includes(container.id)}
                      disabled={!compareIds.includes(container.id) && compareIds.length >= 3}
                      onClick={event => {
                        event.stopPropagation();
                        toggleCompare(container);
                      }}
                      className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                        compareIds.includes(container.id)
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      <span className={`inline-flex h-4 w-4 items-center justify-center border ${
                        compareIds.includes(container.id) ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                      }`}>
                        {compareIds.includes(container.id) && <span className="text-xs leading-none">✓</span>}
                      </span>
                      {compareIds.includes(container.id) ? "In comparison" : "Add to compare"}
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <div className="text-2xl font-display font-bold text-foreground">{formatPriceLabel(container.price)}</div>
                      {container.rentPrice && (
                        <div className="text-xs text-muted-foreground">{formatPriceLabel(container.rentPrice)}</div>
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
                    onClick={() => openContainer(c)}
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
                    <td className="px-4 py-3 text-right font-display font-bold text-primary">{formatPriceLabel(c.price)}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground hidden sm:table-cell">{formatPriceLabel(c.rentPrice) || "—"}</td>
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
          onClick={closeContainer}
        >
          <div
            className="bg-card border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={selectedConfiguration?.image ?? selectedColor?.image ?? selectedContainer.image}
                alt={`${selectedContainer.name}${selectedConfiguration ? ` — ${selectedConfiguration.name}` : selectedColor ? ` in ${selectedColor.name}` : ""}`}
                className="w-full h-full object-cover"
              />
            </div>
            {(selectedConfiguration?.gallery ?? selectedColor?.gallery ?? selectedContainer.gallery ?? []).length > 1 && (
              <div className="grid grid-cols-2 gap-2 border-b border-border bg-muted p-2">
                {(selectedConfiguration?.gallery ?? selectedColor?.gallery ?? selectedContainer.gallery ?? [selectedContainer.image]).map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`${selectedContainer.name}${selectedConfiguration ? ` — ${selectedConfiguration.name}` : selectedColor ? ` in ${selectedColor.name}` : ""} view ${index + 1}`}
                    className="aspect-[4/3] w-full object-cover"
                  />
                ))}
              </div>
            )}
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

              {selectedContainer.colorOptions && (
                <div className="mb-6 border border-border bg-background/40 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Choose a Color</p>
                  <div className="flex flex-wrap gap-3">
                    {selectedContainer.colorOptions.map(color => (
                      <button
                        key={color.id}
                        type="button"
                        data-testid={`color-option-${color.id}`}
                        aria-label={`Choose ${color.name}`}
                        aria-pressed={selectedColor?.id === color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 border-2 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                          selectedColor?.id === color.id
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-card text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span
                          className="h-5 w-5 rounded-full border border-foreground/30 shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        {color.name}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Select your preferred color before requesting a quote.
                  </p>
                </div>
              )}

              {selectedContainer.configurationOptions && (
                <div className="mb-6 border border-border bg-background/40 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Choose a Configuration</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {selectedContainer.configurationOptions.map(configuration => (
                      <button
                        key={configuration.id}
                        type="button"
                        data-testid={`configuration-option-${configuration.id}`}
                        aria-label={`Choose ${configuration.name}`}
                        aria-pressed={selectedConfiguration?.id === configuration.id}
                        onClick={() => setSelectedConfiguration(configuration)}
                        className={`border-2 px-3 py-3 text-left text-xs font-bold uppercase tracking-wider transition-all ${
                          selectedConfiguration?.id === configuration.id
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-card text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {configuration.name}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Select the side-door layout that best matches your project.
                  </p>
                </div>
              )}

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
                  <div className="text-3xl font-display font-bold">{formatPriceLabel(selectedContainer.price)}</div>
                  {selectedContainer.rentPrice && (
                    <div className="text-sm text-muted-foreground">{formatPriceLabel(selectedContainer.rentPrice)}</div>
                  )}
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/quote?containerId=${encodeURIComponent(selectedContainer.id)}${selectedColor ? `&color=${encodeURIComponent(selectedColor.id)}` : ""}${selectedConfiguration ? `&configuration=${encodeURIComponent(selectedConfiguration.id)}` : ""}`}
                    onClick={closeContainer}
                    className="inline-flex h-11 items-center justify-center bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all uppercase tracking-wider"
                  >
                    Get a Quote
                  </Link>
                  <button
                    onClick={closeContainer}
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
