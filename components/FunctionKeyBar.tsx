import type { ViewName } from "@/lib/types";
import clsx from "clsx";

interface FKey {
  key: string;
  label: string;
  view?: ViewName;
  action?: () => void;
  color: "amber" | "green" | "red" | "dim";
}

interface FunctionKeyBarProps {
  activeView: ViewName;
  onSwitch: (view: ViewName) => void;
}

export default function FunctionKeyBar({
  activeView,
  onSwitch,
}: FunctionKeyBarProps) {
  const keys: FKey[] = [
    { key: "F1",  label: "HOME",     view: "home",     color: "amber" },
    { key: "F2",  label: "ABOUT",    view: "about",    color: "amber" },
    { key: "F3",  label: "RESUME",   view: "resume",   color: "amber" },
    { key: "F4",  label: "PROJECTS", view: "projects", color: "amber" },
    { key: "F5",  label: "CONTACT",  view: "contact",  color: "amber" },
    { key: "F6",  label: "——",                         color: "dim"   },
    { key: "F7",  label: "——",                         color: "dim"   },
    { key: "F8",  label: "——",                         color: "dim"   },
    {
      key: "F9",
      label: "EMAIL",
      color: "green",
      action: () => { window.location.href = "mailto:danieljung@princeton.edu"; },
    },
    {
      key: "F10",
      label: "GITHUB",
      color: "green",
      action: () => { window.open("https://github.com/danieljung", "_blank", "noopener"); },
    },
    {
      key: "F11",
      label: "RÉSUMÉ PDF",
      color: "green",
      action: () => { window.open("/resume.pdf", "_blank"); },
    },
    { key: "F12", label: "QUIT",                       color: "red"   },
  ];

  return (
    <div className="shrink-0 flex border-t border-[#FFA028] bg-black h-[28px]">
      {keys.map((k, i) => {
        const isActive = k.view && k.view === activeView;
        const isDisabled = !k.view && !k.action;

        const baseClass = "flex-1 flex items-center justify-center gap-[3px] border-r border-[#222] text-[10px] font-bold tracking-wide cursor-pointer select-none transition-colors overflow-hidden px-1";

        const colorClass = isActive
          ? "bg-white text-black"
          : k.color === "amber"
          ? "bg-[#FFA028] text-black hover:bg-[#FFB84D]"
          : k.color === "green"
          ? "bg-[#003A00] text-[#00C805] hover:bg-[#005200] border-[#00C805]"
          : k.color === "red"
          ? "bg-[#3A0000] text-[#FF433D] hover:bg-[#520000]"
          : "bg-[#111] text-[#333] cursor-not-allowed";

        function handleClick() {
          if (k.view) onSwitch(k.view);
          else if (k.action) k.action();
        }

        return (
          <button
            key={k.key}
            onClick={isDisabled ? undefined : handleClick}
            disabled={isDisabled}
            className={clsx(baseClass, colorClass, i === keys.length - 1 && "border-r-0")}
            title={`${k.key}: ${k.label}`}
          >
            <span className="opacity-60 text-[9px] shrink-0">{k.key}</span>
            <span className="truncate">{k.label}</span>
          </button>
        );
      })}
    </div>
  );
}
