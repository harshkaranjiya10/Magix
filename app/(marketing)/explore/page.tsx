"use client"

import { useState } from "react"
import { Dumbbell, Flame, Shield, Activity, ArrowRight } from "lucide-react"

import { exercises } from "@/lib/exercises"

type CategoryCard = {
  name: string
  description: string
  color: string
  icon: React.ReactNode
}

const categoryMeta: Record<string, CategoryCard> = {
  Push: {
    name: "Push",
    description: "Chest, shoulders, triceps & pressing strength",
    color: "from-rose-500/20 to-red-500/10 border-rose-500/20",
    icon: <Flame className="h-7 w-7 text-rose-400" />,
  },
  Pull: {
    name: "Pull",
    description: "Back, biceps & pulling power",
    color: "from-blue-500/20 to-cyan-500/10 border-blue-500/20",
    icon: <Dumbbell className="h-7 w-7 text-blue-400" />,
  },
  Legs: {
    name: "Legs",
    description: "Lower body strength & explosiveness",
    color: "from-amber-500/20 to-orange-500/10 border-amber-500/20",
    icon: <Shield className="h-7 w-7 text-amber-400" />,
  },
  Core: {
    name: "Core",
    description: "Abs, stability & body control",
    color: "from-emerald-500/20 to-green-500/10 border-emerald-500/20",
    icon: <Activity className="h-7 w-7 text-emerald-400" />,
  },
  "Full Body": {
    name: "Full Body",
    description: "Conditioning & athletic movement",
    color: "from-violet-500/20 to-purple-500/10 border-violet-500/20",
    icon: <Dumbbell className="h-7 w-7 text-violet-400" />,
  },
}

export default function ExploreExercisesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const grouped = exercises.reduce<Record<string, typeof exercises>>(
    (acc, exercise) => {
      if (!acc[exercise.category]) {
        acc[exercise.category] = []
      }

      acc[exercise.category].push(exercise)

      return acc
    },
    {}
  )

  const categories = [
    {
      name: "All",
      description: `${exercises.length} exercises`,
      color: "from-zinc-500/20 to-zinc-700/10 border-zinc-500/20",
      icon: <Dumbbell className="h-7 w-7 text-zinc-300" />,
    },
    ...Object.entries(categoryMeta).map(([key, value]) => ({
      ...value,
      description: `${grouped[key]?.length ?? 0} exercises`,
    })),
  ]

  const filteredGroups =
    selectedCategory === "All"
      ? Object.entries(grouped)
      : Object.entries(grouped).filter(
          ([category]) => category === selectedCategory
        )

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm tracking-[0.25em] text-muted-foreground uppercase">
            Calisthenics Library
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Explore Exercises
          </h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Browse exercises by movement category and progression level.
          </p>
        </div>

        {/* Category Cards */}
        <div className="mx-auto mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`rounded-3xl border bg-gradient-to-br p-5 text-left transition-all duration-200 hover:scale-[1.02] ${
                category.color
              } ${
                selectedCategory === category.name
                  ? "shadow-lg ring-2 ring-primary"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <div className="mb-3">{category.icon}</div>

              <h3 className="font-semibold">{category.name}</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {category.description}
              </p>
            </button>
          ))}
        </div>

        {/* Exercise Sections */}
        <div className="space-y-10">
          {filteredGroups.map(([category, categoryExercises]) => {
            const meta = categoryMeta[category]

            return (
              <section key={category}>
                {/* Category Header */}
                <div
                  className={`mb-5 rounded-3xl border bg-gradient-to-br p-6 ${meta.color}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-2xl bg-white/5 p-4">
                        {meta.icon}
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold">{meta.name}</h2>

                        <p className="mt-1 text-zinc-400">{meta.description}</p>
                      </div>
                    </div>

                    <div className="hidden rounded-2xl border px-4 py-3 md:block">
                      <p className="text-sm text-zinc-400">Total Exercises</p>

                      <p className="text-2xl font-bold">
                        {categoryExercises.length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Exercise Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="group rounded-3xl border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-accent/40 hover:shadow-lg"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <p className="mb-2 text-xs tracking-wider text-muted-foreground uppercase">
                            {exercise.subcategory}
                          </p>

                          <h3 className="text-lg leading-tight font-semibold">
                            {exercise.name}
                          </h3>
                        </div>

                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                      </div>

                      {/* Tags */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300">
                          {exercise.difficulty}
                        </span>

                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300">
                          {exercise.progressionType}
                        </span>
                      </div>

                      {/* Muscles */}
                      <div>
                        <p className="mb-2 text-xs tracking-wider text-muted-foreground uppercase">
                          Primary Muscles
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {exercise.primaryMuscles.map((muscle) => (
                            <span
                              key={muscle}
                              className="rounded-xl bg-muted px-3 py-1 text-sm"
                            >
                              {muscle.replaceAll("_", " ")}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Equipment */}
                      {exercise.equipment.length > 0 && (
                        <div className="mt-5 border-t border-white/5 pt-4">
                          <p className="mb-2 text-xs tracking-wider text-muted-foreground uppercase">
                            Equipment
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {exercise.equipment.map((item) => (
                              <span
                                key={item}
                                className="rounded-lg bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}
