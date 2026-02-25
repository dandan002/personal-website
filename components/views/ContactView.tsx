"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Panel from "@/components/Panel";
import { CONTACT } from "@/lib/data";

const BOOT_LINES = [
  "> INITIATING CONTACT PROTOCOL...",
  "> ESTABLISHING SECURE CHANNEL...",
  "> AUTHENTICATION: DJUNG_TERMINAL_v2.0",
  "> READY. CHANNEL OPEN.",
];

export default function ContactView() {
  const [bootText, setBootText] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const bootRef = useRef(false);

  useEffect(() => {
    if (bootRef.current) return;
    bootRef.current = true;

    let lineIdx = 0;
    let charIdx = 0;
    const lines: string[] = [];

    const tick = () => {
      if (lineIdx >= BOOT_LINES.length) {
        setTimeout(() => setBootDone(true), 300);
        return;
      }

      const line = BOOT_LINES[lineIdx];
      if (charIdx === 0) lines.push("");

      lines[lineIdx] = line.slice(0, charIdx + 1);
      setBootText([...lines]);

      charIdx++;
      if (charIdx >= line.length) {
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, 200);
      } else {
        setTimeout(tick, 18);
      }
    };

    tick();
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("ERR: ALL FIELDS REQUIRED");
      return;
    }
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setStatus("MSG: COMPOSE WINDOW OPENED");
  }

  const inputClass =
    "bg-[#0a0a0a] border border-[#333] text-[#bbb] text-[12px] px-2 py-[4px] outline-none font-mono focus:border-[#FFA028] transition-colors w-full caret-[#FFA028] placeholder-[#333]";

  return (
    <div className="w-full h-full p-[2px]">
      <Panel title="CONTACT — MSG [DJUNG]   <GO>" className="h-full">
        <div className="p-4 space-y-5">

          {/* Boot sequence */}
          <div className="space-y-[2px]">
            {bootText.map((line, i) => (
              <div key={i} className="text-[#00C805] text-[12px] font-mono">
                {line}
                {i === bootText.length - 1 && !bootDone && (
                  <span className="cursor-blink ml-[2px]">█</span>
                )}
              </div>
            ))}
          </div>

          {/* Content — fades in after boot */}
          {bootDone && (
            <div
              className="grid gap-8"
              style={{ gridTemplateColumns: "260px 1fr" }}
            >
              {/* Contact info */}
              <div className="space-y-4">
                <div className="text-[#FFA028] text-[11px] tracking-widest border-b border-[#222] pb-1">
                  // CONTACT INFO
                </div>
                <div className="space-y-[6px]">
                  {[
                    { label: "EMAIL",    value: CONTACT.email,    href: `mailto:${CONTACT.email}` },
                    { label: "LINKEDIN", value: CONTACT.linkedin, href: `https://${CONTACT.linkedin}` },
                    { label: "GITHUB",   value: CONTACT.github,   href: `https://${CONTACT.github}` },
                    { label: "LOCATION", value: CONTACT.location, href: undefined },
                  ].map(({ label, value, href }) => (
                    <div key={label} className="text-[11px]">
                      <span className="text-[#FFA028] font-bold">{label}: </span>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-[#00C805] hover:text-[#FFA028] transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-[#aaa]">{value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Send message form */}
              <div className="space-y-4 max-w-[480px]">
                <div className="text-[#FFA028] text-[11px] tracking-widest border-b border-[#222] pb-1">
                  // SEND MESSAGE
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex gap-3 items-center">
                    <label className="text-[#FFA028] font-bold text-[11px] w-[52px] shrink-0">NAME:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className={inputClass}
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex gap-3 items-center">
                    <label className="text-[#FFA028] font-bold text-[11px] w-[52px] shrink-0">EMAIL:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={inputClass}
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex gap-3 items-start">
                    <label className="text-[#FFA028] font-bold text-[11px] w-[52px] shrink-0 pt-[5px]">MSG:</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message..."
                      rows={5}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-[52px] shrink-0" />
                    <button
                      type="submit"
                      className="border border-[#FFA028] text-[#FFA028] text-[12px] px-4 py-[4px] hover:bg-[#FFA028] hover:text-black transition-colors font-bold tracking-wide cursor-pointer"
                    >
                      &gt; SEND &lt;ENTER&gt;
                    </button>
                    {status && (
                      <span className="text-[#00C805] text-[11px]">{status}</span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </Panel>
    </div>
  );
}
