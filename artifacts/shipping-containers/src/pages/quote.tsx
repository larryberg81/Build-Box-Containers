import { useState, useMemo } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { ArrowRight, Check, ChevronDown, ChevronUp, Truck, MapPin, MessageCircle, X, Send, Zap } from "lucide-react";

// ── Real container catalog ───────────────────────────────────────────────────
const CONTAINERS = [
  { id: "10-used",     label: "10' Used",                size: "10 ft",    sizeGroup: "10",  condition: "Used",     buyPrice: 850,  rentPrice: 95  },
  { id: "10-new-side", label: "10' New",                  size: "10 ft",    sizeGroup: "10",  condition: "New",      buyPrice: 1200, rentPrice: 120 },
  { id: "10-new-rollup", label: "10' New Modified — Roll-up Door", size: "10 ft", sizeGroup: "10", condition: "Modified", buyPrice: 1850, rentPrice: 175 },
  { id: "20-used",     label: "20' Used",                size: "20 ft",    sizeGroup: "20+", condition: "Used",     buyPrice: 1100, rentPrice: 140 },
  { id: "20-new",      label: "20' New",                 size: "20 ft",    sizeGroup: "20+", condition: "New",      buyPrice: 2200, rentPrice: 175 },
  { id: "20-hc-new",   label: "20' High Cube — New",     size: "20 ft HC", sizeGroup: "20+", condition: "New",      buyPrice: 2600, rentPrice: 210 },
  { id: "20-hc-side",  label: "20' HC — Side Doors",     size: "20 ft HC", sizeGroup: "20+", condition: "Modified", buyPrice: 2600, rentPrice: 210 },
  { id: "20-heated",   label: "20' Heated — Side Doors", size: "20 ft",    sizeGroup: "20+", condition: "Modified", buyPrice: 3400, rentPrice: 280 },
  { id: "30-used",     label: "30' Used",                size: "30 ft",    sizeGroup: "20+", condition: "Used",     buyPrice: 1650, rentPrice: 195 },
  { id: "30-new",      label: "30' New",                 size: "30 ft",    sizeGroup: "20+", condition: "New",      buyPrice: 2550, rentPrice: 235 },
  { id: "40-used",     label: "40' Used",                size: "40 ft",    sizeGroup: "20+", condition: "Used",     buyPrice: 1900, rentPrice: 220 },
  { id: "40-new",      label: "40' New",                 size: "40 ft",    sizeGroup: "20+", condition: "New",      buyPrice: 3200, rentPrice: 270 },
  { id: "40-hc-new",   label: "40' High Cube — New",     size: "40 ft HC", sizeGroup: "20+", condition: "New",      buyPrice: 3600, rentPrice: 310 },
  { id: "40-hc-side",      label: "40' HC — Side Doors",     size: "40 ft HC", sizeGroup: "20+", condition: "Modified", buyPrice: 3600,  rentPrice: 310 },
  { id: "40-heated",       label: "40' Heated — Side Doors", size: "40 ft",    sizeGroup: "20+", condition: "Modified", buyPrice: 4400,  rentPrice: 380 },
  // Reefer containers
  { id: "reefer-20-used",  label: "20' Reefer — Used",       size: "20 ft",    sizeGroup: "20+", condition: "Reefer",   buyPrice: 3500,  rentPrice: 320 },
  { id: "reefer-20-new",   label: "20' Reefer — New",        size: "20 ft",    sizeGroup: "20+", condition: "Reefer",   buyPrice: 6800,  rentPrice: 520 },
  { id: "reefer-40-used",  label: "40' Reefer — Used",       size: "40 ft",    sizeGroup: "20+", condition: "Reefer",   buyPrice: 4800,  rentPrice: 420 },
  { id: "reefer-40hc-new", label: "40' HC Reefer — New",     size: "40 ft HC", sizeGroup: "20+", condition: "Reefer",   buyPrice: 9200,  rentPrice: 680 },
];

