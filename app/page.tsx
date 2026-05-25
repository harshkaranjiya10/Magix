import * as motion from "motion/react-client"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import Image from "next/image"
import Link from "next/link"

import Magix from "@/public/Magix-bg.png"
import { NavMenu } from "@/components/nav-menu"

export default function Page() {
  return (
    <>
      <header className="sticky top-0 right-0 left-0 z-20 flex h-min items-center md:px-4">
        <motion.div className="mx-auto mt-6 flex w-full max-w-6xl items-center rounded-2xl border-2 bg-background/70 px-6 py-3 backdrop-blur-md">
          <section className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 transition-opacity hover:opacity-90"
            >
              <Image
                src={Magix}
                alt="MagixThenics Logo"
                width={50}
                height={50}
                className="rounded-xl"
              />

              <h1 className="text-large font-extrabold tracking-tight">
                MagixThenics
              </h1>
            </Link>
          </section>
          <section className="mx-auto flex items-center gap-4">
            <nav className="hidden items-center gap-8 md:flex">
              <NavMenu />
            </nav>
          </section>
          <section className="flex items-center gap-3">
            {/* Login Button - Always Visible */}
            <Link href="/login">
              <Button variant="outline" className="rounded-xl px-6">
                Login
              </Button>
            </Link>
            <Button
              variant="default"
              className="hidden rounded-xl px-3 md:flex"
            >
              Get Started
            </Button>
          </section>
        </motion.div>
      </header>
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
