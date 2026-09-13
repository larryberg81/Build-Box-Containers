import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { CONTAINERS } from "@/data/containers";
import { HOME_FLEET_CATEGORIES } from "@/pages/home";

describe("home page featured containers", () => {
  it("references products that exist in the shared catalog", () => {
    const catalogIds = new Set(CONTAINERS.map((container) => container.id));
    const missingProductIds = HOME_FLEET_CATEGORIES
      .map(({ productId }) => productId)
      .filter((productId) => !catalogIds.has(productId));

    assert.deepEqual(
      missingProductIds,
      [],
      `Home page featured container IDs missing from the shared catalog: ${missingProductIds.join(", ")}`,
    );
  });
});