const COLOR_OPTIONS: Record<string, { id: string; label: string; hex: string }[]> = {
  "10-new-side": [
    { id: "blue", label: "Blue", hex: "#075fc4" },
    { id: "beige", label: "Beige", hex: "#f1f3f2" },
    { id: "green", label: "Dark Green", hex: "#0e503c" },
    { id: "gray", label: "Gray", hex: "#667481" },
    { id: "red", label: "Red", hex: "#9f332f" },
  ],
  "10-new-rollup": [
    { id: "charcoal", label: "Charcoal", hex: "#3f4448" },
    { id: "blue", label: "Blue", hex: "#075fc4" },
    { id: "beige", label: "Beige", hex: "#c8b99d" },
    { id: "green", label: "Dark Green", hex: "#0e503c" },
    { id: "red", label: "Red", hex: "#9f332f" },
  ],
  "20-new": [
    { id: "orange", label: "Orange", hex: "#d68713" },
    { id: "blue", label: "Blue", hex: "#075fc4" },
    { id: "beige", label: "Beige", hex: "#c9b99a" },
    { id: "green", label: "Dark Green", hex: "#0e503c" },
    { id: "red", label: "Red", hex: "#9f332f" },
  ],
  "20-hc-new": [
    { id: "gray", label: "Gray", hex: "#7b858d" },
    { id: "blue", label: "Blue", hex: "#075fc4" },
    { id: "beige", label: "Beige", hex: "#c8b99d" },
    { id: "green", label: "Dark Green", hex: "#0e503c" },
    { id: "red", label: "Red", hex: "#9f332f" },
  ],
  "30-new": [
    { id: "beige", label: "Beige", hex: "#c9b99a" },
    { id: "dark-green", label: "Dark Green", hex: "#244c3b" },
  ],
  "40-used": [
    { id: "red", label: "Red", hex: "#8f342f" },
    { id: "blue", label: "Blue", hex: "#2f5f91" },
    { id: "light-blue-gray", label: "Light Blue / Gray", hex: "#738b94" },
    { id: "navy-blue", label: "Navy Blue", hex: "#253f68" },
  ],
  "40-new": [
    { id: "dark-green", label: "Dark Green", hex: "#345543" },
    { id: "charcoal-gray", label: "Charcoal Gray", hex: "#4a4c50" },
  ],
  "40-hc-new": [
    { id: "red", label: "Red", hex: "#98413a" },
    { id: "gray", label: "Gray", hex: "#777d7e" },
    { id: "blue", label: "Blue", hex: "#18509a" },
    { id: "beige", label: "Beige", hex: "#d8cfaa" },
  ],
};

const CONFIGURATION_OPTIONS: Record<string, { id: string; label: string }[]> = {
  "20-hc-side": [
    { id: "storefront-rollup", label: "Side Roll-Up + Glass Entry" },
    { id: "double-rollup", label: "Double Side Roll-Up Doors" },
    { id: "full-side-cargo", label: "Full Side-Opening Cargo Doors" },
    { id: "single-rollup", label: "Single Side Roll-Up Door" },
    { id: "interior-rollup", label: "Interior Roll-Up Access" },
  ],
  "20-heated": [
    { id: "white-office", label: "White Heated Office Package" },
    { id: "gray-security-office", label: "Gray Security Office Package" },
    { id: "beige-climate-office", label: "Beige Climate-Controlled Office" },
  ],
};

// Delivery fee: 10ft = $380, everything else = $580
const DELIVERY_FEE = (sizeGroup: string) => sizeGroup === "10" ? 380 : 580;

const CONDITION_COLORS: Record<string, string> = {
  Used:     "bg-muted text-muted-foreground",
  New:      "bg-emerald-900/60 text-emerald-300",
  Modified: "bg-primary/20 text-primary",
  Reefer:   "bg-blue-900/60 text-blue-300",
};

const MODIFICATIONS = [
  { id: "rollup",     label: "Roll-up Door",          price: 650,  desc: "Forklift-friendly full-width access" },
  { id: "windows",    label: "Windows (x2)",          price: 480,  desc: "Security-barred steel-frame windows" },
  { id: "hvac",       label: "HVAC Unit",             price: 1800, desc: "Climate control for offices or cold storage" },
  { id: "electrical", label: "Electrical Package",    price: 1200, desc: "Panel, outlets, LED lighting" },
  { id: "insulation", label: "Spray Foam Insulation", price: 900,  desc: "Full interior insulation" },
  { id: "paint",      label: "Custom Paint",          price: 350,  desc: "Any RAL color, industrial-grade finish" },
  { id: "shelving",   label: "Interior Shelving",     price: 420,  desc: "Heavy-duty bolt-in racking" },
  { id: "vent",       label: "Vents (x4)",            price: 220,  desc: "Anti-condensation louvered vents" },
];

