import Panel from "@/components/Panel";
import { ABOUT_KV, CONTACT } from "@/lib/data";

export default function AboutView() {
  return (
    <div className="w-full h-full p-[2px]">
      <Panel title="ABOUT — DANIEL JUNG [DJUNG]   <GO>" className="h-full">
        <div
          className="grid h-full gap-6 p-3"
          style={{ gridTemplateColumns: "1fr 280px" }}
        >
          {/* Left: narrative */}
          <div className="space-y-4 overflow-y-auto pr-2">
            <div className="text-[#FFA028] text-[11px] tracking-widest border-b border-[#222] pb-1">
              // OVERVIEW
            </div>

            {[
              `I'm a junior at Princeton University studying Electrical & Computer Engineering and Applied Physics, with minors in Computer Science and Finance. My work sits at the intersection of hardware, software, and markets — from superconducting qubit research to equity derivatives trading.`,
              `At the de Leon Lab, I characterize superconducting tantalum alloys (Ta/Re) for quantum device applications — fabricating resonators and performing XPS, SEM, and cryogenic transport measurements.`,
              `This past summer I was at HSBC on the equity derivatives desk and FX institutional sales, where I built Python trading tools for exotics pricing and analyzed client flow and systematic strategies in real time.`,
              `Before markets, I interned at FERC studying the impact of the May 2024 geomagnetic disturbance on the US power grid, developing neural networks (90% accuracy) for device fault detection. And before that, at Hanwha's Corporate Venture Capital team, sourcing and modeling 20+ cleantech and national security investments.`,
              `Outside the lab and office: an autonomous mini car with a custom KiCAD PCB and computer vision stack, quantum computing experiments on NMR and NV-center platforms from the ground up, and LLM-powered web apps. I'm drawn to systems where physics and software meet.`,
            ].map((text, i) => (
              <p key={i} className="text-[#bbb] text-[12px] leading-[1.7]">
                {text}
              </p>
            ))}
          </div>

          {/* Right: key:value + links */}
          <div className="space-y-4 overflow-y-auto">
            <div className="text-[#FFA028] text-[11px] tracking-widest border-b border-[#222] pb-1">
              // DETAILS
            </div>

            <div className="space-y-[4px]">
              {ABOUT_KV.map(([k, v]) => (
                <div key={k} className="flex gap-2 text-[11px]">
                  <span className="text-[#FFA028] font-bold w-[72px] shrink-0">{k}:</span>
                  <span className="text-[#aaa] break-all">{v}</span>
                </div>
              ))}
            </div>

            <div className="text-[#FFA028] text-[11px] tracking-widest border-b border-[#222] pb-1 mt-4">
              // LINKS
            </div>

            <div className="space-y-[5px]">
              <a
                href={`mailto:${CONTACT.email}`}
                className="block text-[#00C805] text-[11px] hover:text-[#FFA028] transition-colors"
              >
                &gt; EMAIL: {CONTACT.email}
              </a>
              <a
                href={`https://${CONTACT.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#00C805] text-[11px] hover:text-[#FFA028] transition-colors"
              >
                &gt; LINKEDIN: {CONTACT.linkedin}
              </a>
              <a
                href={`https://${CONTACT.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#00C805] text-[11px] hover:text-[#FFA028] transition-colors"
              >
                &gt; GITHUB: {CONTACT.github}
              </a>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
