import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import { PERSONAL, EDUCATION, EXPERIENCE, SKILLS, FALLBACK_PROJECTS } from "@/lib/data";

interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  topics?: string[];
}

async function getRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/danieljung/repos?sort=updated&per_page=12&type=public",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("GitHub API error");
    const data: GithubRepo[] = await res.json();
    return data.filter((r) => !r.fork && r.description).slice(0, 6);
  } catch {
    return FALLBACK_PROJECTS as GithubRepo[];
  }
}

export default async function Home() {
  const repos = await getRepos();

  return (
    <>
      <Nav />

      <main id="top" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2rem" }}>

        {/* ── Hero ── */}
        <section
          style={{
            minHeight: "100svh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: "6rem",
            paddingBottom: "4rem",
          }}
        >
          <ScrollReveal>
            <p className="section-label">Based in Princeton, NJ</p>
            <h1
              className="display-heading"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", marginBottom: "1.5rem" }}
            >
              {PERSONAL.name}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                fontWeight: 500,
                color: "var(--color-muted)",
                marginBottom: "2rem",
                letterSpacing: "-0.01em",
              }}
            >
              {PERSONAL.title}
            </p>
            <p
              style={{
                maxWidth: "540px",
                color: "var(--color-muted)",
                lineHeight: 1.7,
                marginBottom: "3rem",
                fontSize: "13px",
              }}
            >
              {PERSONAL.bio}
            </p>

            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              <a href={`mailto:${PERSONAL.email}`} className="link" style={{ fontSize: "12px" }}>
                Email
              </a>
              <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="link" style={{ fontSize: "12px" }}>
                GitHub
              </a>
              <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="link" style={{ fontSize: "12px" }}>
                LinkedIn
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="link" style={{ fontSize: "12px", color: "var(--color-accent)", borderColor: "var(--color-accent)" }}>
                Resume ↓
              </a>
            </div>
          </ScrollReveal>

          {/* scroll hint */}
          <div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              opacity: 0.3,
            }}
          >
            <div
              style={{
                width: "1px",
                height: "40px",
                background: "var(--color-muted)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
          </div>
        </section>

        <hr className="divider" />

        {/* ── Resume ── */}
        <section
          id="resume"
          style={{ padding: "6rem 0" }}
        >
          <ScrollReveal>
            <p className="section-label">Experience & Education</p>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "4rem",
            }}
          >
            {/* Education */}
            <div>
              <ScrollReveal delay={100}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "16px",
                    marginBottom: "2rem",
                    color: "var(--color-text)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Education
                </h2>
              </ScrollReveal>

              <ScrollReveal stagger delay={150}>
                {EDUCATION.map((edu) => (
                  <div key={edu.school} style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                    <div className="timeline-dot" />
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "14px", marginBottom: "2px" }}>
                        {edu.school}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--color-muted)", marginBottom: "4px" }}>
                        {edu.degree}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--color-muted)", marginBottom: "8px" }}>
                        {edu.minor}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--color-accent)", letterSpacing: "0.05em", marginBottom: "8px" }}>
                        {edu.period}
                      </div>
                      {edu.details.map((d) => (
                        <div key={d} style={{ fontSize: "11px", color: "var(--color-muted)", marginBottom: "2px" }}>
                          — {d}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Skills */}
                <div style={{ marginTop: "2.5rem" }}>
                  <div style={{ fontSize: "11px", color: "var(--color-muted)", marginBottom: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Skills
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ fontSize: "10px", color: "var(--color-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginRight: "8px" }}>Languages</span>
                    <span style={{ fontSize: "12px" }}>{SKILLS.languages.join(", ")}</span>
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ fontSize: "10px", color: "var(--color-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginRight: "8px" }}>Tools</span>
                    <span style={{ fontSize: "12px" }}>{SKILLS.tools.join(", ")}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "10px", color: "var(--color-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginRight: "8px" }}>Spoken</span>
                    <span style={{ fontSize: "12px" }}>{SKILLS.spoken.join(", ")}</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Experience */}
            <div>
              <ScrollReveal delay={100}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "16px",
                    marginBottom: "2rem",
                    color: "var(--color-text)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Experience
                </h2>
              </ScrollReveal>

              <ScrollReveal stagger delay={150}>
                {EXPERIENCE.map((exp) => (
                  <div key={exp.org + exp.period} style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                    <div className="timeline-dot" />
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "14px", marginBottom: "2px" }}>
                        {exp.role}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--color-muted)", marginBottom: "4px" }}>
                        {exp.org}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--color-accent)", letterSpacing: "0.05em", marginBottom: "8px" }}>
                        {exp.period}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--color-muted)", lineHeight: 1.6 }}>
                        {exp.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ── Projects ── */}
        <section
          id="projects"
          style={{ padding: "6rem 0" }}
        >
          <ScrollReveal>
            <p className="section-label">GitHub Projects</p>
          </ScrollReveal>

          <ScrollReveal stagger delay={100}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1px",
                border: "1px solid var(--color-border)",
                overflow: "hidden",
              }}
            >
              {repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card"
                  style={{ display: "block", textDecoration: "none" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "var(--color-text)",
                      marginBottom: "8px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {repo.name}
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--color-muted)",
                      lineHeight: 1.6,
                      marginBottom: "1.25rem",
                      flexGrow: 1,
                    }}
                  >
                    {repo.description || "No description provided."}
                  </p>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    {repo.language && (
                      <span className="tag">{repo.language}</span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span style={{ fontSize: "11px", color: "var(--color-muted)" }}>
                        ★ {repo.stargazers_count}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div style={{ marginTop: "2rem", textAlign: "right" }}>
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                style={{ fontSize: "11px" }}
              >
                View all on GitHub →
              </a>
            </div>
          </ScrollReveal>
        </section>

        <hr className="divider" />

        {/* ── Contact / Footer ── */}
        <section
          id="contact"
          style={{ padding: "6rem 0 4rem" }}
        >
          <ScrollReveal>
            <p className="section-label">Get in touch</p>
            <h2
              className="display-heading"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", marginBottom: "1.25rem" }}
            >
              Let&apos;s talk.
            </h2>
            <p style={{ fontSize: "13px", color: "var(--color-muted)", maxWidth: "400px", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Open to research collaborations, internships, and interesting projects.
            </p>

            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "4rem" }}>
              <a href={`mailto:${PERSONAL.email}`} className="link" style={{ fontSize: "13px" }}>
                {PERSONAL.email}
              </a>
              <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="link" style={{ fontSize: "13px" }}>
                LinkedIn
              </a>
              <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="link" style={{ fontSize: "13px" }}>
                GitHub
              </a>
            </div>
          </ScrollReveal>

          <hr className="divider" style={{ marginBottom: "2rem" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "11px", color: "var(--color-muted)", letterSpacing: "0.04em" }}>
              © 2026 Daniel Jung
            </span>
            <span style={{ fontSize: "11px", color: "var(--color-muted)", letterSpacing: "0.04em" }}>
              Princeton, NJ
            </span>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.6; transform: scaleY(0.7); }
        }
      `}</style>
    </>
  );
}