const GENSET_ADDONS = [
  { id: "gs-none",    label: "No Genset",                   price: 0,     desc: "Skip genset — power connection not required" },
  { id: "gs-gm460",   label: "Genmark GM-460 (4.6 kW)",    price: 4200,  desc: "Lightest & quietest — 20ft reefers, urban sites" },
  { id: "gs-ct6300",  label: "Carrier GEN 6300 (6.3 kW)",  price: 5500,  desc: "Compact Kubota engine, ideal for 20ft" },
  { id: "gs-tk800",   label: "Thermo King UT-800 (8 kW)",  price: 7200,  desc: "Best-selling TK model — all reefer sizes" },
  { id: "gs-ct7500",  label: "Carrier GEN 7500 (7.5 kW)",  price: 7000,  desc: "Fleet favorite — APX+ controller, 20–40ft" },
  { id: "gs-gm750",   label: "Genmark GM-750 (7.5 kW)",    price: 6800,  desc: "Best value in class — 20/30/40ft" },
  { id: "gs-rg6500",  label: "ReeGen RG-6500 Eco (hybrid)", price: 8400, desc: "Hybrid diesel-electric, ultra-low noise" },
  { id: "gs-tk1000",  label: "Thermo King UT-1000 (10 kW)", price: 8900, desc: "Heavy-duty 4-cylinder — 40ft & HC" },
  { id: "gs-rg9000",  label: "ReeGen RG-9000 Pro (hybrid)", price: 11200, desc: "High-output hybrid, cloud monitoring" },
];

const RENTAL_DURATIONS = [
  { id: "1mo",  label: "1 Month",   months: 1,  discount: 0 },
  { id: "3mo",  label: "3 Months",  months: 3,  discount: 0.05 },
  { id: "6mo",  label: "6 Months",  months: 6,  discount: 0.10 },
  { id: "12mo", label: "12 Months", months: 12, discount: 0.15 },
];

// ── Delivery timeline ────────────────────────────────────────────────────────
const DEPOT_STATES = new Set(["WA","CA","AZ","CO","TX","IL","GA","NY","FL"]);
const NEAR_STATES  = new Set([
  "OR","ID","NV","MT","UT","NM","KS","OK","MO","LA","MS","AL","TN","NC","SC",
  "VA","MD","PA","NJ","CT","MA","RI","IN","OH","MI","WI","MN","IA","NE","SD","ND","KY","WV","DE",
]);

function getDelivery(state: string) {
  if (!state)                     return { days: "3 – 5 business days", label: "Select a state to see your estimated window", color: "text-muted-foreground" };
  if (DEPOT_STATES.has(state))    return { days: "72 hours (3 days)",   label: "Depot in your state — fastest delivery",       color: "text-emerald-400" };
  if (NEAR_STATES.has(state))     return { days: "4 – 5 business days", label: "Regional delivery from nearest depot",          color: "text-amber-400"   };
  return                                 { days: "5 business days",     label: "Long-haul delivery from nearest depot",         color: "text-muted-foreground" };
}

