import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Box className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold tracking-tight uppercase">Built Box Containers</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link href="/containers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Containers</Link>
          <Link href="/projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
          <Link href="/availability" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Availability</Link>
          <Link href="/quote" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Quote</Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/quote" className="hidden md:inline-flex h-9 items-center justify-center bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors uppercase tracking-wider">
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
