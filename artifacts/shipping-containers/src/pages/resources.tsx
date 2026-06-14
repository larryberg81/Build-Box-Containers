import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  featured?: boolean;
  body: string[];
}

const ARTICLES: Article[] = [
  {
    id: "buying-guide",
    title: "The Complete Shipping Container Buying Guide",
    category: "Buying Advice",
    readTime: "8 min read",
    date: "Apr 28, 2026",
    image: "/images/blog-buying-guide.png",
    featured: true,
    excerpt: "New to shipping containers? This guide covers everything from grades and sizes to delivery logistics and site prep — so you don't pay for surprises.",
    body: [
      "Buying a shipping container is one of the most cost-effective ways to get a durable, weather-tight structure on your property. But the market has a lot of jargon, and a few wrong turns can cost you thousands. Here's what you need to know.",
      "**Container Grades Explained.** Containers are graded by condition. New (One-Trip) units have only carried a single shipment from a factory — they're as close to factory-fresh as you'll find in the used market. Grade A (Wind & Watertight, or WWT) containers are structurally sound with no holes, but will have cosmetic rust and dents from years of use. Grade B (Used/AS-IS) containers are cheaper but may need repairs — always inspect these in person or request photos.",
      "**Size Selection.** 20ft is the sweet spot for most buyers — it fits in a standard driveway without requiring a permit in most municipalities, and the 160 sq ft interior handles serious amounts of cargo. Go 40ft if you need maximum volume or plan to convert. High Cube adds a critical extra foot of headroom for any conversion involving HVAC, ceilings, or standing shelving.",
      "**Delivery & Site Prep.** Containers are delivered by tilt-bed truck. You'll need a flat, firm surface — gravel, asphalt, concrete, or compacted dirt. Clear 5ft on all sides for the truck to maneuver. If you're on a slope, cross-members or concrete blocks level the floor. Check local ordinances: some counties require a permit for containers over 200 sq ft or on residential land.",
      "**What to inspect.** Always check: roof seams for rust-through, floor boards for soft spots or rot, door seals and locking rods, and the condition of the corner castings. A container in good structural shape can have heavy cosmetic rust and still serve you for 25+ years.",
    ],
  },
  {
    id: "reefer-guide",
    title: "Reefer Containers: Cold Storage Without the Building",
    category: "Reefer",
    readTime: "6 min read",
    date: "May 3, 2026",
    image: "/images/blog-reefer-guide.png",
    excerpt: "Refrigerated shipping containers are one of the most versatile cold-storage tools available. Here's how they work, what they cost, and who should use one.",
    body: [
      "A reefer container is essentially a portable cold room. The refrigeration unit — typically a ThermoKing or Carrier machine — is integrated into the front wall and runs off 3-phase shore power. Temperature range is typically -25°C to +25°C, which covers everything from frozen food to fresh produce to pharmaceuticals.",
      "**Power Requirements.** Reefers run on 460V, 3-phase, 60Hz power at around 32A. Most industrial sites and commercial properties have this available. Residential properties typically do not — you'd need a transformer or generator to run one at home. Always confirm power availability before ordering.",
      "**Who Uses Reefers?** Food distributors and caterers are the most common buyer, but we also supply reefers to florists, pharmaceutical companies, event companies (for outdoor events without kitchen infrastructure), breweries, and research facilities.",
      "**Buying vs. Renting.** If your need is seasonal or project-specific, rent. If you're running a permanent operation, buying is almost always cheaper within 18 months. A 20ft reefer purchase at $5,800 breaks even against rental at $320/mo in under 19 months.",
      "**Maintenance.** Reefers require periodic service — refrigerant checks, condenser cleaning, and door seal inspection. Built Box Containers includes a monthly maintenance check with all reefer rentals. For purchased units, we offer annual service contracts.",
    ],
  },
  {
    id: "modifications-guide",
    title: "What Can You Actually Do to a Shipping Container?",
    category: "Modifications",
    readTime: "7 min read",
    date: "Apr 15, 2026",
    image: "/images/blog-modifications.png",
    excerpt: "From a simple roll-up door to a full HVAC office build-out — here's a realistic look at what modifications are possible, what they cost, and how long they take.",
    body: [
      "Shipping containers are incredibly modification-friendly. The corten steel construction means you can cut, weld, bolt, and frame without compromising structural integrity — as long as you respect the corner posts, which carry all the load.",
      "**Common modifications and typical costs.** Roll-up doors ($500–$750) allow forklift access and open the container fully for retail use. Personnel doors ($350–$600) are standard man-doors with a frame and lock. Windows ($300–$600 each) come security-barred and framed. HVAC ($1,500–$2,500 installed) creates climate-controlled space. Electrical packages ($1,000–$2,000) include panel, wiring, outlets, and LED lighting. Spray foam insulation ($800–$1,500) eliminates condensation and dramatically improves thermal performance.",
      "**The 'no-cut zones.'** The four corner posts are load-bearing. Any modification that removes or weakens them requires structural reinforcement — this is non-trivial and adds cost. Roof penetrations (for skylights or HVAC vents) need to be properly flashed. Floor cutting for drainage or utilities needs to be planned before insulation.",
      "**Timeline.** A simple modification (door, electrical) takes 1–2 weeks in our fabrication shop. A full office or retail build-out is 4–8 weeks depending on scope. We handle all fabrication in-house.",
      "**Our advice.** Over-spec your modification slightly. Adding HVAC rough-in now is far cheaper than retrofitting later. Plan your electrical load before the panel gets sized.",
    ],
  },
  {
    id: "modular-building",
    title: "Building with Containers: What Architects Won't Tell You",
    category: "Modular Builds",
    readTime: "9 min read",
    date: "Mar 30, 2026",
    image: "/images/blog-modular-building.png",
    excerpt: "Container architecture looks effortless in renderings. The reality involves engineering, planning, and decisions that most guides skip. Here's the honest picture.",
    body: [
      "Container buildings have captured the imagination of architects, developers, and DIYers alike — and for good reason. The structure is already built. The material cost is dramatically lower than timber or concrete. And the look is undeniably striking.",
      "**The engineering reality.** Stacking containers requires proper engineering. The corner posts handle vertical loads well — up to 300 tons stacked — but you can't cantilever a container off the side of another without serious steel reinforcement. Any opening you cut in a container's side wall reduces its rigidity. A structural engineer is not optional for any multi-story or extensively modified build.",
      "**Planning and permitting.** Most jurisdictions classify container buildings as permanent structures once they have a foundation. That triggers building permits, inspections, and potentially zoning review. Some areas explicitly restrict container buildings in residential zones. Do your homework before you buy — it's much harder to undo.",
      "**Foundation options.** Pier foundations (concrete piers at corner castings) are the simplest and cheapest. Slab foundations work for larger footprints. Some builders use steel frame systems that allow the containers to be relocated later — ideal for commercial or temporary applications.",
      "**The honest cost picture.** Container builds are not cheap when you account for engineering, modification, insulation, utilities, and finishes. They are competitive with traditional construction and often faster to deploy, but the 'it's just a box' assumption will leave you short on budget. Plan for $80–$150/sq ft for a finished container build depending on spec.",
    ],
  },
  {
    id: "genset-guide",
    title: "Underslung Gensets: Powering Reefers Without Shore Power",
    category: "Gensets",
    readTime: "7 min read",
    date: "Jun 10, 2026",
    image: "/images/blog-genset-guide.png",
    excerpt: "What is an underslung genset, how does it mount, and which brand is right for your fleet? A plain-English guide to the 15 kW / 18.75 kVA standard and the four brands we carry.",
    body: [
      "If you're running a reefer container on the road without access to shore power, an underslung genset is the solution. It mounts permanently to the trailer chassis beneath the container, powering the reefer unit continuously from its own diesel engine and onboard fuel tank — no external cables, no power hookups, no problem.",
      "**What does 'underslung' mean?** The unit bolts directly to the ISO corner castings on the underside of the trailer frame. It lives beneath the container, completely out of the way, and travels with the chassis. When you swap containers, the genset stays on the trailer. This makes it ideal for fleet operators running the same trailers continuously.",
      "**The 15 kW / 18.75 kVA standard.** Almost every underslung genset on the market — Carrier, Thermo King, Phasebox, Karlier — produces 15 kW prime (18.75 kVA) at 60 Hz and 12.5 kW (15.6 kVA) at 50 Hz. The reason: a reefer container's actual power draw is 6.5–7.5 kW under normal operating conditions. The 15 kW output provides a comfortable headroom margin for startup spikes and cold-ambient conditions.",
      "**Engine brands and what they mean.** The engine is the most important differentiator. Perkins (used by Carrier) and Yanmar (used by Thermo King) are the established workhorses — proven in millions of hours of field use, with global service networks. Mitsubishi's S4L2 (used by Phasebox) is newer to underslung applications but meets EPA Tier 4 Final — the stricter standard required in California (CARB) and port-restricted zones. Cummins (Karlier KP-15C) offers strong North American service coverage at a competitive price.",
      "**Fuel tank size and runtime.** Standard tanks are 50 US gallons (189 L), giving 72–80 hours of continuous runtime. Extended tanks at 58–68 US gallons push runtime past 100 hours — equivalent to 600+ km of road transport without refueling. If you're running long cross-border routes, specify the extended tank at the time of order.",
      "**Cycle-run mode.** Most modern units support cycle-run operation, where the genset starts and stops automatically based on the reefer unit's load demand. In moderate ambient temperatures with a stable product load, cycle-run can reduce fuel consumption by 30–40%. The APX+ (Carrier) and SmartPower+ (Thermo King) controllers both support this.",
      "**Emissions: Tier 3 vs. Tier 4 Final.** Most underslung gensets are EPA Tier 3 certified — sufficient for all U.S. states except California and for most port zones. If you operate in California or in CARB-restricted port areas, you'll need EPA Tier 4 Final certification. Currently, only the Phasebox PB-15 Tier4 in our lineup meets this standard. Plan accordingly if your routes cross into California.",
      "**Carrier vs. Thermo King: the real difference.** Both brands produce virtually identical output and reliability. The main practical differences: Carrier uses Perkins engines (lighter at ~1,370 lbs), Thermo King uses Yanmar (heavier at ~1,495 lbs but with a robust welded crash-rated frame). Carrier's APX+ controller has a slight edge in cloud connectivity; Thermo King's SmartPower+ has a longer service network in rural North America. For most buyers, price and existing service relationships are the deciding factor.",
      "**What we supply and how we install it.** Built Box Containers supplies Carrier, Thermo King, Phasebox, and Karlier underslung units. We can mount and test any genset before delivery. If you're ordering a genset alongside a reefer container, we'll configure and test the complete system — power output, auto-start function, and fuel tank — before the unit leaves our facility.",
    ],
  },
  {
    id: "maintenance-guide",
    title: "Container Maintenance: 5 Things That Actually Matter",
    category: "Maintenance",
    readTime: "5 min read",
    date: "Mar 12, 2026",
    image: "/images/blog-maintenance.png",
    excerpt: "Shipping containers are built to be low-maintenance — but a few annual checks will keep yours watertight and structurally sound for decades.",
    body: [
      "A well-maintained shipping container can last 25–30 years. Neglect the basics and surface rust becomes structural rust in a wet climate within a decade. Here's what actually matters.",
      "**1. Inspect and treat the roof annually.** The roof is the most vulnerable area. Surface rust that goes unaddressed becomes rust-through. Wire-brush any bubbled areas and apply a rust-inhibiting primer + topcoat. A full re-roof with liquid rubber membrane adds 15+ years.",
      "**2. Keep the doors working.** The locking rods and hinges are the most mechanically complex parts of a container. Grease the locking rod cams and door hinges twice a year. If a door starts to bind, address it immediately — a warped door is much harder to fix than a stiff one.",
      "**3. Clear the floor drains and vents.** Containers have floor drainage holes and louvered vents that get blocked by debris, nest materials, and rust flakes. Clear these annually to prevent condensation buildup — the leading cause of cargo damage.",
      "**4. Check the floor boards.** Hardwood container floors (typically bamboo or pine) are vulnerable to moisture from below. If you see soft spots or discoloration, investigate immediately. Floor replacement is manageable; structural floor rail repair is expensive.",
      "**5. Paint is protection, not cosmetic.** Corten steel is designed to form a stable rust layer, but that protective layer only works properly in dry climates. In humid or coastal environments, painted containers outlast unpainted ones by 10+ years. A full rattle-can respray with industrial primer and topcoat is a weekend job worth doing every 5 years.",
    ],
  },
];