const US_STATES: [string, string][] = [
  ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],
  ["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["FL","Florida"],["GA","Georgia"],
  ["HI","Hawaii"],["ID","Idaho"],["IL","Illinois"],["IN","Indiana"],["IA","Iowa"],
  ["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],["MD","Maryland"],
  ["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],["MS","Mississippi"],["MO","Missouri"],
  ["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],["NH","New Hampshire"],["NJ","New Jersey"],
  ["NM","New Mexico"],["NY","New York"],["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],
  ["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],["SC","South Carolina"],
  ["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],["UT","Utah"],["VT","Vermont"],
  ["VA","Virginia"],["WA","Washington"],["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"],
];

function SectionHeader({ step, title, subtitle }: { step: number; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <span className="inline-block bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase px-3 py-1 mb-3">
        Step {step}
      </span>
      <h2 className="text-2xl font-display font-bold uppercase tracking-tight">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
    </div>
  );
}

// ── Floating inquiry widget ──────────────────────────────────────────────────
function InquiryWidget({
  containerLabel,
  colorLabel,
  totalPrice,
  deliveryState,
  deliveryZip,
  mode,
}: {
  containerLabel: string;
  colorLabel?: string;
  totalPrice: number;
  deliveryState: string;
  deliveryZip: string;
  mode: "purchase" | "rental";
}) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", message: "" });
  const configuredContainerLabel = colorLabel ? `${containerLabel} — ${colorLabel}` : containerLabel;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        subject: `Built Box Containers — Quote Inquiry: ${configuredContainerLabel}`,
        from_name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        container: configuredContainerLabel,
        mode,
        estimate: `$${totalPrice.toLocaleString()} (incl. delivery)`,
        delivery_state: deliveryState || "Not specified",
        delivery_zip: deliveryZip || "Not specified",
        message: form.message || defaultMessage,
      };
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert("Submission failed — please try again or email us directly.");
      }
    } catch {
      alert("Network error — please email us at sales@builtboxcontainers.com");
    } finally {
      setLoading(false);
    }
  };

  const defaultMessage = `Hi, I'm interested in the ${configuredContainerLabel} (${mode === "purchase" ? "purchase" : "rental"})${
    deliveryState ? ` — delivery to ${deliveryState}${deliveryZip ? ` ${deliveryZip}` : ""}` : ""
  }. My estimated total is $${totalPrice.toLocaleString()}. Please send me a formal quote.`;

  return (
    <>
      {/* Floating button */}
      <button
        data-testid="inquiry-widget-toggle"
        onClick={() => { setOpen(v => !v); setSubmitted(false); }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm h-12 px-5 shadow-2xl hover:bg-primary/90 transition-all"
      >
        {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
        {open ? "Close" : "Talk to Us"}
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 bg-card border border-border shadow-2xl overflow-hidden">
          <div className="bg-primary px-5 py-4">
            <p className="text-primary-foreground font-display font-bold uppercase tracking-tight text-base">Quick Inquiry</p>
            <p className="text-primary-foreground/70 text-xs mt-0.5">We respond within 24 hours</p>
          </div>

          {submitted ? (
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <p className="font-display font-bold uppercase text-lg mb-2">Got it!</p>
              <p className="text-sm text-muted-foreground">
                We'll reach out to <strong className="text-foreground">{form.email || "you"}</strong> within 24 hours with your formal quote.
              </p>
              <button onClick={() => { setOpen(false); setSubmitted(false); }} className="mt-5 w-full h-10 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              {/* Pre-filled context */}
              <div className="bg-background/60 border border-border p-3 text-xs text-muted-foreground space-y-1">
                <p><span className="font-bold text-foreground">Container:</span> {containerLabel}</p>
                <p><span className="font-bold text-foreground">Type:</span> {mode === "purchase" ? "Purchase" : "Rental"}</p>
                <p><span className="font-bold text-foreground">Estimate:</span> ${totalPrice.toLocaleString()} (incl. delivery)</p>
                {deliveryState && <p><span className="font-bold text-foreground">Delivery to:</span> {deliveryState}{deliveryZip ? ` ${deliveryZip}` : ""}</p>}
              </div>

              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full h-10 px-3 bg-background border border-border text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full h-10 px-3 bg-background border border-border text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
              />
              <input
                required
                type="tel"
                placeholder="Phone number *"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full h-10 px-3 bg-background border border-border text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
              />
              <input
                required
                placeholder="Shipping address *"
                value={form.address}
                onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                className="w-full h-10 px-3 bg-background border border-border text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
              />
              <textarea
                rows={3}
                value={form.message || defaultMessage}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full px-3 py-2 bg-background border border-border text-xs text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none leading-relaxed"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? "Sending..." : <><span>Send Inquiry</span> <Send className="h-3.5 w-3.5" /></>}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function Quote() {
  const [, navigate]                              = useLocation();
  const search                                     = useSearch();
  const searchParams                               = new URLSearchParams(search);
  const requestedContainerId                       = searchParams.get("containerId");
  const requestedColorId                           = searchParams.get("color");
  const requestedConfigurationId                   = searchParams.get("configuration");
  const requestedColors                            = requestedContainerId ? COLOR_OPTIONS[requestedContainerId] ?? [] : [];
  const requestedConfigurations                    = requestedContainerId ? CONFIGURATION_OPTIONS[requestedContainerId] ?? [] : [];
  const initialContainerId                         = requestedContainerId && CONTAINERS.some(c => c.id === requestedContainerId)
    ? requestedContainerId
    : "20-used";
  const initialColorId                             = requestedColors.some(color => color.id === requestedColorId)
    ? requestedColorId ?? ""
    : requestedColors[0]?.id ?? "";
  const initialConfigurationId                     = requestedConfigurations.some(configuration => configuration.id === requestedConfigurationId)
    ? requestedConfigurationId ?? ""
    : requestedConfigurations[0]?.id ?? "";
  const [selectedContainer, setSelectedContainer] = useState<string>(initialContainerId);
  const [selectedColor, setSelectedColor]         = useState<string>(initialColorId);
  const [selectedConfiguration, setSelectedConfiguration] = useState<string>(initialConfigurationId);
  const [mode, setMode]                           = useState<"purchase" | "rental">("purchase");
  const [selectedDuration, setSelectedDuration]   = useState<string>("3mo");
  const [selectedMods, setSelectedMods]           = useState<Set<string>>(new Set());
  const [selectedGenset, setSelectedGenset]       = useState<string>("gs-none");
  const [showBreakdown, setShowBreakdown]         = useState(false);
  const [selectedState, setSelectedState]         = useState<string>("");
  const [zipCode, setZipCode]                     = useState<string>("");
  const [sizeFilter, setSizeFilter]               = useState<string>("All");

  const goToFormalQuote = () => {
    const gensetObj = GENSET_ADDONS.find(g => g.id === selectedGenset)!;
    const modLabels = MODIFICATIONS.filter(m => selectedMods.has(m.id)).map(m => m.label);
    const durationObj = RENTAL_DURATIONS.find(d => d.id === selectedDuration)!;
    const selectedColorLabel = colorOptions.find(color => color.id === selectedColor)?.label ?? "";
    const selectedConfigurationLabel = configurationOptions.find(configuration => configuration.id === selectedConfiguration)?.label ?? "";
    const params = new URLSearchParams({
      container: container.label,
      containerId: container.id,
      color: selectedColorLabel,
      configuration: selectedConfigurationLabel,
      mode,
      total:    String(estimate.total),
      base:     String(estimate.base),
      delivery: String(estimate.delivery),
      genset:   gensetObj.id !== "gs-none" ? gensetObj.label : "",
      mods:     modLabels.join(" | "),
      state:    selectedState,
      zip:      zipCode,
      ...(mode === "rental" && estimate.monthly !== null
        ? { monthly: String(estimate.monthly), duration: durationObj.label }
        : {}),
    });
    navigate(`/contact?${params.toString()}`);
  };

  const SIZE_GROUPS = ["All", "10 ft", "20 ft", "30 ft", "40 ft"];

  const filteredContainers = sizeFilter === "All"
    ? CONTAINERS
    : CONTAINERS.filter(c => c.size.startsWith(sizeFilter));

  const toggleMod = (id: string) => {
    setSelectedMods(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const container  = CONTAINERS.find(c => c.id === selectedContainer)!;
  const colorOptions = COLOR_OPTIONS[container.id] ?? [];
  const colorLabel = colorOptions.find(color => color.id === selectedColor)?.label ?? "";
  const configurationOptions = CONFIGURATION_OPTIONS[container.id] ?? [];
  const configurationLabel = configurationOptions.find(configuration => configuration.id === selectedConfiguration)?.label ?? "";
  const delivery   = getDelivery(selectedState);
  const deliveryFee = DELIVERY_FEE(container.sizeGroup);

  const estimate = useMemo(() => {
    const fee        = DELIVERY_FEE(container.sizeGroup);
    const modsTotal  = MODIFICATIONS.filter(m => selectedMods.has(m.id)).reduce((sum, m) => sum + m.price, 0);
    const genset     = GENSET_ADDONS.find(g => g.id === selectedGenset)!;
    const gensetPrice = genset.price;

    if (mode === "purchase") {
      const base  = container.buyPrice;
      const total = base + modsTotal + gensetPrice + fee;
      return { base, mods: modsTotal, genset: gensetPrice, gensetLabel: genset.label, delivery: fee, total, monthly: null, label: "Estimated Purchase Price" };
    } else {
      const duration    = RENTAL_DURATIONS.find(d => d.id === selectedDuration)!;
      const monthlyBase = Math.round(container.rentPrice * (1 - duration.discount));
      const modsMonthly = Math.round(modsTotal * 0.08);
      const gensetMonthly = Math.round(gensetPrice * 0.08);
      const monthly     = monthlyBase + modsMonthly + gensetMonthly;
      const total       = monthly * duration.months + fee;
      return { base: monthlyBase, mods: modsMonthly, genset: gensetMonthly, gensetLabel: genset.label, delivery: fee, total, monthly, label: "Estimated Rental Total", months: duration.months };
    }
  }, [selectedContainer, mode, selectedDuration, selectedMods, selectedGenset]);

  return (
    <div className="bg-background min-h-screen pt-16">
      {/* Header */}
      <section className="border-b border-border bg-card py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <p className="text-primary text-sm font-bold tracking-widest uppercase mb-3">Instant Estimate</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">Quote Calculator</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Pick your container, add-ons, and delivery location — get a real all-in price in seconds.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Left: Config ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-10">

            {/* Step 1: Container */}
            <div>
              <SectionHeader step={1} title="Select Your Container" subtitle="Choose the exact size and type you need." />
              <div className="flex gap-1 flex-wrap mb-4">
                {SIZE_GROUPS.map(g => (
                  <button
                    key={g}
                    data-testid={`size-group-${g.replace(/ /g, "-").toLowerCase()}`}
                    onClick={() => setSizeFilter(g)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all ${
                      sizeFilter === g
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground border border-border hover:text-foreground"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {filteredContainers.map(c => (
                  <button
                    key={c.id}
                    data-testid={`container-option-${c.id}`}
                    onClick={() => {
                      setSelectedContainer(c.id);
                      setSelectedColor(COLOR_OPTIONS[c.id]?.[0]?.id ?? "");
                      setSelectedConfiguration(CONFIGURATION_OPTIONS[c.id]?.[0]?.id ?? "");
                    }}
                    className={`text-left px-4 py-4 border-2 transition-all flex items-center gap-4 ${
                      selectedContainer === c.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      selectedContainer === c.id ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}>
                      {selectedContainer === c.id && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5 flex-shrink-0">{c.size}</span>
                    <span className="font-bold text-sm uppercase tracking-wide flex-1">{c.label}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 flex-shrink-0 ${CONDITION_COLORS[c.condition]}`}>{c.condition}</span>
                    <span className="font-display font-bold text-foreground flex-shrink-0">
                      {mode === "purchase" ? `$${c.buyPrice.toLocaleString()}` : `$${c.rentPrice}/mo`}
                    </span>
                  </button>
                ))}
              </div>
              {colorOptions.length > 0 && (
                <div className="mt-5 border border-border bg-background/40 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Choose a Color</p>
                  <div className="flex flex-wrap gap-3">
                    {colorOptions.map(color => (
                      <button
                        key={color.id}
                        type="button"
                        data-testid={`quote-color-option-${color.id}`}
                        aria-label={`Choose ${color.label}`}
                        aria-pressed={selectedColor === color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`flex items-center gap-2 border-2 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                          selectedColor === color.id
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-card text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span
                          className="h-5 w-5 rounded-full border border-foreground/30 shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        {color.label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">Your color choice will be included with your formal quote request.</p>
                </div>
              )}
              {configurationOptions.length > 0 && (
                <div className="mt-5 border border-border bg-background/40 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Choose a Configuration</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {configurationOptions.map(configuration => (
                      <button
                        key={configuration.id}
                        type="button"
                        data-testid={`quote-configuration-option-${configuration.id}`}
                        aria-label={`Choose ${configuration.label}`}
                        aria-pressed={selectedConfiguration === configuration.id}
                        onClick={() => setSelectedConfiguration(configuration.id)}
                        className={`border-2 px-3 py-3 text-left text-xs font-bold uppercase tracking-wider transition-all ${
                          selectedConfiguration === configuration.id
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-card text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {configuration.label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">Your side-door layout will be included with your formal quote request.</p>
                </div>
              )}
            </div>

            {/* Step 2: Purchase vs Rental */}
            <div>
              <SectionHeader step={2} title="Purchase or Rent" />
              <div className="grid grid-cols-2 gap-3">
                {(["purchase","rental"] as const).map(m => (
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
              {mode === "rental" && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-3">Rental Duration</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {RENTAL_DURATIONS.map(d => (
                      <button
                        key={d.id}
                        data-testid={`duration-${d.id}`}
                        onClick={() => setSelectedDuration(d.id)}
                        className={`py-3 px-2 border-2 text-center font-bold uppercase text-sm transition-all ${
                          selectedDuration === d.id
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-muted-foreground"
                        }`}
                      >
                        {d.label}
                        {d.discount > 0 && (
                          <span className="block text-[10px] font-semibold text-primary mt-0.5 tracking-wider">Save {d.discount * 100}%</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Modifications */}
            <div>
              <SectionHeader step={3} title="Add-On Modifications" subtitle="Optional upgrades — all fabricated in-house." />
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

            {/* Step 4: Genset */}
            <div>
              <SectionHeader step={4} title="Undermount Genset" subtitle="Optional — add a pre-mounted generator set for off-grid or reefer operation." />
              <div className="flex flex-col gap-2">
                {GENSET_ADDONS.map(g => (
                  <button
                    key={g.id}
                    data-testid={`genset-option-${g.id}`}
                    onClick={() => setSelectedGenset(g.id)}
                    className={`text-left px-4 py-4 border-2 transition-all flex items-center gap-4 ${
                      selectedGenset === g.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      selectedGenset === g.id ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}>
                      {selectedGenset === g.id && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wide flex-1">{g.label}</span>
                    <span className="font-display font-bold flex-shrink-0 text-foreground">
                      {g.price === 0 ? "—" : `+$${g.price.toLocaleString()}`}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                <Link href="/gensets" className="text-primary underline underline-offset-2">Browse all 11 genset models</Link> — including hybrid ReeGen units.
              </p>
            </div>

            {/* Step 5: Delivery Location */}
            <div>
              <SectionHeader step={5} title="Delivery Location" subtitle="We'll estimate your delivery timeline from the nearest depot." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">State</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <select
                      data-testid="state-select"
                      value={selectedState}
                      onChange={e => setSelectedState(e.target.value)}
                      className="w-full h-11 pl-9 pr-4 bg-card border border-border text-sm font-semibold appearance-none focus:outline-none focus:border-primary transition-colors text-foreground"
                    >
                      <option value="">Select state…</option>
                      {US_STATES.map(([code, name]) => (
                        <option key={code} value={code}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">ZIP Code</label>
                  <input
                    data-testid="zip-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="e.g. 90210"
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    className="w-full h-11 px-4 bg-card border border-border text-sm font-semibold focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground text-foreground"
                  />
                </div>
              </div>

              {/* Delivery timeline card */}
              <div className={`border-2 p-4 flex items-center gap-4 transition-all ${
                selectedState ? "border-border bg-card" : "border-dashed border-border bg-transparent"
              }`}>
                <Truck className={`h-6 w-6 flex-shrink-0 ${selectedState ? delivery.color : "text-muted-foreground"}`} />
                <div>
                  <p className={`font-bold text-sm uppercase tracking-wide ${selectedState ? delivery.color : "text-muted-foreground"}`}>
                    {selectedState ? delivery.days : "3 – 5 business days"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedState ? delivery.label : "Select a state to see your estimated delivery window"}
                  </p>
                </div>
                {selectedState && DEPOT_STATES.has(selectedState) && (
                  <span className="ml-auto text-[10px] font-bold uppercase tracking-wider bg-emerald-900/50 text-emerald-300 px-2 py-1 flex-shrink-0">
                    Depot State
                  </span>
                )}
              </div>

              {/* Delivery fee callout */}
              <div className="mt-3 flex items-center gap-3 px-4 py-3 bg-primary/5 border border-primary/20">
                <Truck className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-sm">
                  <span className="font-bold text-foreground">Delivery fee included: </span>
                  <span className="text-primary font-bold">${deliveryFee.toLocaleString()}</span>
                  <span className="text-muted-foreground text-xs ml-2">(flat rate, one-time)</span>
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Minimum lead time is 3 business days. Remote locations may require additional scheduling.</p>
            </div>
          </div>

          {/* ── Right: Sticky Price Panel ─────────────────────────────────── */}
          <div className="lg:sticky lg:top-24">
            <div className="border-2 border-border bg-card overflow-hidden">
              <div className="bg-primary px-6 py-4">
                <p className="text-primary-foreground text-xs font-bold tracking-widest uppercase">{estimate.label}</p>
              </div>

              <div className="p-6">
                {/* Selected container summary */}
                <div className="mb-5 pb-5 border-b border-border">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Selected</p>
                  <p className="font-display font-bold uppercase text-sm leading-tight">{container.label}</p>
                  {colorLabel && (
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-1">Color: {colorLabel}</p>
                  )}
                  {configurationLabel && (
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-1">Configuration: {configurationLabel}</p>
                  )}
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5">{container.size}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${CONDITION_COLORS[container.condition]}`}>{container.condition}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-2">
                  <p className="text-5xl font-display font-bold text-foreground">${estimate.total.toLocaleString()}</p>
                  {estimate.monthly !== null && (
                    <p className="text-muted-foreground text-sm mt-1">${estimate.monthly.toLocaleString()}/mo × {estimate.months} mo + ${estimate.delivery} delivery</p>
                  )}
                </div>
                <p className="text-xs text-primary font-semibold mb-6">Includes ${estimate.delivery} delivery fee</p>

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
                      <span className="text-muted-foreground">{mode === "purchase" ? "Container" : "Monthly rent"}</span>
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
                    {estimate.genset > 0 && (
                      <div className="flex justify-between px-4 py-2.5">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Zap className="h-3 w-3 text-primary" /> Genset
                        </span>
                        <span className="font-bold text-primary">+${estimate.genset.toLocaleString()}</span>
                      </div>
                    )}
                    {mode === "rental" && (
                      <div className="flex justify-between px-4 py-2.5 bg-primary/5">
                        <span className="text-muted-foreground">Monthly total</span>
                        <span className="font-bold">${estimate.monthly!.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between px-4 py-2.5">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Truck className="h-3 w-3" /> Delivery fee
                      </span>
                      <span className="font-bold">${estimate.delivery.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between px-4 py-2.5 font-bold bg-card">
                      <span>All-in total</span>
                      <span>${estimate.total.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Delivery summary */}
                {selectedState && (
                  <div className="mb-5 p-3 border border-border bg-background/50 flex items-center gap-3">
                    <Truck className={`h-4 w-4 flex-shrink-0 ${delivery.color}`} />
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider ${delivery.color}`}>{delivery.days}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{selectedState}{zipCode ? ` ${zipCode}` : ""}</p>
                    </div>
                  </div>
                )}

                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  Estimates are indicative. Final pricing depends on site-specific requirements.
                </p>

                <button
                  data-testid="cta-get-formal-quote"
                  onClick={goToFormalQuote}
                  className="flex w-full h-12 items-center justify-center gap-2 bg-primary text-primary-foreground font-bold uppercase tracking-wider hover:bg-primary/90 transition-all text-sm"
                >
                  Get a Formal Quote <ArrowRight className="h-4 w-4" />
                </button>

                <div className="mt-4 pt-4 border-t border-border space-y-1.5">
                  {[
                    "No commitment required",
                    "Response within 24 hours",
                    "Min. delivery 3 business days",
                    "Nationwide delivery available",
                  ].map(t => (
                    <div key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-primary flex-shrink-0" /> {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating inquiry widget */}
      <InquiryWidget
        containerLabel={container.label}
        colorLabel={colorLabel || configurationLabel}
        totalPrice={estimate.total}
        deliveryState={selectedState}
        deliveryZip={zipCode}
        mode={mode}
      />
    </div>
  );
}
