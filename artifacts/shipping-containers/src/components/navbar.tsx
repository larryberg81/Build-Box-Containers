import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Box, Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/containers", label: "Containers" },
  { href: "/gensets", label: "Gensets" },
  { href: "/projects", label: "Projects" },
  { href: "/availability", label: "Availability" },
  { href: "/resources", label: "Resources" },
  { href: "/quote", label: "Quote" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link href="/" onClick={close} className="flex items-center gap-2 flex-shrink-0">
            <Box className="h-6 w-6 text-primary" />
            <span className="font-display text-lg md:text-xl font-bold tracking-tight uppercase">Built Box Containers</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex gap-6">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  location === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + mobile burger */}
          <div className="flex items-center gap-3">
            <Link
              href="/quote"
              className="hidden lg:inline-flex h-9 items-center justify-center bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors uppercase tracking-wider"
            >
              Get a Quote
            </Link>

            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setMenuOpen(v => !v)}
              className="lg:hidden flex items-center justify-center w-9 h-9 border border-border bg-card hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
          onClick={close}
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={`fixed top-16 right-0 z-50 h-[calc(100dvh-4rem)] w-72 bg-card border-l border-border flex flex-col transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col divide-y divide-border flex-1 overflow-y-auto">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              data-testid={`mobile-nav-${link.label.toLowerCase()}`}
              className={`flex items-center justify-between px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                location === link.href
                  ? "text-primary bg-primary/5"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            href="/quote"
            onClick={close}
            className="flex w-full h-12 items-center justify-center bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  );
}
