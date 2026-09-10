import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { CONTAINERS } from "@/pages/containers";
import {
  calculateQuoteEstimate,
  numericCatalogPrice,
  toQuoteContainer,
} from "./quote-pricing";

describe("quote catalog pricing", () => {
  const expectedPrices = {
    "10-used": [850, 95],
    "10-new-side": [1200, 120],
    "10-new-rollup": [1850, 175],
    "20-used": [1100, 140],
    "20-new": [2200, 175],
    "20-hc-new": [2600, 210],
    "20-hc-side": [2600, 210],
    "20-heated": [3400, 280],
    "30-used": [1650, 195],
    "30-new": [2550, 235],
    "40-used": [1900, 220],
    "40-new": [3200, 270],
    "40-hc-new": [3600, 310],
    "40-hc-side": [3600, 310],
    "40-heated-side": [4400, 380],
    "capsule-container": [20000, 1500],
    "reefer-20-used": [3500, 320],
    "reefer-20-new": [6800, 520],
    "reefer-40-used": [4800, 420],
    "reefer-40hc-new": [9200, 680],
  } satisfies Record<string, [purchase: number, rental: number]>;

  it("has the expected purchase and rental price for every quoted catalog product", () => {
    assert.equal(CONTAINERS.length, Object.keys(expectedPrices).length);

    const actualPrices = Object.fromEntries(
      CONTAINERS.map((container) => {
        const quoteContainer = toQuoteContainer(container);
        return [container.id, [quoteContainer.buyPrice, quoteContainer.rentPrice]];
      }),
    );

    assert.deepEqual(actualPrices, expectedPrices);
  });

  it("parses formatted catalog prices into numeric quote prices", () => {
    const container = { id: "formatted-price-example" };

    assert.equal(numericCatalogPrice("$6,250", container, "purchase"), 6250);
    assert.equal(numericCatalogPrice("$289 / mo", container, "rental"), 289);
  });

  it("rejects missing rental prices", () => {
    assert.throws(
      () => numericCatalogPrice(undefined, { id: "missing-rental" }, "rental"),
      /Missing rental price.*missing-rental/,
    );
  });

  it("produces representative exact purchase and rental totals", () => {
    const catalogContainer = CONTAINERS.find(({ id }) => id === "20-used");
    assert.ok(catalogContainer);
    const quoteContainer = toQuoteContainer(catalogContainer);

    assert.equal(
      calculateQuoteEstimate({
        mode: "purchase",
        buyPrice: quoteContainer.buyPrice,
        rentPrice: quoteContainer.rentPrice,
        deliveryFee: 580,
      }).total,
      1680,
    );
    assert.equal(
      calculateQuoteEstimate({
        mode: "rental",
        buyPrice: quoteContainer.buyPrice,
        rentPrice: quoteContainer.rentPrice,
        deliveryFee: 580,
        rentalMonths: 3,
        rentalDiscount: 0.05,
      }).total,
      979,
    );
  });

  it("changes quote totals when catalog prices change", () => {
    const catalogContainer = CONTAINERS.find(({ id }) => id === "20-used");
    assert.ok(catalogContainer);
    const original = toQuoteContainer(catalogContainer);
    const changed = toQuoteContainer({
      ...catalogContainer,
      price: "$1,350",
      rentPrice: "From $240/mo",
    });
    const purchaseTotal = (buyPrice: number) =>
      calculateQuoteEstimate({
        mode: "purchase",
        buyPrice,
        rentPrice: original.rentPrice,
        deliveryFee: 580,
      }).total;
    const rentalTotal = (rentPrice: number) =>
      calculateQuoteEstimate({
        mode: "rental",
        buyPrice: original.buyPrice,
        rentPrice,
        deliveryFee: 580,
        rentalMonths: 3,
        rentalDiscount: 0.05,
      }).total;

    assert.equal(purchaseTotal(original.buyPrice), 1680);
    assert.equal(purchaseTotal(changed.buyPrice), 1930);
    assert.equal(rentalTotal(original.rentPrice), 979);
    assert.equal(rentalTotal(changed.rentPrice), 1264);
  });
});
