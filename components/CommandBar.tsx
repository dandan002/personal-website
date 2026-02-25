"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import type { ViewName } from "@/lib/types";

const CLI_MAP: Record<string, ViewName> = {
  home:     "home",
  about:    "about",
  resume:   "resume",
  cv:       "resume",
  projects: "projects",
  portfolio:"projects",
  contact:  "contact",
  msg:      "contact",
};

interface CommandBarProps {
  onSwitch: (view: ViewName) => void;
}

export default function CommandBar({ onSwitch }: CommandBarProps) {
  const [clock, setClock] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Live UTC clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setClock(
        `${now.toUTCString().slice(0, 16)}  ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())} UTC`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Global keyboard: focus input on any keypress (except F-keys, handled in Terminal)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key.startsWith("F") ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        e.key === "Tab"
      )
        return;
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", handler as unknown as EventListener);
    return () =>
      window.removeEventListener("keydown", handler as unknown as EventListener);
  }, []);

  function handleGo() {
    const cmd = input.trim().toLowerCase();
    setInput("");
    const view = CLI_MAP[cmd];
    if (view) {
      setError("");
      onSwitch(view);
    } else if (cmd === "help") {
      setError("CMDS: HOME | ABOUT | RESUME | PROJECTS | CONTACT");
    } else if (cmd) {
      setError(`ERR: UNKNOWN MNEMONIC "${cmd.toUpperCase()}"`);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleGo();
  }

  return (
    <div className="shrink-0 bg-black border-b border-[#FFA028]">
      {/* Main command row */}
      <div className="flex items-stretch h-[28px]">
        {/* Identity */}
        <div className="bg-[#FFA028] text-black font-bold text-[12px] px-3 flex items-center tracking-wider shrink-0">
          DJUNG &lt;GO&gt;
        </div>

        {/* Separator */}
        <div className="w-[1px] bg-[#FFA028]" />

        {/* Mnemonic input area */}
        <div className="flex items-center flex-1 px-3 gap-2 min-w-0">
          <span className="text-[#555555] text-[11px] shrink-0">MNEMONIC:</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value.toUpperCase());
              setError("");
            }}
            onKeyDown={handleKeyDown}
            placeholder="TYPE FUNCTION OR SECURITY..."
            className="bg-transparent border-none outline-none text-[#FFA028] text-[12px] font-mono flex-1 min-w-0 placeholder-[#333333] caret-[#FFA028] uppercase"
            autoComplete="off"
            spellCheck={false}
          />
          {error && (
            <span className="text-[#FF433D] text-[11px] shrink-0 truncate">
              {error}
            </span>
          )}
        </div>

        {/* GO button */}
        <button
          onClick={handleGo}
          className="bg-[#00C805] text-black font-bold text-[12px] px-4 shrink-0 tracking-widest hover:bg-[#00ff00] transition-colors cursor-pointer"
        >
          GO
        </button>

        {/* Separator */}
        <div className="w-[1px] bg-[#FFA028]" />

        {/* Live clock */}
        <div className="px-3 flex items-center text-[#FFA028] text-[11px] shrink-0 font-mono">
          {clock}
        </div>
      </div>
    </div>
  );
}
