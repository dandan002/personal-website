import Panel from "@/components/Panel";
import { PROJECTS } from "@/lib/data";

export default function ProjectsView() {
  return (
    <div className="w-full h-full p-[2px]">
      <Panel title="PROJECTS — PORTFOLIO [DJUNG]   <GO>" className="h-full">
        <div className="p-3 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", alignContent: "start" }}>
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              className="border border-[#333] bg-[#0a0a0a] p-3 hover:border-[#FFA028] transition-colors"
            >
              {/* Title */}
              <div className="text-[#FFB84D] font-bold text-[12px] mb-2 tracking-wide">
                {project.title}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-[4px] mb-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#111] border border-[#333] text-[#555] text-[10px] px-[6px] py-[1px] tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-[#bbb] text-[11px] leading-[1.65]">
                {project.desc}
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
