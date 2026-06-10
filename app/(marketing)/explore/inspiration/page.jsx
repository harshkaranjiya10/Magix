"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"

import hanuman from "@/lib/bodyAesthenics/h4.jpg"
import greekGod from "@/lib/bodyAesthenics/Greek1.webp"
import wolverine from "@/lib/bodyAesthenics/w.jpg"

gsap.registerPlugin(ScrollTrigger)

// ─── DATA ────────────────────────────────────────────────────
const INSPIRATIONS = [
  {
    id: "hanuman",
    name: "Hanumanji",
    title: "The Divine Athlete",
    tagline: "Infinite Strength, Complete Devotion",
    accent: "#C84B11",
    accentLight: "#FDF0E8",
    image: { src: hanuman },
    description:
    "In the Ramayana, Hanuman represents the absolute zenith of physical and spiritual mastery. Son of the Wind God Vayu, he is the embodiment of brahmacharya — the disciplined life that unlocks superhuman potential. He leaps across the ocean to Lanka in a single bound, carries an entire mountain, and yet bows in total humility. For the calisthenics practitioner, Hanuman teaches that true strength is in service, not ego.",
    attributes: [
      { label: "Domain", value: "Devotion · Strength · Flight" },
      { label: "Origin", value: "Vedic India, 5000+ BCE oral tradition" },
      { label: "Symbol", value: "The Leap Across the Ocean" },
      {
        label: "Training Ideal",
        value: "Brahmacharya — disciplined celibacy as energy source",
      },
    ],
    slides: [
      {
        title: "The Cosmic Leap",
        body: "From the southern tip of India to Lanka — a single leap that defied impossibility. In calisthenics, every muscle-up, every planche, begins with the willingness to attempt the impossible.",
        color: "#C84B11",
      },
      {
        title: "The Mountain Bearer",
        body: "When medicine was needed, he did not ask which herb — he lifted the entire mountain. Calisthenics teaches the same principle: build total capacity, not narrow specialisation.",
        color: "#9B3A0C",
      },
      {
        title: "The Vijay Mudra",
        body: "Hanuman's physique in classical sculpture — wide-backed, deep-chested, with forearms like iron — mirrors the body built by pulling and pushing against pure resistance.",
        color: "#E86D3A",
      },
      {
        title: "Devotion as Training",
        body: "He never trained for himself. Every feat was an act of service. This is the highest calisthenic philosophy: the body as a vessel for something greater than itself.",
        color: "#7A2E09",
      },
    ],
  },
  {
    id: "wolverine",
    name: "Wolverine",
    title: "The Adamantine Will",
    tagline: "What the Mind Endures, the Body Becomes",
    accent: "#1A1A2E",
    accentLight: "#F0F0F8",
    image: { src: wolverine },
    description:
      "Logan's physique is not aesthetic — it is functional. He is compact, dense, explosive. Every muscle serves a purpose. The character embodies the philosophy that a body forged through adversity becomes something that cannot be broken. Hugh Jackman's 2013 transformation for 'The Wolverine' became a watershed moment in modern calisthenics culture: weighted pull-ups, gymnastic ring work, and bodyweight conditioning at its most extreme.",
    attributes: [
      { label: "Domain", value: "Resilience · Power · Compactness" },
      { label: "Origin", value: "Marvel Comics, 1974 / Cultural Icon" },
      { label: "Symbol", value: "The Unbreakable" },
      {
        label: "Training Ideal",
        value: "Hypertrophy through relative strength",
      },
    ],
    slides: [
      {
        title: "Density, Not Size",
        body: "Wolverine is not the biggest — he is the most capable. Calisthenics builds the same: a body with extraordinary strength-to-weight ratio, hard and functional.",
        color: "#1A1A2E",
      },
      {
        title: "The Jackman Protocol",
        body: "Hugh Jackman's trainer used high-intensity weighted pull-ups and ring gymnastics to build the iconic silhouette. Pure pulling strength — the calisthenic ideal.",
        color: "#2C2C4A",
      },
      {
        title: "Regeneration as Metaphor",
        body: "Every training session is micro-destruction and repair. Muscles torn and rebuilt, denser each time. Wolverine's healing factor is simply evolution's process, accelerated.",
        color: "#3E3E66",
      },
      {
        title: "The Low Centre of Power",
        body: "Short, wide, rooted. The planche hold, the L-sit, the human flag — all demand the same: a low centre of gravity, full-body tension, and iron grip strength.",
        color: "#14142A",
      },
    ],
  },
  {
    id: "greek-god",
    name: "Greek Gods",
    title: "Kalos Kagathos",
    tagline: "Beautiful in Body, Noble in Soul",
    accent: "#4A6741",
    accentLight: "#EEF4EC",
    image: { src: greekGod },
    description:
      "The ancient Greeks believed the body and soul were mirrors of each other — Kalos Kagathos: 'beautiful and good.' Their gods — Heracles, Apollo, Ares — were not fantasies of excess but ideals of proportion. The classical Greek sculpture canon codified the perfect male physique: broad shoulders tapering to narrow hips, visible musculature without grotesque size, an ease in the body that suggests both power and grace. This is the calisthenics physique.",
    attributes: [
      { label: "Domain", value: "Proportion · Grace · Power" },
      { label: "Origin", value: "Classical Greece, 500–300 BCE" },
      { label: "Symbol", value: "The Contrapposto Stance" },
      {
        label: "Training Ideal",
        value: "Symmetry — no muscle dominates another",
      },
    ],
    slides: [
      {
        title: "The Canon of Polykleitos",
        body: "Sculptor Polykleitos wrote 'The Canon' — a mathematical treatise on ideal human proportions. His Doryphoros (Spear-Bearer) remains the definitive blueprint for the athletic body.",
        color: "#4A6741",
      },
      {
        title: "Apollo's Physique",
        body: "Apollo — god of reason, music, and light — was depicted lean, defined, and luminous. Not a warrior's build, but an artist's: capable, precise, and effortless in appearance.",
        color: "#3A5231",
      },
      {
        title: "Heracles' Twelve Labours",
        body: "Each labour demanded a different physical quality: speed, endurance, raw power, agility. Calisthenics, like Heracles' training, demands completeness — no single quality can be neglected.",
        color: "#5A7A51",
      },
      {
        title: "The Gymnasium as Temple",
        body: "Greek gymnasia were sacred spaces. Physical practice was civic duty, spiritual discipline, and philosophical act simultaneously. The bar athlete's park echoes this ancient understanding.",
        color: "#2E4228",
      },
    ],
  },
  /* {
    id: "spartan",
    name: "Spartan Warrior",
    title: "The Warrior Code",
    tagline: "With This Shield — or On It",
    accent: "#8B0000",
    accentLight: "#F8ECEC",
    description:
      "Spartan agoge — the training programme begun at age 7 — was the ancient world's most systematic bodyweight conditioning programme. Running, wrestling, swimming, gymnastics: all without equipment, all using the body's own resistance. Spartan women trained alongside men. The result was not aesthetic but lethal: compact bodies with extraordinary endurance, explosive power, and psychological fortitude that made them the most feared warriors in history.",
    attributes: [
      { label: "Domain", value: "Endurance · Will · Tactical Power" },
      { label: "Origin", value: "Sparta, Greece, 800–146 BCE" },
      { label: "Symbol", value: "The Shield Wall" },
      {
        label: "Training Ideal",
        value: "Agoge — total physical and mental conditioning",
      },
    ],
    slides: [
      {
        title: "The Agoge",
        body: "From age 7, Spartan boys entered the agoge: barefoot running, cold exposure, wrestling, gymnastics. The world's first documented calisthenics programme, producing its most formidable results.",
        color: "#8B0000",
      },
      {
        title: "Lean and Lethal",
        body: "Spartans were not bodybuilders — they were instruments. Every gram of muscle served a tactical purpose. The modern calisthenics athlete inherits this principle: strength that works, not strength that displays.",
        color: "#6B0000",
      },
      {
        title: "The Women of Sparta",
        body: "Spartan women performed the same physical training as men. History's first recorded female athletic tradition, producing what contemporaries described as uniquely powerful and healthy physiques.",
        color: "#A81010",
      },
      {
        title: "Thermopylae",
        body: "Three hundred men held a pass against an empire because their bodies were limitless and their minds were unbreakable. The training made the miracle. The training always makes the miracle.",
        color: "#500000",
      },
    ],
  }, */
  {
    id: "gymnast",
    name: "Olympic Gymnast",
    title: "Pure Relative Strength",
    tagline: "Pound for Pound, the Strongest Humans Alive",
    accent: "#1B3A6B",
    accentLight: "#EBF0F8",
    description:
      "Gymnasts represent the outer limit of what the human body can achieve through calisthenics. The iron cross, the planche, the Maltese — movements demanding strength-to-weight ratios that dwarf powerlifters, weight for weight. Olympic gymnasts train for 35+ hours per week, often from childhood, producing bodies that are simultaneously the most muscular and the most graceful. They are the living proof of calisthenics' ultimate promise.",
    attributes: [
      { label: "Domain", value: "Strength-to-Weight · Precision · Artistry" },
      { label: "Origin", value: "Ancient Greece / Modern Olympics, 1896" },
      { label: "Symbol", value: "The Iron Cross" },
      {
        label: "Training Ideal",
        value: "Straight-arm strength — the highest calisthenic expression",
      },
    ],
    slides: [
      {
        title: "The Iron Cross",
        body: "Arms extended horizontally, body suspended between two rings, gravity pulling down with full force. The iron cross requires a level of shoulder strength that takes years to develop — and seconds to appreciate.",
        color: "#1B3A6B",
      },
      {
        title: "The Planche",
        body: "Horizontal to the ground, arms locked, no feet touching anything. Physics says it shouldn't be possible. Gymnasts do it for 2-second holds in competition. Calisthenics athletes spend years in pursuit of one second.",
        color: "#142D55",
      },
      {
        title: "Straight-Arm Strength",
        body: "Most humans never develop straight-arm pulling strength. Gymnasts develop it to an extreme that makes every other form of athletics look underprepared. It is the final frontier of bodyweight training.",
        color: "#254A80",
      },
      {
        title: "The Youngest Bodies, the Oldest Discipline",
        body: "Gymnastics produces peak athleticism in the late teens — bodies at the limit of what adaptation can achieve. Ancient Greek Olympic gymnasts competed in the same movements. The human body has not changed. The ceiling has not moved.",
        color: "#0D2040",
      },
    ],
  },
]

