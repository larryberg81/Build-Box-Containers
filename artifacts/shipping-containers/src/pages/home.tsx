import { Link } from "wouter";
import { ArrowRight, Box, Shield, Zap, Wrench } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="Built Box Containers" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center max-w-4xl mt-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-white uppercase mb-6 leading-none">
            Built to <span className="text-primary">Last.</span><br />
            Built for <span className="text-primary">You.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium">
            Industrial grit meets modern utility. We sell, rent, and modify shipping containers for storage, construction, and modular builds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/containers" className="inline-flex h-12 items-center justify-center bg-primary px-8 text-base font-bold text-primary-foreground hover:bg-primary/90 transition-all uppercase tracking-wider">
              View Inventory
            </Link>
            <Link href="/quote" className="inline-flex h-12 items-center justify-center border-2 border-border bg-background/50 backdrop-blur-sm px-8 text-base font-bold text-foreground hover:bg-secondary transition-all uppercase tracking-wider">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="border-y border-border bg-card py-8">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-center text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-6">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Mock logos */}
            <div className="font-display font-bold text-xl uppercase tracking-widest">Turner Const.</div>
            <div className="font-display font-bold text-xl uppercase tracking-widest">Apex Dev</div>
            <div className="font-display font-bold text-xl uppercase tracking-widest">BuildCo</div>
            <div className="font-display font-bold text-xl uppercase tracking-widest">Struktur</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4">The Built Box Advantage</h2>
            <p className="text-muted-foreground text-lg">We don't just sell steel boxes. We provide structurally sound, highly versatile solutions for serious projects.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-border bg-card hover:border-primary/50 transition-colors">
              <Shield className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-xl font-display font-bold uppercase mb-3">Indestructible</h3>
              <p className="text-muted-foreground">Made from corten steel. Wind, water, and rodent tight. Built to withstand the harshest environments on earth.</p>
            </div>
            <div className="p-8 border border-border bg-card hover:border-primary/50 transition-colors">
              <Wrench className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-xl font-display font-bold uppercase mb-3">Fully Custom</h3>
              <p className="text-muted-foreground">Need doors, windows, HVAC, or electrical? Our fabrication team modifies containers to your exact specs.</p>
            </div>
            <div className="p-8 border border-border bg-card hover:border-primary/50 transition-colors">
              <Zap className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-xl font-display font-bold uppercase mb-3">Rapid Deploy</h3>
              <p className="text-muted-foreground">Delivered directly to your site. No complex foundations, no long construction times. Drop and go.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4">Our Fleet</h2>
              <p className="text-muted-foreground text-lg">From raw storage to fully finished modular spaces.</p>
            </div>
            <Link href="/containers" className="inline-flex items-center text-primary font-bold uppercase tracking-wider hover:text-primary/80 transition-colors">
              See All Models <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Standard 20ft", image: "/images/product-20ft.png", desc: "The industry standard for secure storage." },
              { title: "Standard 40ft", image: "/images/product-40ft.png", desc: "Maximum capacity for major projects." },
              { title: "Pop-up Retail", image: "/images/product-retail.png", desc: "Modified for cafes, bars, and shops." },
              { title: "Modular Office", image: "/images/product-modular.png", desc: "Climate-controlled workspace anywhere." },
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer border border-border bg-background overflow-hidden relative">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-display font-bold uppercase mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6">Ready to Build?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Tell us about your project. Our container experts will help you find the right box and the right modifications.
          </p>
          <Link href="/contact" className="inline-flex h-14 items-center justify-center bg-background px-10 text-lg font-bold text-primary hover:bg-background/90 transition-all uppercase tracking-wider shadow-xl">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
