import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Thermometer, Flame, DoorOpen, ShieldCheck, Truck, ClipboardCheck, Scale, X } from "lucide-react";

interface Container {
  id: string;
  name: string;
  condition: "Used" | "One-Trip";
  type: "Standard" | "Modified" | "Heated" | "Reefer";
  category: string;
  size: string;
  extDimensions: string;
  intDimensions: string;
  doorOpening?: string;
  payload: string;
  volume: string;
  price: string;
  rentPrice?: string;
  image: string;
  gallery?: string[];
  colorOptions?: ContainerColor[];
  configurationOptions?: ContainerConfiguration[];
  badge?: string;
  features: string[];
  desc: string;
}

interface ContainerColor {
  id: string;
  name: string;
  hex: string;
  image: string;
  gallery: string[];
}

interface ContainerConfiguration {
  id: string;
  name: string;
  image: string;
  gallery: string[];
}

const HIGH_CUBE_20_COLORS: ContainerColor[] = [
  {
    id: "gray",
    name: "Gray",
    hex: "#7b858d",
    image: "/images/container-20-hc-gray-angle-right.jpg",
    gallery: [
      "/images/container-20-hc-gray-angle-right.jpg",
      "/images/container-20-hc-gray-doors.jpg",
      "/images/container-20-hc-gray-angle.jpg",
      "/images/container-20-hc-gray-end.jpg",
      "/images/container-20-hc-gray-angle-left.jpg",
      "/images/container-20-hc-gray-open-wide-final.jpg",
    ],
  },
  {
    id: "blue",
    name: "Blue",
    hex: "#075fc4",
    image: "/images/container-20-hc-blue-angle-right-alt-angle.jpg",
    gallery: [
      "/images/container-20-hc-blue-angle-right-alt-angle.jpg",
      "/images/container-20-hc-blue-doors-alt-angle.jpg",
      "/images/container-20-hc-blue-angle-alt-angle.jpg",
      "/images/container-20-hc-blue-end-alt-angle.jpg",
      "/images/container-20-hc-blue-angle-left-alt-angle.jpg",
      "/images/container-20-hc-blue-open-wide-final-alt-angle.jpg",
    ],
  },
  {
    id: "beige",
    name: "Beige",
    hex: "#c8b99d",
    image: "/images/container-20-hc-beige-angle-right-alt-angle.jpg",
    gallery: [
      "/images/container-20-hc-beige-angle-right-alt-angle.jpg",
      "/images/container-20-hc-beige-doors-alt-angle.jpg",
      "/images/container-20-hc-beige-angle-alt-angle.jpg",
      "/images/container-20-hc-beige-end-alt-angle.jpg",
      "/images/container-20-hc-beige-angle-left-alt-angle.jpg",
      "/images/container-20-hc-beige-open-wide-final-alt-angle.jpg",
    ],
  },
  {
    id: "green",
    name: "Dark Green",
    hex: "#0e503c",
    image: "/images/container-20-hc-green-angle-right-alt-angle.jpg",
    gallery: [
      "/images/container-20-hc-green-angle-right-alt-angle.jpg",
      "/images/container-20-hc-green-doors-alt-angle.jpg",
      "/images/container-20-hc-green-angle-alt-angle.jpg",
      "/images/container-20-hc-green-end-alt-angle.jpg",
      "/images/container-20-hc-green-angle-left-alt-angle.jpg",
      "/images/container-20-hc-green-open-wide-final-alt-angle.jpg",
    ],
  },
  {
    id: "red",
    name: "Red",
    hex: "#9f332f",
    image: "/images/container-20-hc-red-angle-right-alt-angle.jpg",
    gallery: [
      "/images/container-20-hc-red-angle-right-alt-angle.jpg",
      "/images/container-20-hc-red-doors-alt-angle.jpg",
      "/images/container-20-hc-red-angle-alt-angle.jpg",
      "/images/container-20-hc-red-end-alt-angle.jpg",
      "/images/container-20-hc-red-angle-left-alt-angle.jpg",
      "/images/container-20-hc-red-open-wide-final-alt-angle.jpg",
    ],
  },
];