// ─── SLIDE COMPONENT ─────────────────────────────────────────
function InspirationSection({ inspiration, index }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const isEven = index % 2 === 0

  return (
    <motion.section
      ref={ref}
      className="inspiration-section"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        "--sect-accent": inspiration.accent,
        "--sect-accent-light": inspiration.accentLight,
      }}
    >
      {/* ── INDEX LABEL ── */}
      <div className="sect-index">
        <span className="sect-num">0{index + 1}</span>
        <div className="sect-divider" />
      </div>

      {/* ── HERO ROW ── */}
      <div className={`sect-hero-row ${isEven ? "" : "reverse"}`}>
        {/* VISUAL BLOCK */}
        <div className="sect-visual">
          <Image src={hanuman} alt="Image" width={500} height={500} />
        </div>

        {/* TEXT BLOCK */}
        <div className="sect-text">
          <p className="sect-eyebrow">
            Inspiration · {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="sect-name">{inspiration.name}</h2>
          <p className="sect-title">{inspiration.title}</p>
          <p className="sect-tagline">"{inspiration.tagline}"</p>
          {/* <p className="sect-desc">{inspiration.description}</p> */}

          {/* Attributes */}
          {/* <div className="sect-attributes">
            {inspiration.attributes.map((attr) => (
              <div key={attr.label} className="sect-attr">
                <span className="sect-attr-label">{attr.label}</span>
                <span className="sect-attr-value">{attr.value}</span>
              </div>
            ))}
          </div> */}

          {/* ── SLIDE BLOCK ── */}
          <div className="slide-block">
            <div className="slide-tabs">
              {inspiration.slides.map((slide, i) => (
                <button
                  key={i}
                  className={`slide-tab ${activeSlide === i ? "active" : ""}`}
                  onClick={() => setActiveSlide(i)}
                  style={{ "--tab-color": slide.color }}
                >
                  <span className="tab-dot" />
                  <span className="tab-num">0{i + 1}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                className="slide-content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  borderLeftColor: inspiration.slides[activeSlide].color,
                }}
              >
                <h3 className="slide-title">
                  {inspiration.slides[activeSlide].title}
                </h3>
                <p className="slide-body">
                  {inspiration.slides[activeSlide].body}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slide nav arrows */}
            <div className="slide-nav">
              <button
                className="slide-arrow"
                onClick={() =>
                  setActiveSlide(
                    (p) =>
                      (p - 1 + inspiration.slides.length) %
                      inspiration.slides.length
                  )
                }
                aria-label="Previous"
              >
                ←
              </button>
              <span className="slide-counter">
                {String(activeSlide + 1).padStart(2, "0")} /{" "}
                {String(inspiration.slides.length).padStart(2, "0")}
              </span>
              <button
                className="slide-arrow"
                onClick={() =>
                  setActiveSlide((p) => (p + 1) % inspiration.slides.length)
                }
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// ─── PAGE ────────────────────────────────────────────────────
export default function ExploreInspirationPage() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".insp-hero-title",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, ease: "power4.out", delay: 0.2 }
      )
      gsap.fromTo(
        ".insp-hero-sub",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, delay: 0.9 }
      )
      gsap.fromTo(
        ".insp-hero-scroll",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.9, delay: 1.5 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&display=swap');

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        :root {
          --cream: #F5F0E8;
          --ink: #1C1A17;
          --muted: #6B6560;
          --gold: #B8860B;
          --rule: rgba(28,26,23,0.12);
        }

        body { background: var(--cream);  }

        .explore-inspiration {
          font-family: 'Cormorant Garamond', Georgia, serif;
          background: var(--cream);
          color: var(--ink);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ─── NAV ─── */
        .insp-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 2rem;
          background: rgba(245,240,232,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--rule);
        }
        .insp-nav-brand {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink);
          text-decoration: none;
        }
        .insp-nav-back {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.2s;
        }
        .insp-nav-back:hover { color: var(--ink); }

        /* ─── HERO ─── */
        .insp-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8rem 2rem 6rem;
          background: var(--ink);
          position: relative;
          overflow: hidden;
        }

        .insp-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(245,240,232,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,240,232,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .insp-hero-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 2rem;
          position: relative;
        }

        .insp-hero-title {
          font-size: clamp(3.5rem, 10vw, 8rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 0.95;
          color: var(--cream);
          margin-bottom: 1.5rem;
          position: relative;
        }
        .insp-hero-title em {
          font-style: italic;
          color: var(--gold);
        }

        .insp-hero-sub {
          max-width: 500px;
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(245,240,232,0.5);
          font-style: italic;
          font-weight: 300;
          margin: 0 auto;
          position: relative;
          border-top: 1px solid rgba(245,240,232,0.1);
          padding-top: 1.5rem;
        }

        .insp-hero-scroll {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.3);
        }
        .insp-scroll-line {
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, rgba(245,240,232,0.3), transparent);
          animation: scrollPulse 2.2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        /* ─── FIGURE GRID ─── */
        .figures-bar {
          background: var(--ink);
          border-top: 1px solid rgba(245,240,232,0.08);
          padding: 1.5rem 2rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          overflow-x: auto;
          position: sticky;
          top: 57px;
          z-index: 5;
        }
        .figures-bar-label {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.3);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .figures-bar-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          background: rgba(245,240,232,0.15);
        }
        .figures-bar a {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.5);
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: color 0.2s;
        }
        .figures-bar a:hover { color: var(--gold); }

        /* ─── INSPIRATION SECTIONS ─── */
        .inspiration-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 7rem 2rem 0;
        }

        .sect-index {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .sect-num {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--muted);
        }
        .sect-divider {
          flex: 1;
          height: 1px;
          background: var(--rule);
        }

        /* ── HERO ROW ── */
        .sect-hero-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
          margin-bottom: 3rem;
        }
        .sect-hero-row.reverse {
          direction: rtl;
        }
        .sect-hero-row.reverse > * {
          direction: ltr;
        }

        /* VISUAL */
        .sect-visual {
          position: relative;
        }
        .sect-visual-inner {
          position: relative;
          aspect-ratio: 4/5;
          overflow: hidden;
        }
        .sect-visual-bg {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .sect-svg-art {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
        }
        .sect-visual-name {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          font-style: italic;
          color: rgba(255,255,255,0.9);
          letter-spacing: -0.01em;
          line-height: 1;
          text-shadow: 0 2px 20px rgba(0,0,0,0.4);
        }

        /* TEXT */
        .sect-text {
          padding-top: 1rem;
        }
        .sect-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1rem;
        }
        .sect-name {
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1;
          margin-bottom: 0.4rem;
          color: var(--sect-accent, var(--ink));
        }
        .sect-title {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1.2rem;
        }
        .sect-tagline {
          font-size: 1.15rem;
          font-style: italic;
          color: var(--ink);
          margin-bottom: 1.5rem;
          opacity: 0.7;
          line-height: 1.5;
        }
        .sect-desc {
          font-size: 1.05rem;
          line-height: 1.9;
          color: #3D3930;
          font-weight: 300;
          margin-bottom: 2rem;
        }

        .sect-attributes {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          border-top: 1px solid var(--rule);
          padding-top: 1.2rem;
        }
        .sect-attr {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
          font-size: 0.9rem;
        }
        .sect-attr-label {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          flex-shrink: 0;
        }
        .sect-attr-value {
          font-style: italic;
          color: var(--ink);
          text-align: right;
        }

        /* ── SLIDE BLOCK ── */
        .slide-block {
          background: var(--sect-accent-light, #F5F0E8);
          border: 1px solid var(--rule);
          padding: 2.5rem;
          margin-bottom: 0;
        }

        .slide-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .slide-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem 0;
          opacity: 0.35;
          transition: opacity 0.2s;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--ink);
        }
        .slide-tab.active { opacity: 1; }
        .tab-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--tab-color, var(--ink));
          flex-shrink: 0;
        }

        .slide-content {
          border-left: 3px solid var(--rule);
          padding-left: 1.5rem;
          min-height: 120px;
          margin-bottom: 1.5rem;
        }
        .slide-title {
          font-size: 1.5rem;
          font-weight: 400;
          letter-spacing: -0.01em;
          margin-bottom: 0.8rem;
        }
        .slide-body {
          font-size: 1.05rem;
          line-height: 1.85;
          color: #3D3930;
          font-weight: 300;
          max-width: 680px;
        }

        .slide-nav {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }
        .slide-arrow {
          background: none;
          border: 1px solid var(--rule);
          width: 36px; height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1rem;
          color: var(--ink);
          transition: all 0.2s;
          font-family: 'Cormorant Garamond', serif;
        }
        .slide-arrow:hover {
          background: var(--ink);
          color: var(--cream);
          border-color: var(--ink);
        }
        .slide-counter {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: var(--muted);
        }

        .sect-end-rule {
          height: 1px;
          background: var(--rule);
          margin-top: 7rem;
        }

        /* ─── CTA ─── */
        .insp-cta {
          text-align: center;
          padding: 8rem 2rem;
          position: relative;
        }
        .insp-cta-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }
        .insp-cta-h {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .insp-cta-h em { font-style: italic; color: var(--gold); }
        .insp-cta-sub {
          font-size: 1.1rem;
          color: var(--muted);
          font-style: italic;
          max-width: 440px;
          margin: 0 auto 3rem;
          line-height: 1.7;
        }
        .insp-cta-btns {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--ink);
          color: var(--cream);
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 1rem 2rem;
          transition: all 0.3s;
          border: 1px solid var(--ink);
        }
        .btn-primary:hover {
          background: var(--gold);
          border-color: var(--gold);
        }
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          color: var(--ink);
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 1rem 2rem;
          border: 1px solid var(--rule);
          transition: all 0.3s;
        }
        .btn-outline:hover {
          border-color: var(--ink);
          background: rgba(28,26,23,0.04);
        }

        @media (max-width: 768px) {
          .sect-hero-row,
          .sect-hero-row.reverse {
            grid-template-columns: 1fr;
            direction: ltr;
            gap: 2.5rem;
          }
          .sect-visual-inner { aspect-ratio: 3/2; }
          .inspiration-section { padding: 4rem 1.25rem 0; }
          .slide-block { padding: 1.5rem; }
          .figures-bar { display: none; }
        }
      `}</style>

      <div className="explore-inspiration">
        {/* ── NAV ── */}

        {/* ── HERO ── */}
        <section className="insp-hero" ref={heroRef}>
          <div className="insp-hero-grid" />
          <p className="insp-hero-eyebrow">Explore · Inspiration</p>
          <h1 className="insp-hero-title">
            The <em>Icons</em>
            <br />
            of Strength
          </h1>
          <p className="insp-hero-sub">
            From ancient gods to modern myths — the figures whose bodies and
            will have defined what human strength can be.
          </p>
          <div className="insp-hero-scroll">
            <div className="insp-scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        {/* ── FIGURE QUICK-NAV ── */}
        <nav className="figures-bar" aria-label="Figure navigation">
          <span className="figures-bar-label">Jump to</span>
          <div className="figures-bar-dot" />
          {INSPIRATIONS.map((insp) => (
            <a key={insp.id} href={`#${insp.id}`}>
              {insp.name}
            </a>
          ))}
        </nav>

        {/* ── SECTIONS ── */}
        {INSPIRATIONS.map((insp, i) => (
          <div key={insp.id} id={insp.id}>
            <InspirationSection inspiration={insp} index={i} />
          </div>
        ))}

        {/* ── CTA ── */}
        <section className="insp-cta">
          <p className="insp-cta-eyebrow">Begin Your Journey</p>
          <h2 className="insp-cta-h">
            You've seen the
            <br />
            <em>Ideal</em>. Now build it.
          </h2>
          <p className="insp-cta-sub">
            Sign up and start your calisthenics programme — guided by the same
            principles that forged every body on this page.
          </p>
          <div className="insp-cta-btns">
            <Link href="/signup" className="btn-primary">
              Start Training →
            </Link>
            <Link href="/explore/history" className="btn-outline">
              ← The History
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
