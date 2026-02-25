"use client";

import { useState, useEffect, useCallback } from "react";
import type { ViewName } from "@/lib/types";
import CommandBar from "@/components/CommandBar";
import FunctionKeyBar from "@/components/FunctionKeyBar";
import HomeView from "@/components/views/HomeView";
import AboutView from "@/components/views/AboutView";
import ResumeView from "@/components/views/ResumeView";
import ProjectsView from "@/components/views/ProjectsView";
import ContactView from "@/components/views/ContactView";

const FKEY_MAP: Record<string, ViewName> = {
  F1: "home",
  F2: "about",
  F3: "resume",
  F4: "projects",
  F5: "contact",
};

export default function Terminal() {
  const [activeView, setActiveView] = useState<ViewName>("home");

  const switchView = useCallback((view: ViewName) => {
    setActiveView(view);
  }, []);

  // Global F1-F5 keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const view = FKEY_MAP[e.key];
      if (view) {
        e.preventDefault();
        setActiveView(view);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      className="flex flex-col bg-black text-[#FFA028] overflow-hidden"
      style={{
        height: "100dvh",
        fontFamily: '"IBM Plex Mono", "Courier New", Courier, monospace',
        fontSize: "13px",
      }}
    >
      {/* TOP: Command / mnemonic input bar */}
      <CommandBar onSwitch={switchView} />

      {/* MIDDLE: Active view panel */}
      <main className="flex-1 min-h-0 overflow-hidden">
        {activeView === "home"     && <HomeView onSwitch={switchView} />}
        {activeView === "about"    && <AboutView />}
        {activeView === "resume"   && <ResumeView />}
        {activeView === "projects" && <ProjectsView />}
        {activeView === "contact"  && <ContactView />}
      </main>

      {/* BOTTOM: Function key bar (F1-F12) */}
      <FunctionKeyBar activeView={activeView} onSwitch={switchView} />
    </div>
  );
}