const CATEGORIES = ["All", "Buying Advice", "Reefer", "Gensets", "Modifications", "Modular Builds", "Maintenance"];

function ArticleBody({ body }: { body: string[] }) {
  return (
    <div className="space-y-5">
      {body.map((para, i) => {
        // Bold markdown-style **text**
        const parts = para.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-muted-foreground leading-relaxed">
            {parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j} className="text-foreground font-semibold">{part}</strong> : part
            )}
          </p>
        );
      })}
    </div>
  );
}

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openArticle, setOpenArticle] = useState<Article | null>(null);

  const filtered = activeCategory === "All"
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  const featured = filtered.find(a => a.featured) ?? filtered[0];
  const rest = filtered.filter(a => a.id !== featured?.id);

  return (
    <div className="bg-background min-h-screen pt-16">
      {/* Header */}
      <section className="border-b border-border bg-card py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <p className="text-primary text-sm font-bold tracking-widest uppercase mb-3">Knowledge Base</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">Resources</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Buying guides, modification breakdowns, reefer specs, and maintenance advice — straight from the field.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-border bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex gap-1 overflow-x-auto py-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                data-testid={`resource-filter-${cat.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl py-12">
        {/* Featured Article */}
        {featured && (
          <button
            data-testid={`article-featured-${featured.id}`}
            onClick={() => setOpenArticle(featured)}
            className="w-full text-left group border border-border bg-card overflow-hidden mb-10 hover:border-primary/50 transition-all"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[16/10] md:aspect-auto overflow-hidden relative bg-muted">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                  Featured
                </span>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-primary text-xs font-bold uppercase tracking-widest mb-3">{featured.category}</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold uppercase leading-tight mb-4">{featured.title}</h2>
                <p className="text-muted-foreground mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.readTime}</span>
                </div>
                <div className="mt-6 flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </button>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(article => (
            <button
              key={article.id}
              data-testid={`article-card-${article.id}`}
              onClick={() => setOpenArticle(article)}
              className="text-left group border border-border bg-card overflow-hidden hover:border-primary/50 transition-all relative"
            >
              <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                  {article.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-display font-bold uppercase leading-tight mb-3">{article.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Article Lightbox */}
      {openArticle && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
          onClick={() => setOpenArticle(null)}
        >
          <div
            className="max-w-3xl mx-auto my-8 px-4"
            onClick={e => e.stopPropagation()}
          >
            <button
              data-testid="article-close"
              onClick={() => setOpenArticle(null)}
              className="mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              ← Back to Resources
            </button>
            <div className="bg-card border border-border overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img src={openArticle.image} alt={openArticle.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="text-primary font-bold uppercase tracking-widest">{openArticle.category}</span>
                  <span>{openArticle.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {openArticle.readTime}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold uppercase leading-tight mb-6">{openArticle.title}</h1>
                <p className="text-lg text-muted-foreground mb-8 pb-8 border-b border-border font-medium">{openArticle.excerpt}</p>
                <ArticleBody body={openArticle.body} />
                <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/quote"
                    onClick={() => setOpenArticle(null)}
                    className="inline-flex h-12 items-center justify-center bg-primary px-8 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all uppercase tracking-wider"
                  >
                    Get an Instant Quote
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setOpenArticle(null)}
                    className="inline-flex h-12 items-center justify-center border-2 border-border px-8 text-sm font-bold hover:bg-muted transition-all uppercase tracking-wider"
                  >
                    Talk to an Expert
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
