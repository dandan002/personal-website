"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "1.25rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.3s ease, border-color 0.3s ease",
        background: scrolled ? "rgba(13, 13, 11, 0.9)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <a
        href="#top"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "15px",
          color: "var(--color-text)",
          textDecoration: "none",
          letterSpacing: "-0.01em",
        }}
      >
        DJ
      </a>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <a href="#resume" className="nav-link">Resume</a>
        <a href="#projects" className="nav-link">Projects</a>
        <a href="#food" className="nav-link">Food</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>
    </nav>
  );
}