const STANDARD_20_COLORS: ContainerColor[] = [
  {
    id: "orange",
    name: "Orange",
    hex: "#d68713",
    image: "/images/container-20-new-orange-angle.jpg",
    gallery: [
      "/images/container-20-new-orange-angle.jpg",
      "/images/container-20-new-orange-open.jpg",
      "/images/container-20-new-orange-end.jpg",
    ],
  },
  {
    id: "blue",
    name: "Blue",
    hex: "#075fc4",
    image: "/images/container-20-new-blue-angle-alt-angle.jpg",
    gallery: [
      "/images/container-20-new-blue-angle-alt-angle.jpg",
      "/images/container-20-new-blue-open-fixed.jpg",
      "/images/container-20-new-blue-end-alt-angle.jpg",
    ],
  },
  {
    id: "beige",
    name: "Beige",
    hex: "#c9b99a",
    image: "/images/container-20-new-beige-angle-fixed.jpg",
    gallery: [
      "/images/container-20-new-beige-angle-fixed.jpg",
      "/images/container-20-new-beige-open-fixed.jpg",
      "/images/container-20-new-beige-end-fixed.jpg",
    ],
  },
  {
    id: "green",
    name: "Dark Green",
    hex: "#0e503c",
    image: "/images/container-20-new-green-angle-alt-angle.jpg",
    gallery: [
      "/images/container-20-new-green-angle-alt-angle.jpg",
      "/images/container-20-new-green-open-alt-angle.jpg",
      "/images/container-20-new-green-end-alt-angle.jpg",
    ],
  },
  {
    id: "red",
    name: "Red",
    hex: "#9f332f",
    image: "/images/container-20-new-red-angle-alt-angle.jpg",
    gallery: [
      "/images/container-20-new-red-angle-alt-angle.jpg",
      "/images/container-20-new-red-open-alt-angle.jpg",
      "/images/container-20-new-red-end-alt-angle.jpg",
    ],
  },
];

