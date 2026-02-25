"use client";

import { useMarketSim } from "@/components/market/useMarketSim";
import TickerPanel from "@/components/market/TickerPanel";
import Panel from "@/components/Panel";
import type { ViewName } from "@/lib/types";

interface HomeViewProps {
  onSwitch: (v: ViewName) => void;
}

export default function HomeView({ onSwitch }: HomeViewProps) {
  const { equities, crypto, fx } = useMarketSim();

  return (
    <div
      className="w-full h-full grid gap-[2px] bg-[#FFA028] p-[2px]"
      style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}
    >
      <TickerPanel title="EQUITIES   <GO>" instruments={equities} />
      <TickerPanel title="CRYPTO     <GO>" instruments={crypto} />
      <TickerPanel title="FX / RATES <GO>" instruments={fx} />

      {/* Profile panel */}
      <Panel title="PROFILE    <GO>">
        <div className="text-[12px] leading-relaxed space-y-[2px]">
          <div className="text-[#FFA028] font-bold text-[14px] tracking-widest mb-1">
            DANIEL JUNG
          </div>
          <div className="text-[#FFB84D] text-[11px] mb-3">
            ECE + APPLIED PHYSICS  |  PRINCETON &apos;26
          </div>

          <div className="border-t border-[#222] pt-2 space-y-[3px]">
            {[
              ["FOCUS",  "Markets & Embedded Systems"],
              ["SCHOOL", "Princeton University"],
              ["MINOR",  "CS, Finance"],
              ["LANG",   "ENG, KOR (TOPIK 6)"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2 text-[11px]">
                <span className="text-[#FFA028] font-bold w-[52px] shrink-0">{k}:</span>
                <span className="text-[#aaa]">{v}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#222] pt-2 mt-2 space-y-[3px]">
            {(
              [
                ["home",     "[F1] HOME"],
                ["about",    "[F2] ABOUT"],
                ["resume",   "[F3] RESUME"],
                ["projects", "[F4] PROJECTS"],
                ["contact",  "[F5] CONTACT"],
              ] as [ViewName, string][]
            ).map(([view, label]) => (
              <button
                key={view}
                onClick={() => onSwitch(view)}
                className="block w-full text-left text-[11px] text-[#FFA028] hover:text-black hover:bg-[#FFA028] px-1 transition-colors cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
