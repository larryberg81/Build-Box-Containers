import type { Container } from "@/data/containers";

export type QuoteContainer = {
  id: string;
  label: string;
  size: string;
  sizeGroup: "10" | "20+";
  condition: "New" | "Used" | "Modified" | "Reefer";
  buyPrice: number;
  rentPrice: number;
};

export type QuoteEstimateInput = {
  mode: "purchase" | "rental";
  buyPrice: number;
  rentPrice: number;
  deliveryFee: number;
  modificationsTotal?: number;
  gensetPrice?: number;
  rentalMonths?: number;
  rentalDiscount?: number;
};

export function numericCatalogPrice(
  price: string | undefined,
  container: Pick<Container, "id">,
  kind: "purchase" | "rental",
) {
  const value = Number(price?.replace(/[^\d.]/g, ""));

  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Missing ${kind} price for catalog container "${container.id}"`);
  }

  return value;
}

export function toQuoteContainer(container: Container): QuoteContainer {
  const condition =
    container.type === "Reefer"
      ? "Reefer"
      : container.type === "Modified" || container.type === "Heated"
        ? "Modified"
        : container.condition === "Used"
          ? "Used"
          : "New";

  return {
    id: container.id,
    label: container.name,
    size: container.size,
    sizeGroup: container.category === "10 ft" ? "10" : "20+",
    condition,
    buyPrice: numericCatalogPrice(container.price, container, "purchase"),
    rentPrice: numericCatalogPrice(container.rentPrice, container, "rental"),
  };
}

export function calculateQuoteEstimate({
  mode,
  buyPrice,
  rentPrice,
  deliveryFee,
  modificationsTotal = 0,
  gensetPrice = 0,
  rentalMonths = 1,
  rentalDiscount = 0,
}: QuoteEstimateInput) {
  if (mode === "purchase") {
    return {
      base: buyPrice,
      modifications: modificationsTotal,
      genset: gensetPrice,
      delivery: deliveryFee,
      monthly: null,
      months: rentalMonths,
      total: buyPrice + modificationsTotal + gensetPrice + deliveryFee,
    };
  }

  const monthlyBase = Math.round(rentPrice * (1 - rentalDiscount));
  const modifications = Math.round(modificationsTotal * 0.08);
  const genset = Math.round(gensetPrice * 0.08);
  const monthly = monthlyBase + modifications + genset;

  return {
    base: monthlyBase,
    modifications,
    genset,
    delivery: deliveryFee,
    monthly,
    months: rentalMonths,
    total: monthly * rentalMonths + deliveryFee,
  };
}