const CONTAINERS: Container[] = [
  // ── 10 FT ──────────────────────────────────────────────────────
  {
    id: "10-used",
    name: "10' Used",
    condition: "Used",
    type: "Standard",
    category: "10 ft",
    size: "10 ft",
    extDimensions: "10'L × 8'W × 8.5'H",
    intDimensions: "9'4\"L × 7'8\"W × 7'10\"H",
    payload: "21,700 lbs",
    volume: "573 cu ft",
    price: "$850",
    rentPrice: "From $95/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-10-used-yard.jpg",
    features: ["Wind & watertight", "Lockbox ready", "Forklift pockets", "Cargo-grade floor"],
    desc: "A compact, battle-tested unit. Light cosmetic wear, fully watertight and structurally sound. Ideal for residential storage and tight urban sites.",
  },
  {
    id: "10-new-side",
    name: "10' New",
    condition: "One-Trip",
    type: "Standard",
    category: "10 ft",
    size: "10 ft",
    extDimensions: "10'L × 8'W × 8.5'H",
    intDimensions: "9'4\"L × 7'8\"W × 7'10\"H",
    payload: "21,700 lbs",
    volume: "573 cu ft",
    price: "$1,200",
    rentPrice: "From $120/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-10-new-blue-open-alt-angle.jpg",
    gallery: ["/images/container-10-new-blue-open-alt-angle.jpg", "/images/container-10-new-blue-side-alt-angle.jpg", "/images/container-10-new-blue-doors-alt-angle.jpg"],
    colorOptions: [
      {
        id: "blue",
        name: "Blue",
        hex: "#075fc4",
        image: "/images/container-10-new-blue-open-alt-angle.jpg",
        gallery: [
          "/images/container-10-new-blue-open-alt-angle.jpg",
          "/images/container-10-new-blue-side-alt-angle.jpg",
          "/images/container-10-new-blue-doors-alt-angle.jpg",
        ],
      },
      {
        id: "beige",
        name: "Beige",
        hex: "#f1f3f2",
        image: "/images/container-10-new-beige-open-alt-angle-v2.jpg",
        gallery: [
          "/images/container-10-new-beige-open-alt-angle-v2.jpg",
          "/images/container-10-new-beige-side-alt-angle.jpg",
          "/images/container-10-new-beige-doors-alt-angle.jpg",
        ],
      },
      {
        id: "green",
        name: "Dark Green",
        hex: "#0e503c",
        image: "/images/container-10-new-green-open-alt-angle.jpg",
        gallery: [
          "/images/container-10-new-green-open-alt-angle.jpg",
          "/images/container-10-new-green-side-alt-angle.jpg",
          "/images/container-10-new-green-doors-alt-angle.jpg",
        ],
      },
      {
        id: "gray",
        name: "Gray",
        hex: "#667481",
        image: "/images/container-10-new-gray-open.jpg",
        gallery: [
          "/images/container-10-new-gray-open.jpg",
          "/images/container-10-new-gray-side.jpg",
          "/images/container-10-new-gray-doors.jpg",
        ],
      },
      {
        id: "red",
        name: "Red",
        hex: "#9f332f",
        image: "/images/container-10-new-red-open-alt-angle.jpg",
        gallery: [
          "/images/container-10-new-red-open-alt-angle.jpg",
          "/images/container-10-new-red-side-alt-angle.jpg",
          "/images/container-10-new-red-doors-alt-angle.jpg",
        ],
      },
    ],
    badge: "New",
    features: ["One-trip condition", "Double cargo doors", "Lockbox ready", "Forklift pockets"],
    desc: "Factory-fresh one-trip unit with clean steel and standard cargo doors — a dependable fit for storage, conversions, and compact sites.",
  },
  {
    id: "10-new-rollup",
    name: "10' New Modified — Roll-up Door",
    condition: "One-Trip",
    type: "Modified",
    category: "10 ft",
    size: "10 ft",
    extDimensions: "10'L × 8'W × 8.5'H",
    intDimensions: "9'4\"L × 7'8\"W × 7'10\"H",
    payload: "21,700 lbs",
    volume: "573 cu ft",
    price: "$1,850",
    rentPrice: "From $175/mo",
    doorOpening: "Roll-up opening: approx. 7' W × 7' H",
    image: "/images/container-10-rollup-charcoal-closed.png",
    gallery: [
      "/images/container-10-rollup-charcoal-closed.png",
      "/images/container-10-rollup-charcoal-open.png",
    ],
    colorOptions: [
      {
        id: "charcoal",
        name: "Charcoal",
        hex: "#3f4448",
        image: "/images/container-10-rollup-charcoal-closed.png",
        gallery: [
          "/images/container-10-rollup-charcoal-closed.png",
          "/images/container-10-rollup-charcoal-open.png",
        ],
      },
      {
        id: "blue",
        name: "Blue",
        hex: "#075fc4",
        image: "/images/container-10-rollup-blue-closed-alt-angle.png",
        gallery: [
          "/images/container-10-rollup-blue-closed-alt-angle.png",
          "/images/container-10-rollup-blue-open-alt-angle.png",
        ],
      },
      {
        id: "beige",
        name: "Beige",
        hex: "#c8b99d",
        image: "/images/container-10-rollup-beige-closed-alt-angle.png",
        gallery: [
          "/images/container-10-rollup-beige-closed-alt-angle.png",
          "/images/container-10-rollup-beige-open-alt-angle.png",
        ],
      },
      {
        id: "green",
        name: "Dark Green",
        hex: "#0e503c",
        image: "/images/container-10-rollup-green-closed-alt-angle.png",
        gallery: [
          "/images/container-10-rollup-green-closed-alt-angle.png",
          "/images/container-10-rollup-green-open-alt-angle.png",
        ],
      },
      {
        id: "red",
        name: "Red",
        hex: "#9f332f",
        image: "/images/container-10-rollup-red-closed-alt-angle.png",
        gallery: [
          "/images/container-10-rollup-red-closed-alt-angle.png",
          "/images/container-10-rollup-red-open-alt-angle.png",
        ],
      },
    ],
    badge: "New",
    features: ["One-trip condition", "Roll-up access door", "Double cargo doors", "Lockbox ready", "Forklift pockets"],
    desc: "Factory-fresh 10ft container modified with a full-width roll-up door for easy walk-in and equipment access, plus the original cargo doors.",
  },

  // ── 20 FT ──────────────────────────────────────────────────────
  {
    id: "20-used",
    name: "20' Used",
    condition: "Used",
    type: "Standard",
    category: "20 ft",
    size: "20 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "19'4\"L × 7'8\"W × 7'10\"H",
    payload: "47,900 lbs",
    volume: "1,170 cu ft",
    price: "$1,100",
    rentPrice: "From $140/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-20-used-blue-angle-left.jpg",
    gallery: [
      "/images/container-20-used-blue-angle-left.jpg",
      "/images/container-20-used-blue-angle-right.jpg",
      "/images/container-20-used-blue-open.jpg",
      "/images/container-20-used-blue-interior.jpg",
    ],
    badge: "Best Value",
    features: ["Wind & watertight", "Double cargo doors", "Forklift pockets", "Corner castings"],
    desc: "The industry standard. Wind and watertight with cosmetic use marks. Handles job-site storage to event use with zero fuss.",
  },
  {
    id: "20-new",
    name: "20' New",
    condition: "One-Trip",
    type: "Standard",
    category: "20 ft",
    size: "20 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "19'4\"L × 7'8\"W × 7'10\"H",
    payload: "47,900 lbs",
    volume: "1,170 cu ft",
    price: "$2,200",
    rentPrice: "From $175/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-20-new-orange-angle.jpg",
    gallery: [
      "/images/container-20-new-orange-angle.jpg",
      "/images/container-20-new-orange-open.jpg",
      "/images/container-20-new-orange-end.jpg",
    ],
    colorOptions: STANDARD_20_COLORS,
    badge: "Most Popular",
    features: ["One-trip condition", "Double cargo doors", "Forklift pockets", "Corner castings", "Vent plugs"],
    desc: "Fresh from the factory, one cargo trip. Pristine corten steel interior — the right choice when condition matters for conversions or client-facing use.",
  },
  {
    id: "20-hc-new",
    name: "20' High Cube — New",
    condition: "One-Trip",
    type: "Standard",
    category: "20 ft",
    size: "20 ft HC",
    extDimensions: "20'L × 8'W × 9.5'H",
    intDimensions: "19'4\"L × 7'8\"W × 8'10\"H",
    payload: "44,100 lbs",
    volume: "1,300 cu ft",
    price: "$2,600",
    rentPrice: "From $210/mo",
    doorOpening: "Cargo doors: 7'8\" W × 8'5\" H",
    image: "/images/container-20-hc-gray-angle-right.jpg",
    gallery: [
      "/images/container-20-hc-gray-angle-right.jpg",
      "/images/container-20-hc-gray-doors.jpg",
      "/images/container-20-hc-gray-angle.jpg",
      "/images/container-20-hc-gray-end.jpg",
      "/images/container-20-hc-gray-angle-left.jpg",
      "/images/container-20-hc-gray-open-wide-final.jpg",
    ],
    colorOptions: HIGH_CUBE_20_COLORS,
    badge: "High Cube",
    features: ["One-trip condition", "High Cube — extra 1ft headroom", "Double cargo doors", "Forklift pockets", "Open-door inspection view"],
    desc: "Fresh from the factory with an extra foot of interior height. This one-trip 20ft High Cube is built for larger storage loads, conversions, and equipment access.",
  },
  {
    id: "20-hc-side",
    name: "20' HC — Side Doors",
    condition: "Used",
    type: "Modified",
    category: "20 ft",
    size: "20 ft HC",
    extDimensions: "20'L × 8'W × 9.5'H",
    intDimensions: "19'4\"L × 7'8\"W × 8'10\"H",
    payload: "44,100 lbs",
    volume: "1,300 cu ft",
    price: "$2,600",
    rentPrice: "From $210/mo",
    doorOpening: "Side access opening: approx. 14' W × 8'5\" H",
    image: "/images/container-20-hc-side-storefront-open.jpg",
    gallery: [
      "/images/container-20-hc-side-storefront-open.jpg",
      "/images/container-20-hc-side-storefront-interior.jpg",
      "/images/container-20-hc-side-storefront-closed.jpg",
    ],
    configurationOptions: [
      {
        id: "storefront-rollup",
        name: "Side Roll-Up + Glass Entry",
        image: "/images/container-20-hc-side-storefront-open.jpg",
        gallery: [
          "/images/container-20-hc-side-storefront-open.jpg",
          "/images/container-20-hc-side-storefront-interior.jpg",
          "/images/container-20-hc-side-storefront-closed.jpg",
        ],
      },
      {
        id: "double-rollup",
        name: "Double Side Roll-Up Doors",
        image: "/images/container-20-hc-side-double-rollup-open.png",
        gallery: [
          "/images/container-20-hc-side-double-rollup-open.png",
          "/images/container-20-hc-side-double-rollup-closed.png",
        ],
      },
      {
        id: "full-side-cargo",
        name: "Full Side-Opening Cargo Doors",
        image: "/images/container-20-hc-side-full-cargo-open.jpg",
        gallery: [
          "/images/container-20-hc-side-full-cargo-open.jpg",
          "/images/container-20-hc-side-full-cargo-closed.jpg",
          "/images/container-20-hc-side-full-cargo-angle.jpg",
          "/images/container-20-hc-side-full-cargo-end-open.jpg",
        ],
      },
      {
        id: "single-rollup",
        name: "Single Side Roll-Up Door",
        image: "/images/container-20-hc-side-single-rollup-side-open.jpg",
        gallery: [
          "/images/container-20-hc-side-single-rollup-side-open.jpg",
          "/images/container-20-hc-side-single-rollup-side-closed.jpg",
          "/images/container-20-hc-side-single-rollup-end-open.jpg",
          "/images/container-20-hc-side-single-rollup-end-closed.jpg",
        ],
      },
      {
        id: "interior-rollup",
        name: "Interior Roll-Up Access",
        image: "/images/container-20-hc-side-interior-rollup.jpg",
        gallery: ["/images/container-20-hc-side-interior-rollup.jpg"],
      },
    ],
    features: ["High Cube — extra 1ft headroom", "Modified side access doors", "Wind & watertight", "Ideal for retail & office fitouts"],
    desc: "Extra headroom plus a side-door opening makes this the go-to for pop-up retail, cafés, and site offices where walk-in access from the side is key.",
  },
  {
    id: "20-heated",
    name: "20' Heated — Side Doors",
    condition: "One-Trip",
    type: "Heated",
    category: "20 ft",
    size: "20 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "19'4\"L × 7'8\"W × 7'10\"H",
    payload: "47,900 lbs",
    volume: "1,170 cu ft",
    price: "$3,400",
    rentPrice: "From $280/mo",
    doorOpening: "Side access door: 3' W × 6'8\" H",
    image: "/images/container-20-heated-white-entry.jpg",
    gallery: [
      "/images/container-20-heated-white-entry.jpg",
      "/images/container-20-heated-white-hvac.jpg",
      "/images/container-20-heated-white-interior-front.jpg",
      "/images/container-20-heated-white-interior-rear.jpg",
    ],
    configurationOptions: [
      {
        id: "white-office",
        name: "White Heated Office Package",
        image: "/images/container-20-heated-white-entry.jpg",
        gallery: [
          "/images/container-20-heated-white-entry.jpg",
          "/images/container-20-heated-white-hvac.jpg",
          "/images/container-20-heated-white-interior-front.jpg",
          "/images/container-20-heated-white-interior-rear.jpg",
        ],
      },
      {
        id: "gray-security-office",
        name: "Gray Security Office Package",
        image: "/images/container-20-heated-gray-entry.jpg",
        gallery: [
          "/images/container-20-heated-gray-entry.jpg",
          "/images/container-20-heated-gray-interior.jpg",
        ],
      },
      {
        id: "beige-climate-office",
        name: "Beige Climate-Controlled Office",
        image: "/images/container-20-heated-beige-angle.jpg",
        gallery: [
          "/images/container-20-heated-beige-angle.jpg",
          "/images/container-20-heated-beige-entry.png",
          "/images/container-20-heated-beige-hvac.jpg",
        ],
      },
    ],
    features: ["Integrated heating system", "Side access doors", "Spray foam insulation", "Electrical package included", "Thermostat control"],
    desc: "Cold-climate ready. A fully insulated and heated 20ft with side door access — built for year-round use in northern job sites, workshops, and storage.",
  },

  // ── 30 FT ──────────────────────────────────────────────────────
  {
    id: "30-used",
    name: "30' Used",
    condition: "Used",
    type: "Standard",
    category: "30 ft",
    size: "30 ft",
    extDimensions: "30'L × 8'W × 8.5'H",
    intDimensions: "29'4\"L × 7'8\"W × 7'10\"H",
    payload: "54,000 lbs",
    volume: "1,760 cu ft",
    price: "$1,650",
    rentPrice: "From $195/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-30-used-yard.jpg",
    features: ["Wind & watertight", "Double cargo doors", "Forklift pockets", "Corner castings"],
    desc: "The middle ground between a 20ft and 40ft. Wind and watertight with standard use marks — great for mid-size construction sites and commercial storage.",
  },
  {
    id: "30-new",
    name: "30' New",
    condition: "One-Trip",
    type: "Standard",
    category: "30 ft",
    size: "30 ft",
    extDimensions: "30'L × 8'W × 8.5'H",
    intDimensions: "29'4\"L × 7'8\"W × 7'10\"H",
    payload: "54,000 lbs",
    volume: "1,760 cu ft",
    price: "$2,550",
    rentPrice: "From $235/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-30-new-beige-exterior.jpg",
    gallery: [
      "/images/container-30-new-beige-exterior.jpg",
      "/images/container-30-new-beige-interior.jpg",
    ],
    colorOptions: [
      {
        id: "beige",
        name: "Beige",
        hex: "#c9b99a",
        image: "/images/container-30-new-beige-exterior.jpg",
        gallery: [
          "/images/container-30-new-beige-exterior.jpg",
          "/images/container-30-new-beige-interior.jpg",
        ],
      },
      {
        id: "dark-green",
        name: "Dark Green",
        hex: "#244c3b",
        image: "/images/container-30-new-green-exterior.jpg",
        gallery: [
          "/images/container-30-new-green-exterior.jpg",
          "/images/container-30-new-green-interior.jpg",
        ],
      },
    ],
    badge: "New",
    features: ["One-trip condition", "Double cargo doors", "Forklift pockets", "Corner castings", "Vent plugs"],
    desc: "One-trip 30ft — pristine steel, maximum volume for a mid-size footprint. Fits sites where a 40ft is too long but a 20ft isn't enough.",
  },

  // ── 40 FT ──────────────────────────────────────────────────────
  {
    id: "40-used",
    name: "40' Used",
    condition: "Used",
    type: "Standard",
    category: "40 ft",
    size: "40 ft",
    extDimensions: "40'L × 8'W × 8.5'H",
    intDimensions: "39'5\"L × 7'8\"W × 7'10\"H",
    payload: "59,040 lbs",
    volume: "2,390 cu ft",
    price: "$1,900",
    rentPrice: "From $220/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-40-used-red-doors.jpg",
    gallery: [
      "/images/container-40-used-red-doors.jpg",
      "/images/container-40-used-red-rear.jpg",
      "/images/container-40-used-red-interior.jpg",
    ],
    colorOptions: [
      {
        id: "red",
        name: "Red",
        hex: "#8f342f",
        image: "/images/container-40-used-red-doors.jpg",
        gallery: [
          "/images/container-40-used-red-doors.jpg",
          "/images/container-40-used-red-rear.jpg",
          "/images/container-40-used-red-interior.jpg",
        ],
      },
      {
        id: "blue",
        name: "Blue",
        hex: "#2f5f91",
        image: "/images/container-40-used-blue-doors.jpg",
        gallery: [
          "/images/container-40-used-blue-doors.jpg",
          "/images/container-40-used-blue-rear.jpg",
          "/images/container-40-used-blue-interior.jpg",
        ],
      },
      {
        id: "light-blue-gray",
        name: "Light Blue / Gray",
        hex: "#738b94",
        image: "/images/container-40-used-light-blue-angle-left.jpg",
        gallery: [
          "/images/container-40-used-light-blue-angle-left.jpg",
          "/images/container-40-used-light-blue-angle-right.jpg",
          "/images/container-40-used-light-blue-interior.jpg",
        ],
      },
      {
        id: "navy-blue",
        name: "Navy Blue",
        hex: "#253f68",
        image: "/images/container-40-used-navy-angle.jpg",
        gallery: [
          "/images/container-40-used-navy-angle.jpg",
          "/images/container-40-used-navy-doors-enhanced.jpg",
          "/images/container-40-used-navy-interior-enhanced.jpg",
        ],
      },
    ],
    features: ["Wind & watertight", "Double cargo doors", "Forklift pockets", "Corner castings"],
    desc: "Maximum capacity at used pricing. Structurally sound with standard cosmetic wear — the workhorse for large construction sites and industrial storage.",
  },
  {
    id: "40-new",
    name: "40' New",
    condition: "One-Trip",
    type: "Standard",
    category: "40 ft",
    size: "40 ft",
    extDimensions: "40'L × 8'W × 8.5'H",
    intDimensions: "39'5\"L × 7'8\"W × 7'10\"H",
    payload: "59,040 lbs",
    volume: "2,390 cu ft",
    price: "$3,200",
    rentPrice: "From $270/mo",
    doorOpening: "Cargo doors: 7'8\" W × 7'5\" H",
    image: "/images/container-40-new-yard.jpg",
    badge: "New",
    features: ["One-trip condition", "Double cargo doors", "Forklift pockets", "Corner castings", "Vent plugs"],
    desc: "One-trip 40ft. Clean steel throughout — the benchmark choice for large-scale modifications, multi-room layouts, and permanent installations.",
  },
  {
    id: "40-hc-side",
    name: "40' HC — Side Doors",
    condition: "Used",
    type: "Modified",
    category: "40 ft",
    size: "40 ft HC",
    extDimensions: "40'L × 8'W × 9.5'H",
    intDimensions: "39'5\"L × 7'8\"W × 8'10\"H",
    payload: "58,600 lbs",
    volume: "2,700 cu ft",
    price: "$3,600",
    rentPrice: "From $310/mo",
    doorOpening: "Side access opening: approx. 14' W × 8'5\" H",
    image: "/images/container-40-side-door-yard.jpg",
    features: ["High Cube — extra 1ft headroom", "Modified side access doors", "2,700 cu ft capacity", "Preferred for modular builds"],
    desc: "The largest modified unit in the fleet. Extra headroom plus side-door access for walk-in layouts — the foundation of choice for modular offices and retail.",
  },
  {
    id: "40-heated-side",
    name: "40' Heated — Side Doors",
    condition: "One-Trip",
    type: "Heated",
    category: "40 ft",
    size: "40 ft",
    extDimensions: "40'L × 8'W × 8.5'H",
    intDimensions: "39'5\"L × 7'8\"W × 7'10\"H",
    payload: "59,040 lbs",
    volume: "2,390 cu ft",
    price: "$4,400",
    rentPrice: "From $380/mo",
    doorOpening: "Side access door: 3' W × 6'8\" H",
    image: "/images/container-40-side-door-yard.jpg",
    features: ["Integrated heating system", "Side access doors", "Spray foam insulation", "Electrical package included", "Thermostat control", "220V power ready"],
    desc: "Full-size, year-round ready. Insulated, heated, and side-door accessible — built for northern climate job sites, large workshops, and permanent installs.",
  },

  // ── REEFER ─────────────────────────────────────────────────────
  {
    id: "reefer-20-used",
    name: "20' Reefer — Used",
    condition: "Used",
    type: "Reefer",
    category: "20 ft",
    size: "20 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "17'8\"L × 7'6\"W × 7'5\"H",
    payload: "47,900 lbs",
    volume: "1,000 cu ft",
    price: "$3,500",
    rentPrice: "From $320/mo",
    doorOpening: "Cargo doors: 7'6\" W × 7'5\" H",
    image: "/images/container-20-reefer-yard.jpg",
    features: ["Refrigeration unit included", "Temp range: -25°F to +77°F", "Insulated floor & walls", "Wind & watertight", "Genset-ready mounting"],
    desc: "Wind and watertight 20ft reefer with operational refrigeration unit. Light cosmetic wear — temperature-verified and tested before delivery.",
  },
  {
    id: "reefer-20-new",
    name: "20' Reefer — New",
    condition: "One-Trip",
    type: "Reefer",
    category: "20 ft",
    size: "20 ft",
    extDimensions: "20'L × 8'W × 8.5'H",
    intDimensions: "17'8\"L × 7'6\"W × 7'5\"H",
    payload: "47,900 lbs",
    volume: "1,000 cu ft",
    price: "$6,800",
    rentPrice: "From $520/mo",
    doorOpening: "Cargo doors: 7'6\" W × 7'5\" H",
    image: "/images/container-20-reefer-yard.jpg",
    features: ["One-trip condition", "Refrigeration unit included", "Temp range: -25°F to +77°F", "T-floor aluminum decking", "Insulated walls & ceiling", "Genset-ready mounting"],
    desc: "One-trip factory-fresh 20ft reefer. Pristine insulated interior with full refrigeration system — the right choice for cold-chain, food storage, and pharma logistics.",
  },
  {
    id: "reefer-40-used",
    name: "40' Reefer — Used",
    condition: "Used",
    type: "Reefer",
    category: "40 ft",
    size: "40 ft",
    extDimensions: "40'L × 8'W × 8.5'H",
    intDimensions: "37'9\"L × 7'6\"W × 7'5\"H",
    payload: "59,040 lbs",
    volume: "2,100 cu ft",
    price: "$4,800",
    rentPrice: "From $420/mo",
    doorOpening: "Cargo doors: 7'6\" W × 7'5\" H",
    image: "/images/container-40-reefer-yard.jpg",
    features: ["Refrigeration unit included", "Temp range: -25°F to +77°F", "T-floor aluminum decking", "Insulated walls & ceiling", "Wind & watertight", "Genset-ready mounting"],
    desc: "Maximum cold-storage capacity at used pricing. Structurally sound with standard cosmetic wear — temperature-tested and ready for immediate deployment.",
  },
  {
    id: "reefer-40hc-new",
    name: "40' HC Reefer — New",
    condition: "One-Trip",
    type: "Reefer",
    category: "40 ft",
    size: "40 ft HC",
    extDimensions: "40'L × 8'W × 9.5'H",
    intDimensions: "37'9\"L × 7'6\"W × 8'5\"H",
    payload: "58,600 lbs",
    volume: "2,400 cu ft",
    price: "$9,200",
    rentPrice: "From $680/mo",
    doorOpening: "Cargo doors: 7'6\" W × 8'5\" H",
    image: "/images/container-40-reefer-yard.jpg",
    features: ["One-trip condition", "High Cube — extra 1ft headroom", "Refrigeration unit included", "Temp range: -25°F to +77°F", "T-floor aluminum decking", "Insulated walls & ceiling", "Genset-ready mounting"],
    desc: "Premium one-trip 40ft high-cube reefer. Extra headroom, maximum capacity, and full refrigeration system — the flagship choice for large-scale cold-chain operations.",
  },
];

