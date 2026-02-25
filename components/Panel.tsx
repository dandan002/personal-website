import type { ReactNode } from "react";
import clsx from "clsx";

interface PanelProps {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  titleRight?: ReactNode;
}

export default function Panel({
  title,
  children,
  className,
  bodyClassName,
  titleRight,
}: PanelProps) {
  return (
    <div
      className={clsx(
        "border border-[#FFA028] flex flex-col overflow-hidden bg-[#080808]",
        className
      )}
    >
      {/* Amber header bar — inverted color (Bloomberg signature) */}
      <div className="bg-[#FFA028] text-black text-[11px] font-bold px-2 py-[3px] tracking-widest shrink-0 flex items-center justify-between">
        <span>{title}</span>
        {titleRight && <span>{titleRight}</span>}
      </div>

      {/* Scrollable body */}
      <div
        className={clsx(
          "flex-1 overflow-y-auto min-h-0",
          bodyClassName ?? "p-2"
        )}
      >
        {children}
      </div>
    </div>
  );
}
