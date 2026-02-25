import Panel from "@/components/Panel";
import { EDUCATION, EXPERIENCE, SKILLS } from "@/lib/data";

export default function ResumeView() {
  const downloadBtn = (
    <a
      href="/resume.pdf"
      download="DanielJung_Resume.pdf"
      className="bg-black text-[#FFA028] border border-black hover:border-[#FFA028] text-[10px] px-2 py-[1px] font-bold tracking-wide transition-colors"
    >
      ↓ PDF
    </a>
  );

  return (
    <div className="w-full h-full p-[2px]">
      <Panel
        title="RESUME — CV [DJUNG]   <GO>"
        className="h-full"
        titleRight={downloadBtn}
      >
        <div className="p-3 max-w-4xl space-y-6 text-[12px]">

          {/* Education */}
          <section>
            <div className="text-[#FFA028] text-[11px] tracking-widest border-b border-[#222] pb-1 mb-3">
              EDUCATION
            </div>
            {EDUCATION.map((e, i) => (
              <div key={i} className="mb-4 pl-3 border-l-2 border-[#1a1a1a]">
                <div className="text-[#FFA028] font-bold">{e.school}</div>
                <div className="text-[#777] text-[11px] mt-[2px]">
                  {e.degree}  |  {e.period}
                </div>
                <ul className="mt-[4px] space-y-[2px]">
                  <li className="text-[#bbb] pl-3 relative before:content-['▸'] before:absolute before:left-0 before:text-[#FFA028]">
                    {e.detail}
                  </li>
                  <li className="text-[#bbb] pl-3 relative before:content-['▸'] before:absolute before:left-0 before:text-[#FFA028]">
                    {e.notes}
                  </li>
                </ul>
              </div>
            ))}
          </section>

          {/* Experience */}
          <section>
            <div className="text-[#FFA028] text-[11px] tracking-widest border-b border-[#222] pb-1 mb-3">
              WORK EXPERIENCE
            </div>
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="mb-5 pl-3 border-l-2 border-[#1a1a1a]">
                <div className="text-[#FFA028] font-bold">
                  {exp.company}  —  {exp.role}
                </div>
                <div className="text-[#777] text-[11px] mt-[2px] mb-[4px]">
                  {exp.period}
                </div>
                <ul className="space-y-[3px]">
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="text-[#bbb] pl-3 relative before:content-['▸'] before:absolute before:left-0 before:text-[#FFA028] leading-[1.6]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section>
            <div className="text-[#FFA028] text-[11px] tracking-widest border-b border-[#222] pb-1 mb-3">
              SKILLS &amp; INTERESTS
            </div>
            <div className="pl-3 border-l-2 border-[#1a1a1a] grid gap-[4px]"
              style={{ gridTemplateColumns: "auto 1fr" }}>
              {SKILLS.map(([k, v]) => (
                <>
                  <span key={`k-${k}`} className="text-[#FFA028] font-bold pr-4 whitespace-nowrap">{k}:</span>
                  <span key={`v-${k}`} className="text-[#bbb]">{v}</span>
                </>
              ))}
            </div>
          </section>
        </div>
      </Panel>
    </div>
  );
}
