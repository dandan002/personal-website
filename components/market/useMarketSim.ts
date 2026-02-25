"use client";

import { useState, useEffect, useRef } from "react";
import { EQUITIES, CRYPTO, FX, VOLATILITY, DEFAULT_VOL } from "@/lib/data";
import type { Instrument, LiveInstrument } from "@/lib/types";

function seedLive(instruments: Instrument[]): LiveInstrument[] {
  return instruments.map((i) => ({
    ...i,
    direction: "flat" as const,
    flashKey: 0,
  }));
}

export function useMarketSim() {
  // Mutable live state (not in React state — avoids double-render)
  const liveRef = useRef<{
    equities: LiveInstrument[];
    crypto: LiveInstrument[];
    fx: LiveInstrument[];
  }>({
    equities: seedLive(EQUITIES),
    crypto: seedLive(CRYPTO),
    fx: seedLive(FX),
  });

  // React state snapshot — triggers re-render
  const [snapshot, setSnapshot] = useState(() => ({
    equities: seedLive(EQUITIES),
    crypto: seedLive(CRYPTO),
    fx: seedLive(FX),
  }));

  useEffect(() => {
    const id = setInterval(() => {
      const groups = ["equities", "crypto", "fx"] as const;

      groups.forEach((g) => {
        liveRef.current[g] = liveRef.current[g].map((item) => {
          const vol = VOLATILITY[item.symbol] ?? DEFAULT_VOL;
          const drift = (Math.random() - 0.5) * 2 * vol;
          const newPrice = item.price * (1 + drift);
          return {
            ...item,
            price: newPrice,
            direction: newPrice >= item.price ? ("up" as const) : ("down" as const),
            flashKey: item.flashKey + 1,
          };
        });
      });

      setSnapshot({
        equities: [...liveRef.current.equities],
        crypto: [...liveRef.current.crypto],
        fx: [...liveRef.current.fx],
      });
    }, 1800);

    return () => clearInterval(id);
  }, []);

  return snapshot;
}
