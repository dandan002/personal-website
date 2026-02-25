import type {
  Instrument,
  EducationEntry,
  ExperienceEntry,
  ProjectEntry,
  ContactInfo,
} from "./types";

// ── Market Data Seeds ────────────────────────────────────────
export const EQUITIES: Instrument[] = [
  { symbol: "SPX",  name: "S&P 500",       price: 5780.00,  change: +0.34 },
  { symbol: "NDX",  name: "NASDAQ 100",    price: 20410.00, change: +0.51 },
  { symbol: "DJIA", name: "Dow Jones",     price: 43100.00, change: -0.12 },
  { symbol: "VIX",  name: "Volatility",    price: 15.82,    change: -2.10 },
  { symbol: "IWM",  name: "Russell 2000",  price: 2190.00,  change: +0.19 },
];

export const CRYPTO: Instrument[] = [
  { symbol: "BTC",  name: "Bitcoin",       price: 97800.00, change: +1.22 },
  { symbol: "ETH",  name: "Ethereum",      price: 2710.00,  change: +0.88 },
  { symbol: "SOL",  name: "Solana",        price: 184.40,   change: -0.44 },
  { symbol: "XRP",  name: "Ripple",        price: 2.340,    change: +2.11 },
  { symbol: "BNB",  name: "Binance Coin",  price: 640.00,   change: -0.33 },
];

export const FX: Instrument[] = [
  { symbol: "EUR/USD", name: "Euro / USD",    price: 1.0481, change: -0.09 },
  { symbol: "USD/JPY", name: "USD / Yen",     price: 149.82, change: +0.21 },
  { symbol: "GBP/USD", name: "Cable",         price: 1.2594, change: -0.15 },
  { symbol: "DXY",     name: "Dollar Index",  price: 107.18, change: +0.18 },
  { symbol: "10Y UST", name: "US 10yr Yield", price: 4.482,  change: +0.03 },
];

// Brownian motion volatility per symbol
export const VOLATILITY: Record<string, number> = {
  SPX:     0.0006,
  NDX:     0.0008,
  DJIA:    0.0005,
  VIX:     0.0020,
  IWM:     0.0007,
  BTC:     0.0030,
  ETH:     0.0028,
  SOL:     0.0035,
  XRP:     0.0040,
  BNB:     0.0025,
  "EUR/USD": 0.0003,
  "USD/JPY": 0.0002,
  "GBP/USD": 0.0003,
  DXY:     0.0002,
  "10Y UST": 0.0005,
};
export const DEFAULT_VOL = 0.0008;

// ── Resume / Bio Content ─────────────────────────────────────
export const EDUCATION: EducationEntry[] = [
  {
    school: "Princeton University",
    degree: "B.S.E. Electrical & Computer Engineering + Applied Physics",
    period: "Aug 2022 – Expected May 2026",
    detail: "Minors: Computer Science, Finance",
    notes:  "Relevant Coursework: Computer Architecture, System Design, Robotic & Autonomous Systems",
  },
  {
    school: "Georgia Tech / Mill Creek HS — Dual Enrollment",
    degree: "Dual Enrollment Program",
    period: "Aug 2020 – May 2022",
    detail: "National Merit Scholar | Rotary Youth Leadership Award | Jim Steele Environmental Scholarship",
    notes:  "Relevant Coursework: Linear Algebra, Multivariable Calculus, Applied Combinatorics, Differential Equations",
  },
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Princeton University — de Leon Lab",
    role:    "Undergraduate Researcher",
    period:  "Sept 2025 – Present  [9 hrs/wk]",
    bullets: [
      "Characterized the impact of oxides on the superconducting properties of tantalum alloys (Ta/Re).",
      "Fabricated resonators for XPS, SEM analysis and T_C, Q factor measurement.",
    ],
  },
  {
    company: "HSBC",
    role:    "Markets Summer Analyst",
    period:  "June 2025 – Aug 2025  [50 hrs/wk]",
    bullets: [
      "Worked on equity derivatives trading and FX institutional sales (derivatives-focus).",
      "Developed internal trading tools (Python) to assist exotics pricing.",
      "Performed analytics on client flow and systematic strategies.",
    ],
  },
  {
    company: "Federal Energy Regulatory Commission (FERC)",
    role:    "Data Intern",
    period:  "June 2024 – Aug 2024  [50 hrs/wk]",
    bullets: [
      "Used data from 500+ monitors to study the May 2024 geomagnetic disturbance and its grid impact.",
      "Developed 90% accurate neural networks to detect device faults and identify blind spots.",
      "Modeled event trends and potential transmission impacts using ArcGIS, Python, and other tools.",
    ],
  },
  {
    company: "Hanwha Corporation",
    role:    "Summer Analyst, Corporate Venture Capital",
    period:  "June 2023 – Aug 2023  [60 hrs/wk]",
    bullets: [
      "Sourced and modeled 20+ potential investments in the clean-tech and national security spaces.",
      "Modeled the post-acquisition impact of Hanwha Ocean (previously DSME) with potential ancillary acquisitions.",
    ],
  },
];

export const SKILLS: [string, string][] = [
  ["Technical",   "C, C++, Python, MS SQL, LaTeX, MATLAB, Git, Docker, UNIX Systems"],
  ["Languages",   "English (Native), Korean (TOPIK Level 6)"],
  ["Interests",   "Embedded Systems, Neural Networks, Compilers"],
];

export const PROJECTS: ProjectEntry[] = [
  {
    title: "Experimental Methods in Quantum Computing",
    tags:  ["Quantum", "NMR", "NV Centers", "Photonics", "Python", "GUI"],
    desc:  "Wrote control and analysis code for a basic NMR qubit setup manipulating protons/hydrogen ions. Created a GUI to perform state measurements on NV centers (Rabi cycles, T₁, T₂). Performed bell-state measurements using photonic qubits.",
  },
  {
    title: "Autonomous Mini Car",
    tags:  ["Embedded", "C", "Python", "KiCAD", "PSoC", "Computer Vision"],
    desc:  "Designed a vehicle using hall effect sensors (speed), cameras (path sensing), and a PSoC (control) to navigate a course unmanned. Hardware and software fully self-designed — KiCAD PCB, C control logic, Python computer vision.",
  },
  {
    title: "readMe: Translation Assistant",
    tags:  ["React", "Tailwind", "Flask", "Gemini API", "Groq", "Vercel"],
    desc:  "Integrated Google Gemini and Groq APIs to build an LLM-powered translation assistant for language learners. React/Tailwind front-end with a Flask back-end, both hosted on Vercel.",
  },
];

export const CONTACT: ContactInfo = {
  email:    "danieljung@princeton.edu",
  linkedin: "linkedin.com/in/daniel-jung",
  github:   "github.com/danieljung",
  location: "Princeton, NJ / Atlanta, GA",
};

export const ABOUT_KV: [string, string][] = [
  ["SCHOOL",    "Princeton University"],
  ["DEGREE",    "B.S.E. ECE + Applied Physics"],
  ["CLASS",     "'26"],
  ["MINOR",     "Computer Science, Finance"],
  ["LANGUAGES", "English, Korean (TOPIK 6)"],
  ["LOCATION",  "Princeton, NJ"],
  ["EMAIL",     "danieljung@princeton.edu"],
  ["GITHUB",    "github.com/danieljung"],
];
