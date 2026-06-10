"use client" // ← required at the top

import * as motion from "motion/react-client"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import Image from "next/image"
import Link from "next/link"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

import Magix from "@/public/Magix-bg.png"

export default function Page() {
  useEffect(() => {
    const heroTl = gsap.timeline({
      defaults: { ease: "power4.out" },
    })

    heroTl
      .from(".hero-eyebrow", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
      })
      .from(
        ".hero-h1 .word",
        {
          y: 100,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
        },
        "-=0.4"
      )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        <section className="relative overflow-hidden md:px-4">
          {/* Background Glow */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent blur-3xl" />

          <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-16">
            {/* Logo */}

            {/* Hero Content */}
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-sm font-medium text-purple-400">
                Transform Your Body Naturally
              </span>

              <h2 className="text-5xl leading-tight font-extrabold tracking-tight md:text-7xl">
                Unlock Your
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {" "}
                  Body’s Magic
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Master calisthenics with guided workouts, progressive training,
                and magical consistency. Build strength, mobility, and
                confidence — anytime, anywhere.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="rounded-xl px-8 py-6 text-base font-semibold shadow-lg shadow-purple-500/20"
                >
                  Start Training
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-xl px-8 py-6 text-base"
                >
                  Explore Programs
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border bg-card/50 p-6 backdrop-blur">
                  <h3 className="text-3xl font-bold">10K+</h3>
                  <p className="mt-2 text-muted-foreground">
                    Athletes Training
                  </p>
                </div>

                <div className="rounded-2xl border bg-card/50 p-6 backdrop-blur">
                  <h3 className="text-3xl font-bold">150+</h3>
                  <p className="mt-2 text-muted-foreground">Guided Workouts</p>
                </div>

                <div className="rounded-2xl border bg-card/50 p-6 backdrop-blur">
                  <h3 className="text-3xl font-bold">24/7</h3>
                  <p className="mt-2 text-muted-foreground">
                    Progress Tracking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative flex h-screen items-center justify-center overflow-hidden bg-black text-white">
          {/* Background Image */}
          <Image src={Magix} alt="" fill priority className="object-cover" />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Noise Texture */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light" />

          {/* Content */}
          <div className="relative z-10 text-center">
            <p className="mb-4 tracking-[0.3em] text-orange-400 uppercase">
              MagixThenics
            </p>

            <h1 className="text-6xl leading-none font-black md:text-9xl">
              BUILD
              <br />
              YOUR
              <br />
              LEGEND
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-300">
              Master calisthenics through cinematic workouts, progressive
              training, and elite body control.
            </p>

            <Button
              size="lg"
              className="mt-8 rounded-full bg-orange-500 px-8 py-6 text-lg hover:bg-orange-400"
            >
              Start Training
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
