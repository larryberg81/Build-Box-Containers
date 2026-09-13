import { useEffect } from "react";
import { useLocation } from "wouter";

const SITE_URL = "https://builtboxcontainer.com";
const DEFAULT_IMAGE = `${SITE_URL}/images/hero.png`;

const ROUTE_SEO: Record<string, { title: string; description: string; robots?: string }> = {
  "/": {
    title: "Shipping Containers for Sale & Rent | Built Box",
    description: "Buy, rent, or modify new and used shipping containers, refrigerated containers, high cubes, and modular container solutions from Built Box.",
  },
  "/containers": {
    title: "Shipping Containers for Sale & Rent | Built Box",
    description: "Browse new, used, high-cube, refrigerated, side-door, heated, and capsule shipping containers with transparent pricing and nationwide delivery.",
  },
  "/gensets": {
    title: "Reefer Container Gensets for Sale | Built Box",
    description: "Shop 15 kW underslung reefer container gensets from Carrier, Thermo King, Clip-On, and other trusted brands. Request a delivered quote today.",
  },
  "/projects": {
    title: "Shipping Container Projects & Modifications | Built Box",
    description: "Explore shipping container conversions for retail, construction, residential, storage, industrial, and cold-chain applications.",
  },
  "/availability": {
    title: "Shipping Container Availability Near You | Built Box",
    description: "Check shipping container inventory across our depot network, compare local stock, and request fast delivery from a location near your project.",
  },
  "/resources": {
    title: "Shipping Container Guides & Resources | Built Box",
    description: "Learn how to buy, rent, maintain, and modify shipping containers with practical guides covering reefers, gensets, storage, and modular builds.",
  },
  "/contact": {
    title: "Contact Built Box Containers | Sales & Rentals",
    description: "Contact Built Box Containers for container sales, rentals, modifications, delivery questions, and custom project support.",
  },
  "/quote": {
    title: "Shipping Container Quote Calculator | Built Box",
    description: "Build a shipping container quote by selecting a model, color, configuration, delivery location, and optional modifications.",
    robots: "noindex, follow",
  },
};

function setMeta(selector: string, attribute: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    const [key, name] = attribute === "property"
      ? ["property", selector.match(/property="(.+?)"/)?.[1]]
      : ["name", selector.match(/name="(.+?)"/)?.[1]];
    if (name) element.setAttribute(key, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

export function Seo() {
  const [location] = useLocation();

  useEffect(() => {
    const path = location === "/" ? "/" : location.replace(/\/+$/, "");
    const seo = ROUTE_SEO[path] ?? {
      title: "Built Box Containers | Shipping Container Solutions",
      description: "Shipping container sales, rentals, modifications, reefer equipment, and nationwide delivery from Built Box Containers.",
      robots: "noindex, follow",
    };
    const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;

    document.title = seo.title;
    setMeta('meta[name="description"]', "name", seo.description);
    setMeta('meta[name="robots"]', "name", seo.robots ?? "index, follow");
    setMeta('meta[property="og:title"]', "property", seo.title);
    setMeta('meta[property="og:description"]', "property", seo.description);
    setMeta('meta[property="og:url"]', "property", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", DEFAULT_IMAGE);
    setMeta('meta[name="twitter:title"]', "name", seo.title);
    setMeta('meta[name="twitter:description"]', "name", seo.description);
    setMeta('meta[name="twitter:image"]', "name", DEFAULT_IMAGE);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [location]);

  return null;
}