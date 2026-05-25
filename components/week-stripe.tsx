// components/WeekStrip.tsx
"use client"

import { Button } from "@/components/ui/button"

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function getWeekDates(): Date[] {
  const today = new Date()
  // getDay(): 0=Sun,1=Mon...6=Sat → shift so week starts Monday
  const dayOfWeek = (today.getDay() + 6) % 7 // Mon=0 ... Sun=6
  const monday = new Date(today)
  monday.setDate(today.getDate() - dayOfWeek)

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    d.setHours(0, 0, 0, 0)
    return d
  })
}

export default function WeekStrip({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date
  onSelect: (date: Date) => void
}) {
  const weekDates = getWeekDates()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className="flex gap-1 w-full justify-between">
      {weekDates.map((date, i) => {
        const isSelected = date.toDateString() === selectedDate.toDateString()
        const isToday = date.toDateString() === today.toDateString()
        const isFuture = date > today

        return (
          <button
            key={i}
            disabled={isFuture} // can't mark future days
            onClick={() => onSelect(date)}
            className={`
              flex flex-col items-center justify-center rounded-xl px-3 py-2 flex-1 transition-colors
              ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}
              ${isToday && !isSelected ? "ring-2 ring-primary" : ""}
              ${isFuture ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <span className="text-xs font-medium">{DAY_LABELS[i]}</span>
            <span className="text-lg font-bold">{date.getDate()}</span>
          </button>
        )
      })}
    </div>
  )
}