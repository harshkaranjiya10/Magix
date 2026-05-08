"use client"

import React from "react"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"

export default function CalendarUI() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const workoutNames = [
    "Push",
    "Pull",
    "Legs",
    "Core",
    "HIIT",
    "Mix",
    "Skill",
    "Cardio",
  ]

  const [workoutMap, setWorkoutMap] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    const map: Record<string, string> = {}

    for (let i = 0; i < 15; i++) {
      const randomDay = Math.floor(Math.random() * 28) + 1
      const d = new Date()
      d.setDate(randomDay)

      const key = d.toISOString().split("T")[0]
      const name = workoutNames[Math.floor(Math.random() * workoutNames.length)]

      map[key] = name.slice(0, 8) // max 8 chars
    }

    setWorkoutMap(map)
  }, [])

  return (
    <Card className="mx-auto h-fit w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
          className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
          components={{
            DayButton: ({ children, modifiers, day, ...props }) => {
              //const key = day.date.toISOString().split("T")[0]
              const keyFromDate = (date: Date) => {
                const d = new Date(date)
                d.setHours(0, 0, 0, 0)
                return d.toISOString().split("T")[0]
              }
              const key = keyFromDate(day.date)
              const workout = workoutMap[key]

              return (
                <CalendarDayButton
                  day={day}
                  modifiers={modifiers}
                  {...props}
                  className="flex flex-col items-center justify-center gap-1"
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${workout ? "bg-blue-600 font-semibold text-white" : ""} `}
                  >
                    {children}
                  </span>

                  {!modifiers.outside && workout && (
                    <span className="text-xs text-blue-500">{workout}</span>
                  )}
                </CalendarDayButton>
              )
            },
          }}
        />
      </CardContent>
    </Card>
  )
}
