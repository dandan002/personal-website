"use client";

import { useState, useEffect, useRef } from "react";
import { EQUITIES, CRYPTO, FX } from "@/lib/data";
import type { Instrument, LiveInstrument } from "@/lib/types";

const API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY ?? "";
const POLL_MS = 30_000;

// Polygon ticker symbols for each instrument
const EQUITY_TICKERS = EQUITIES.map((i) => i.symbol); // SPX, NDX, etc.

// Polygon crypto format: X:BTCUSD
const CRYPTO_TICKER_MAP: Record<string, string> = {
  BTC: "X:BTCUSD",
  ETH: "X:ETHUSD",
  SOL: "X:SOLUSD",
  XRP: "X:XRPUSD",
  BNB: "X:BNBUSD",
};

// Polygon forex format: C:EURUSD
const FX_TICKER_MAP: Record<string, string> = {
  "EUR/USD": "C:EURUSD",
  "USD/JPY": "C:USDJPY",
  "GBP/USD": "C:GBPUSD",
  DXY:       "C:DXY",
  "10Y UST": null as unknown as string, // not on Polygon — kept from seed
};

function seedLive(instruments: Instrument[]): LiveInstrument[] {
  return instruments.map((i) => ({
    ...i,
    direction: "flat" as const,
    flashKey: 0,
  }));
}

function applyPrice(
  prev: LiveInstrument,
  newPrice: number | null
): LiveInstrument {
  if (newPrice === null || !isFinite(newPrice)) return prev;
  const direction =
    newPrice > prev.price ? "up" : newPrice < prev.price ? "down" : "flat";
  return {
    ...prev,
    price: newPrice,
    direction,
    flashKey: prev.flashKey === 0 ? 1 : 0,
  };
}

// ── Fetchers ──────────────────────────────────────────────────

async function fetchEquities(
  tickers: string[]
): Promise<Record<string, number>> {
  const joined = tickers.join(",");
  const url = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${joined}&apiKey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return {};
  const json = await res.json();
  const out: Record<string, number> = {};
  for (const snap of json.tickers ?? []) {
    out[snap.ticker] = snap.day?.c ?? snap.prevDay?.c ?? null;
  }
  return out;
}

async function fetchCrypto(
  tickerMap: Record<string, string>
): Promise<Record<string, number>> {
  const polyTickers = Object.values(tickerMap).filter(Boolean).join(",");
  const url = `https://api.polygon.io/v2/snapshot/locale/global/markets/crypto/tickers?tickers=${polyTickers}&apiKey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return {};
  const json = await res.json();
  const out: Record<string, number> = {};
  // invert map: polyTicker -> symbol
  const inv = Object.fromEntries(
    Object.entries(tickerMap).map(([sym, poly]) => [poly, sym])
  );
  for (const snap of json.tickers ?? []) {
    const sym = inv[snap.ticker];
    if (sym) out[sym] = snap.day?.c ?? snap.prevDay?.c ?? null;
  }
  return out;
}

async function fetchFX(
  tickerMap: Record<string, string | null>
): Promise<Record<string, number>> {
  const polyTickers = Object.values(tickerMap)
    .filter(Boolean)
    .join(",");
  const url = `https://api.polygon.io/v2/snapshot/locale/global/markets/forex/tickers?tickers=${polyTickers}&apiKey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return {};
  const json = await res.json();
  const out: Record<string, number> = {};
  const inv = Object.fromEntries(
    Object.entries(tickerMap)
      .filter(([, poly]) => poly)
      .map(([sym, poly]) => [poly!, sym])
  );
  for (const snap of json.tickers ?? []) {
    const sym = inv[snap.ticker];
    if (sym) out[sym] = snap.day?.c ?? snap.prevDay?.c ?? null;
  }
  return out;
}

// ── Hook ──────────────────────────────────────────────────────

export function useMarketSim() {
  const [snapshot, setSnapshot] = useState(() => ({
    equities: seedLive(EQUITIES),
    crypto: seedLive(CRYPTO),
    fx: seedLive(FX),
  }));

  // Keep latest snapshot in a ref so the interval closure isn't stale
  const snapshotRef = useRef(snapshot);
  snapshotRef.current = snapshot;

  useEffect(() => {
    if (!API_KEY) return; // no key — stay on seed data

    async function poll() {
      try {
        const [eqPrices, crPrices, fxPrices] = await Promise.all([
          fetchEquities(EQUITY_TICKERS),
          fetchCrypto(CRYPTO_TICKER_MAP),
          fetchFX(FX_TICKER_MAP),
        ]);

        setSnapshot((prev) => ({
          equities: prev.equities.map((item) =>
            applyPrice(item, eqPrices[item.symbol] ?? null)
          ),
          crypto: prev.crypto.map((item) =>
            applyPrice(item, crPrices[item.symbol] ?? null)
          ),
          fx: prev.fx.map((item) =>
            applyPrice(item, fxPrices[item.symbol] ?? null)
          ),
        }));
      } catch {
        // network error — keep last known prices, no crash
      }
    }

    poll(); // immediate first fetch
    const id = setInterval(poll, POLL_MS);
    return () => clearInterval(id);
  }, []);

  return snapshot;
}
