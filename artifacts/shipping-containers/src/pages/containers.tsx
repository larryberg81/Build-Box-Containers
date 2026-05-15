import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const products = [
  { id: 1, name: "20' Standard Storage", size: "20'L x 8'W x 8.5'H", category: "Storage", image: "/images/product-20ft.png", price: "From $2,800" },
  { id: 2, name: "40' Standard Storage", size: "40'L x 8'W x 8.5'H", category: "Storage", image: "/images/product-40ft.png", price: "From $3,900" },
  { id: 3, name: "40' High Cube", size: "40'L x 8'W x 9.5'H", category: "Storage", image: "/images/product-40ft.png", price: "From $4,500" },
  { id: 4, name: "Retail Pop-up Box", size: "20'L x 8'W x 8.5'H", category: "Modified", image: "/images/product-retail.png", price: "Custom Quote" },
  { id: 5, name: "Jobsite Office", size: "20'L x 8'W x 8.5'H", category: "Modified", image: "/images/product-modular.png", price: "Custom Quote" },
  { id: 6, name: "Modular Multi-unit", size: "Custom", category: "Modular", image: "/images/product-modular.png", price: "Custom Quote" },
];

export default function Containers() {
  return (
    <div className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">Inventory</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Browse our selection of standard and modified shipping containers. 
            Available for purchase or short-term rental.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group border border-border bg-card flex flex-col">
              <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  {product.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-display font-bold uppercase mb-2">{product.name}</h3>
                <div className="text-sm text-muted-foreground mb-6 font-mono">{product.size}</div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="font-bold">{product.price}</div>
                  <Link href="/contact" className="text-sm font-bold text-primary uppercase tracking-wider hover:underline">
                    Inquire
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