const CATEGORIES = ["All", "10 ft", "20 ft", "30 ft", "40 ft"];
const CONDITIONS = ["All", "Used", "One-Trip"];
const TYPES = ["All", "Standard", "High Cube", "Modified", "Heated", "Reefer"];

const CONDITION_COLORS: Record<string, string> = {
  Used:      "bg-muted text-muted-foreground border border-border",
  "One-Trip": "bg-emerald-900/60 text-emerald-300 border border-emerald-700/50",
};

const TYPE_COLORS: Record<string, string> = {
  Standard: "bg-muted text-foreground border border-border",
  Modified: "bg-primary/10 text-primary border border-primary/30",
  Heated:   "bg-orange-950/70 text-orange-300 border border-orange-800/60",
  Reefer:   "bg-blue-950/70 text-blue-300 border border-blue-800/60",
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
      getValue: (c: Container) => <span className="text-lg font-display font-bold text-primary">{c.price}</span>,
    },
    {
      label: "Rental price",
      getValue: (c: Container) => c.rentPrice ?? "—",
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
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">Containers</h1>
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
                      <div className="text-2xl font-display font-bold text-foreground">{container.price}</div>
                      {container.rentPrice && (
                        <div className="text-xs text-muted-foreground">{container.rentPrice}</div>
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
                    <td className="px-4 py-3 text-right font-display font-bold text-primary">{c.price}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground hidden sm:table-cell">{c.rentPrice ?? "—"}</td>
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
                  <div className="text-3xl font-display font-bold">{selectedContainer.price}</div>
                  {selectedContainer.rentPrice && (
                    <div className="text-sm text-muted-foreground">{selectedContainer.rentPrice}</div>
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
