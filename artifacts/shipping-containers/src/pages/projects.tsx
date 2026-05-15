import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, X } from "lucide-react";

const PROJECTS = [
  {
    id: "popup-cafe",
    title: "The Grind — Pop-Up Café",
    category: "Retail",
    location: "Austin, TX",
    size: "20 ft",
    mods: ["Roll-up Door", "Electrical Package", "Custom Paint", "Service Window"],
    desc: "A fully operational espresso bar built inside a single 20ft container. Deployed in under a week, now a permanent fixture on South Congress Ave. The roll-up front panel doubles as a weather canopy over the service counter.",
    image: "/images/project-popup-cafe.png",
  },
  {
    id: "site-office",
    title: "Apex Build — Site Office",
    category: "Construction",
    location: "Dallas, TX",
    size: "40 ft",
    mods: ["HVAC Unit", "Electrical Package", "Windows (x2)", "Spray Foam Insulation"],
    desc: "Deployed across four active project sites over 18 months. Climate-controlled, fully wired with data ports and LED task lighting. Relocates to the next site in a single crane pick.",
    image: "/images/project-site-office.png",
  },
  {
    id: "modular-home",
    title: "Desert Stack — Modular Home",
    category: "Residential",
    location: "Tucson, AZ",
    size: "2 × 40 ft High Cube",
    mods: ["HVAC Unit", "Electrical Package", "Windows (x2)", "Spray Foam Insulation", "Custom Paint"],
    desc: "Two stacked 40ft High Cubes, connected by an interior staircase, forming a 640 sq ft off-grid capable home. Engineered floor-to-ceiling glazing on the south face. Built and delivered in 11 weeks.",
    image: "/images/project-modular-home.png",
  },
  {
    id: "retail-unit",
    title: "Forma — Boutique Retail",
    category: "Retail",
    location: "Nashville, TN",
    size: "20 ft",
    mods: ["Roll-up Door", "Electrical Package", "Interior Shelving", "Custom Paint"],
    desc: "A clothing boutique designed to pop up at markets and festivals. The full-width roll-up door opens the container completely. Interior shelving and track lighting installed in one IronBox fabrication run.",
    image: "/images/project-retail-unit.png",
  },
  {
    id: "storage-yard",
    title: "SecureStore Fleet — Long-Term Storage",
    category: "Storage",
    location: "Phoenix, AZ",
    size: "20 ft & 40 ft",
    mods: ["Custom Paint", "Vents (x4)"],
    desc: "A 22-unit fleet delivered and positioned to spec for a self-storage operator. All containers painted to brand spec in IronBox's facility. Ventilated for long-term contents storage in a high-heat climate.",
    image: "/images/project-storage-yard.png",
  },
  {
    id: "workshop",
    title: "CraftWorks Studio — Maker Workshop",
    category: "Industrial",
    location: "Portland, OR",
    size: "40 ft",
    mods: ["Electrical Package", "Interior Shelving", "Vents (x4)", "Roll-up Door"],
    desc: "A fully equipped fabrication workshop for a small manufacturing startup. 200A electrical service, heavy-duty racking, and four louvered vents keep the space cool during long production runs.",
    image: "/images/project-workshop.png",
  },
];

const CATEGORIES = ["All", "Retail", "Construction", "Residential", "Storage", "Industrial"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxProject, setLightboxProject] = useState<typeof PROJECTS[0] | null>(null);

  const filtered = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="bg-background min-h-screen pt-16">
      {/* Page Header */}
      <section className="border-b border-border bg-card py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <p className="text-primary text-sm font-bold tracking-widest uppercase mb-3">Built by IronBox</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">
            Project Showcase
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Real containers. Real projects. From pop-up cafés to modular homes — see what's possible when serious steel meets serious vision.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="border-b border-border bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                data-testid={`filter-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
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

      {/* Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => (
              <button
                key={project.id}
                data-testid={`project-card-${project.id}`}
                onClick={() => setLightboxProject(project)}
                className="group text-left border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 relative"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-300" />
                  {/* Category badge */}
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                    {project.category}
                  </span>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-display font-bold uppercase leading-tight">{project.title}</h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs text-muted-foreground font-semibold tracking-wider uppercase mb-3">
                    {project.location} &mdash; {project.size}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.desc}</p>

                  {/* Mod tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.mods.slice(0, 3).map(mod => (
                      <span key={mod} className="text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 border border-border">
                        {mod}
                      </span>
                    ))}
                    {project.mods.length > 3 && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 border border-border">
                        +{project.mods.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              <p className="text-lg font-display font-bold uppercase">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4">
            Your Project Could Be Next
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Every build starts with a conversation. Tell us what you're trying to create and we'll make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              data-testid="cta-get-quote"
              className="inline-flex h-12 items-center justify-center bg-primary px-8 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all uppercase tracking-wider"
            >
              Get an Instant Quote
            </Link>
            <Link
              href="/contact"
              data-testid="cta-contact"
              className="inline-flex h-12 items-center justify-center border-2 border-border bg-background px-8 text-sm font-bold text-foreground hover:bg-secondary transition-all uppercase tracking-wider"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxProject && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxProject(null)}
        >
          <div
            className="bg-card border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              data-testid="lightbox-close"
              onClick={() => setLightboxProject(null)}
              className="absolute top-4 right-4 z-10 bg-background border border-border p-2 hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="aspect-video w-full overflow-hidden">
              <img
                src={lightboxProject.image}
                alt={lightboxProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1 flex-shrink-0 mt-1">
                  {lightboxProject.category}
                </span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold uppercase leading-tight">
                    {lightboxProject.title}
                  </h2>
                  <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase mt-1">
                    {lightboxProject.location} &mdash; {lightboxProject.size}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">{lightboxProject.desc}</p>

              <div className="border-t border-border pt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Modifications Included</p>
                <div className="flex flex-wrap gap-2">
                  {lightboxProject.mods.map(mod => (
                    <span key={mod} className="text-xs font-semibold uppercase tracking-wider bg-muted text-foreground px-3 py-1.5 border border-border">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Link
                  href="/quote"
                  onClick={() => setLightboxProject(null)}
                  className="inline-flex h-11 items-center justify-center bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all uppercase tracking-wider"
                >
                  Price This Build
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setLightboxProject(null)}
                  className="inline-flex h-11 items-center justify-center border-2 border-border px-6 text-sm font-bold hover:bg-muted transition-all uppercase tracking-wider"
                >
                  Talk to Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
