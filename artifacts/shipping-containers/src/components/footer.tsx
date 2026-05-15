import { Link } from "wouter";
import { Box } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Box className="h-6 w-6 text-primary" />
              <span className="font-display text-xl font-bold tracking-tight uppercase">IronBox</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Industrial grit meets modern utility. Selling, renting, and modifying the world's most proven structural modules.
            </p>
          </div>
          <div>
            <h3 className="font-display font-semibold mb-4 uppercase tracking-wider text-sm">Products</h3>
            <ul className="flex flex-col gap-2">
              <li><Link href="/containers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Storage Containers</Link></li>
              <li><Link href="/containers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Modified Containers</Link></li>
              <li><Link href="/containers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pop-up Retail</Link></li>
              <li><Link href="/containers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Modular Buildings</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold mb-4 uppercase tracking-wider text-sm">Company</h3>
            <ul className="flex flex-col gap-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold mb-4 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>1-800-IRONBOX</li>
              <li>sales@ironbox.com</li>
              <li>100 Industrial Parkway<br />Detroit, MI 48209</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} IronBox Containers. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
