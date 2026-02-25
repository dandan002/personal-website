"use client";

import { useEffect, useRef } from "react";
import type { LiveInstrument } from "@/lib/types";
import Panel from "@/components/Panel";

interface TickerPanelProps {
  title: string;
  instruments: LiveInstrument[];
}

function formatPrice(price: number): string {
  if (price >= 10000) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 100)   return price.toFixed(2);
  if (price >= 1)     return price.toFixed(3);
  return price.toFixed(4);
}

function TickerRow({ item }: { item: LiveInstrument }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const prevFlashKey = useRef(item.flashKey);

  useEffect(() => {
    if (item.flashKey === prevFlashKey.current) return;
    prevFlashKey.current = item.flashKey;

    const el = rowRef.current;
    if (!el) return;

    // Remove then re-add to retrigger animation
    el.classList.remove("flash-up", "flash-down");
    void el.offsetWidth; // force reflow
    el.classList.add(item.direction === "up" ? "flash-up" : "flash-down");
  }, [item.flashKey, item.direction]);

  const isUp = item.direction === "up";
  const changeAbs = Math.abs(
    ((item.price - item.price / (1 + 0.001)) / item.price) * 100
  );

  // Estimate display change from the seed change value on first render,
  // then use direction for coloring after simulation starts
  const changePct = item.flashKey === 0 ? item.change : (isUp ? changeAbs : -changeAbs);
  const sign = changePct >= 0 ? "+" : "";
  const arrow = item.direction === "flat" ? " " : item.direction === "up" ? "▲" : "▼";
  const changeColor =
    item.direction === "flat"
      ? "text-[#555]"
      : item.direction === "up"
      ? "text-[#00C805]"
      : "text-[#FF433D]";

  return (
    <div
      ref={rowRef}
      className="grid text-[11px] py-[2px] border-b border-[#111] last:border-b-0 gap-x-2 items-center"
      style={{ gridTemplateColumns: "6ch 1fr 9ch 8ch" }}
    >
      <span className="text-[#FFA028] font-bold truncate">{item.symbol}</span>
      <span className="text-[#555] truncate text-[10px]">{item.name}</span>
      <span className="text-[#FFA028] text-right tabular-nums">
        {formatPrice(item.price)}
      </span>
      <span className={`text-right tabular-nums text-[10px] ${changeColor}`}>
        {arrow}{sign}{Math.abs(changePct).toFixed(2)}%
      </span>
    </div>
  );
}

export default function TickerPanel({ title, instruments }: TickerPanelProps) {
  return (
    <Panel title={title}>
      {instruments.map((item) => (
        <TickerRow key={item.symbol} item={item} />
      ))}
    </Panel>
  );
}
