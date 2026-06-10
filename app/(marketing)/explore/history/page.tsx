"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

const CHAPTERS = [
  {
    era: "Ancient Roots",
    period: "3000 BCE – 500 BCE",
    heading: "Born from the Earth",
    body: `Long before iron was cast into weights, humans trained their bodies against nature itself. Ancient civilisations across Mesopotamia, Egypt, and the Indus Valley used bodyweight disciplines as the foundation of physical culture. Cave paintings and stone reliefs depict figures in handstands, balance holds, and dynamic leaping — not as sport, but as survival and ritual.`,
    accent: "#B8860B",
  },
  {
    era: "Vedic India",
    period: "1500 BCE – Present",
    heading: "The Sacred Body",
    body: `India's contribution to calisthenics is ancient and profound. The Vedas describe vyayam — systemic physical training — as inseparable from spiritual discipline. Hanuman, the divine devotee of the Ramayana, embodies the pinnacle of physical and mental mastery: leaping across oceans, moving mountains, his body an instrument of pure devotion and impossible strength. Dand (Hindu pushup) and Baithak (Hindu squat) remain foundational movements practiced for thousands of years. Akhadas — traditional wrestling gymnasiums — have trained the body through calisthenics since at least 1000 BCE.`,
    accent: "#8B2500",
  },
  {
    era: "Ancient Greece",
    period: "776 BCE – 146 BCE",
    heading: "Kalos Kagathos",
    body: `The Greeks coined the very word: kalós (beautiful) + sthénos (strength). For them, physical excellence was moral excellence. The gymnasium was a civic institution, as vital as the agora. Olympians trained exclusively through bodyweight: rope climbing, jumping, wrestling, and the pankration — a brutal full-body combat art. Philosophers like Plato wrote that the body's cultivation was prerequisite to the mind's. The Greek ideal — the harmonious, functional body — remains the standard calisthenics strives toward.`,
    accent: "#4A6741",
  },
  {
    era: "Military Traditions",
    period: "500 BCE – 1900 CE",
    heading: "Forged for War",
    body: `Roman legions built empires on the calisthenic foundation of their soldiers. Daily regimens of jumping, climbing, swimming, and bodyweight drills produced the world's most formidable armies. Across centuries, military cultures from the Shaolin monks of China to the Janissaries of the Ottoman Empire and the Prussian gymnastics movement of the 18th century preserved and refined these bodyweight traditions. Friedrich Ludwig Jahn — the "father of gymnastics" — systematised these movements into the modern parallel bars, rings, and horizontal bar apparatus.`,
    accent: "#3D3580",
  },
  {
    era: "Modern Revival",
    period: "1900 CE – Present",
    heading: "Street. Bar. Body.",
    body: `The 20th century saw calisthenics diverge into competitive gymnastics and military fitness — then converge again in the urban street workout movement of the 1990s and 2000s. Parks in New York, Moscow, and Mumbai became outdoor gymnasiums. The internet amplified it globally: bar athletes performing impossible human flags, planche pushups, and muscle-ups sparked a worldwide movement. Today, calisthenics is both ancient wisdom and radical modernity — requiring nothing but a body and gravity.`,
    accent: "#1A1A1A",
  },
]

const GLYPHS: string[] = ["⊕", "◈", "⊞", "◉", "⊗"]

function ChapterBlock({ chapter, index }: { chapter: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="chapter-block"
      style={{ "--accent": chapter.accent }}
    >
      <div className="chapter-meta">
        <span className="chapter-glyph">{GLYPHS[index % GLYPHS.length]}</span>
        <span className="chapter-era">{chapter.era}</span>
        <span className="chapter-period">{chapter.period}</span>
      </div>
      <h2 className="chapter-heading">{chapter.heading}</h2>
      <div className="chapter-rule" />
      <p className="chapter-body">{chapter.body}</p>
    </motion.div>
  )
}

