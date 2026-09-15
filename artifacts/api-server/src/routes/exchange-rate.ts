import { Router } from "express";

const router = Router();
const FALLBACK_CAD_RATE = 1.38;
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;
let cachedRate: { rate: number; fetchedAt: number } | null = null;

router.get("/exchange-rate", async (_req, res) => {
  if (cachedRate && Date.now() - cachedRate.fetchedAt < CACHE_TTL_MS) {
    res.json({ base: "USD", currency: "CAD", rate: cachedRate.rate, source: "cache" });
    return;
  }

  try {
    const response = await fetch("https://api.frankfurter.app/latest?from=USD&to=CAD");
    if (!response.ok) throw new Error(`Exchange-rate provider returned ${response.status}`);
    const data = await response.json() as { rates?: { CAD?: number } };
    const rate = data.rates?.CAD;
    if (!rate || !Number.isFinite(rate)) throw new Error("Exchange-rate provider returned an invalid CAD rate");
    cachedRate = { rate, fetchedAt: Date.now() };
    res.json({ base: "USD", currency: "CAD", rate, source: "live" });
  } catch (error) {
    res.json({ base: "USD", currency: "CAD", rate: cachedRate?.rate ?? FALLBACK_CAD_RATE, source: "fallback" });
  }
});

export default router;