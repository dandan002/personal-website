export type ViewName = "home" | "about" | "resume" | "projects" | "contact";

export interface Instrument {
  symbol: string;
  name: string;
  price: number;
  change: number; // % change shown before first API response
}

export interface LiveInstrument extends Instrument {
  direction: "up" | "down" | "flat";
  flashKey: number; // incremented to retrigger CSS animation
}

export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  detail: string;
  notes: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface ProjectEntry {
  title: string;
  tags: string[];
  desc: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  location: string;
}