export default function ExploreHistoryPage() {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -80])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.3,
        }
      )
      gsap.fromTo(
        ".hero-def",
        { opacity: 0 },
        { opacity: 1, duration: 1.4, delay: 1.0 }
      )
      gsap.fromTo(
        ".hero-scroll-hint",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1, delay: 1.8, ease: "power2.out" }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream: #F5F0E8;
          --ink: #1C1A17;
          --muted: #6B6560;
          --gold: #B8860B;
          --rule: rgba(28,26,23,0.15);
        }

        body { background: var(--cream); color: var(--ink); }

        .explore-history {
          font-family: 'Cormorant Garamond', Georgia, serif;
          background: var(--cream);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* ─── HERO ─── */
        .hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          padding: 0 2rem;
        }

        .hero-bg-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .hero-bg-lines::before,
        .hero-bg-lines::after {
          content: '';
          position: absolute;
          background: var(--rule);
        }
        .hero-bg-lines::before {
          width: 1px;
          top: 0; bottom: 0;
          left: 50%;
        }
        .hero-bg-lines::after {
          height: 1px;
          left: 0; right: 0;
          top: 50%;
        }

        .hero-corner {
          position: absolute;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .hero-corner.tl { top: 2rem; left: 2rem; }
        .hero-corner.tr { top: 2rem; right: 2rem; text-align: right; }
        .hero-corner.bl { bottom: 2rem; left: 2rem; }
        .hero-corner.br { bottom: 2rem; right: 2rem; }

        .hero-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 2.5rem;
        }

        .hero-title {
          font-size: clamp(4rem, 12vw, 9rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 0.9;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .hero-title-row {
          overflow: hidden;
          display: block;
        }
        .hero-word {
          display: inline-block;
        }
        .hero-title em {
          font-style: italic;
          font-weight: 300;
        }

        .hero-def {
          max-width: 520px;
          margin: 2.5rem auto 0;
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--muted);
          font-style: italic;
          font-weight: 300;
          border-top: 1px solid var(--rule);
          padding-top: 1.5rem;
        }
        .hero-def strong {
          font-weight: 600;
          color: var(--ink);
          font-style: normal;
        }

        .hero-scroll-hint {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--muted), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }

        /* ─── CHAPTERS ─── */
        .chapters-container {
          max-width: 780px;
          margin: 0 auto;
          padding: 8rem 2rem 6rem;
        }

        .chapters-header {
          text-align: center;
          margin-bottom: 6rem;
        }
        .chapters-header h2 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 300;
          font-style: italic;
          letter-spacing: -0.01em;
          margin-bottom: 1rem;
        }
        .chapters-header p {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .chapter-block {
          position: relative;
          padding: 3rem 0 3rem 2.5rem;
          border-left: 2px solid var(--accent, var(--rule));
          margin-bottom: 4rem;
          transition: border-color 0.3s ease;
        }

        .chapter-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.2rem;
          flex-wrap: wrap;
        }
        .chapter-glyph {
          font-size: 1.2rem;
          color: var(--accent, var(--gold));
          line-height: 1;
        }
        .chapter-era {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent, var(--gold));
          font-weight: 700;
        }
        .chapter-period {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: var(--muted);
        }

        .chapter-heading {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 300;
          letter-spacing: -0.01em;
          line-height: 1.15;
          margin-bottom: 1rem;
        }

        .chapter-rule {
          width: 3rem;
          height: 1px;
          background: var(--accent, var(--rule));
          margin-bottom: 1.2rem;
        }

        .chapter-body {
          font-size: 1.1rem;
          line-height: 1.9;
          color: #3D3930;
          font-weight: 300;
          max-width: 640px;
        }

        /* ─── TIMELINE STRIP ─── */
        .timeline-strip {
          background: var(--ink);
          color: var(--cream);
          padding: 5rem 2rem;
          margin: 2rem 0;
          text-align: center;
        }
        .timeline-strip h3 {
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          font-weight: 300;
          font-style: italic;
          margin-bottom: 3rem;
          opacity: 0.7;
        }
        .timeline-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          flex-wrap: nowrap;
          overflow-x: auto;
          padding-bottom: 1rem;
          max-width: 760px;
          margin: 0 auto;
        }
        .timeline-dot {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }
        .timeline-dot-node {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--gold);
        }
        .timeline-dot-label {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.5);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          white-space: nowrap;
        }
        .timeline-line {
          flex: 1;
          min-width: 2rem;
          height: 1px;
          background: rgba(245,240,232,0.15);
        }

        /* ─── CTA ─── */
        .cta-section {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8rem 2rem;
          position: relative;
        }
        .cta-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 6rem;
          background: linear-gradient(to bottom, transparent, var(--rule));
        }

        .cta-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 2rem;
        }
        .cta-heading {
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .cta-heading em {
          font-style: italic;
        }
        .cta-sub {
          font-size: 1.15rem;
          color: var(--muted);
          font-style: italic;
          margin-bottom: 3.5rem;
          max-width: 460px;
          line-height: 1.7;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background: var(--ink);
          color: var(--cream);
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 1.1rem 2.5rem;
          border: 1px solid var(--ink);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gold);
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cta-btn:hover::before {
          transform: translateX(0);
        }
        .cta-btn span {
          position: relative;
          z-index: 1;
        }
        .cta-btn:hover {
          color: var(--cream);
          border-color: var(--gold);
        }
        .cta-btn .arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .cta-btn:hover .arrow {
          transform: translateX(6px);
        }

        @media (max-width: 640px) {
          .chapters-container { padding: 5rem 1.25rem 4rem; }
          .chapter-block { padding-left: 1.5rem; }
          .timeline-dots { gap: 0; }
        }
      `}</style>

      <div className="explore-history" ref={containerRef}>
        {/* ── HERO ── */}
        <motion.section
          className="hero"
          ref={heroRef}
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <div className="hero-bg-lines" />
          <span className="hero-corner tl">Explore / History</span>
          <span className="hero-corner tr">Est. 3000 BCE</span>
          <span className="hero-corner bl">Scroll to begin</span>
          <span className="hero-corner br">καλός + σθένος</span>

          <p className="hero-eyebrow">The Study of Movement</p>

          <h1 className="hero-title">
            <span className="hero-title-row">
              <span className="hero-word">Calis</span>
            </span>
            <span className="hero-title-row">
              <span className="hero-word">
                <em>thenics</em>
              </span>
            </span>
          </h1>

          <p className="hero-def">
            From the Greek <strong>kalós</strong> (beautiful) and{" "}
            <strong>sthénos</strong> (strength). The discipline of sculpting the
            body through movement alone — no iron, no machine — only gravity and
            will.
          </p>

          <div className="hero-scroll-hint">
            <div className="scroll-line" />
            <span>Scroll</span>
          </div>
        </motion.section>

        {/* ── CHAPTERS ── */}
        <section className="chapters-container">
          <div className="chapters-header">
            <h2>Five Thousand Years of Mastery</h2>
            <p>A lineage carried in the body across civilisations</p>
          </div>

          {CHAPTERS.map((chapter, i) => (
            <ChapterBlock key={i} chapter={chapter} index={i} />
          ))}
        </section>

        {/* ── TIMELINE STRIP ── */}
        <div className="timeline-strip">
          <h3>The unbroken thread</h3>
          <div className="timeline-dots">
            {[
              ["3000 BCE", "Ancient Egypt"],
              ["1500 BCE", "Vedic India"],
              ["776 BCE", "Olympia"],
              ["300 BCE", "Rome"],
              ["700 CE", "Shaolin"],
              ["1811 CE", "Jahn's Turnplatz"],
              ["1990s", "Street Workout"],
              ["2020s", "Global Revival"],
            ].map(([year, label], i, arr) => (
              <>
                <div className="timeline-dot" key={year}>
                  <div className="timeline-dot-node" />
                  <span className="timeline-dot-label">
                    {year} · {label}
                  </span>
                </div>
                {i < arr.length - 1 && <div className="timeline-line" />}
              </>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <section className="cta-section">
          <p className="cta-eyebrow">Next Chapter</p>
          <h2 className="cta-heading">
            Find Your
            <br />
            <em>Inspiration</em>
          </h2>
          <p className="cta-sub">
            From the divine strength of Hanumanji to the mythic physiques of
            Greek gods — discover the figures that have defined the ideal.
          </p>
          <Link href="/explore/inspiration" className="cta-btn">
            <span>Explore Inspiration</span>
            <span className="arrow">→</span>
          </Link>
        </section>
      </div>
    </>
  )
}
