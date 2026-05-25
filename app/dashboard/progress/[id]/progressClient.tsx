"use client"

import React, { useState } from "react"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { getAthleteProgress } from "@/app/actions/getAthleteProgress"
import { CheckCircle2, XCircle } from "lucide-react"

type AttendanceRecord = {
  date: string
  attended: boolean
}

export default function ProgressClient({
  athleteId,
  athlete,
  initialAttendance,
  
}: {
  athleteId: string
  athlete: any
  initialAttendance: AttendanceRecord[]
}) {
  const now = new Date()
  const [month, setMonth] = useState<Date>(
    new Date(now.getFullYear(), now.getMonth(), 1)
  )
  const [attendance, setAttendance] =
    useState<AttendanceRecord[]>(initialAttendance)
  const [loading, setLoading] = useState(false)

  // Build lookup map: "YYYY-MM-DD" → attended boolean
  const attendanceMap = React.useMemo(() => {
    const map: Record<string, boolean> = {}
    attendance.forEach((r) => {
      const key = new Date(r.date).toISOString().split("T")[0]
      map[key] = r.attended
    })
    return map
  }, [attendance])

  const dateKey = (date: Date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d.toISOString().split("T")[0]
  }

  // Fetch when month changes
  const handleMonthChange = async (newMonth: Date) => {
    setMonth(newMonth)
    setLoading(true)
    const raw = await getAthleteProgress(
      athleteId,
      newMonth.getFullYear(),
      newMonth.getMonth()
    )
    const { attendance } = JSON.parse(raw)
    setAttendance(attendance)
    setLoading(false)
  }

  // Stats for current month
  const presentDays = attendance.filter((r) => r.attended).length
  const absentDays = attendance.filter((r) => !r.attended).length
  const totalDays = attendance.length

  return (
    <div> 
      <div className="mx-auto max-w-xl space-y-6">
        {/* Athlete Info */}

        {/* Stats */}
        <div className="flex gap-4">
          <div className="flex-1 rounded-lg border p-4 text-center">
            <p className="text-3xl font-bold text-green-500">{presentDays}</p>
            <p className="text-sm text-muted-foreground">Present</p>
          </div>
          <div className="flex-1 rounded-lg border p-4 text-center">
            <p className="text-3xl font-bold text-red-400">{absentDays}</p>
            <p className="text-sm text-muted-foreground">Absent</p>
          </div>
          <div className="flex-1 rounded-lg border p-4 text-center">
            <p className="text-3xl font-bold text-yellow-500">
              {totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0}%
            </p>
            <p className="text-sm text-muted-foreground">Attendance</p>
          </div>
        </div>

        {/* Calendar */}
        <Card className="mx-auto h-fit w-fit p-0">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex h-64 w-72 items-center justify-center text-sm text-muted-foreground">
                Loading...
              </div>
            ) : (
              <Calendar
                mode="single"
                month={month}
                onMonthChange={handleMonthChange}
                captionLayout="dropdown"
                className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
                components={{
                  DayButton: ({ children, modifiers, day, ...props }) => {
                    const key = dateKey(day.date)
                    const hasRecord = key in attendanceMap
                    const isPresent = attendanceMap[key] === true
                    const isAbsent = hasRecord && !isPresent

                    return (
                      <CalendarDayButton
                        day={day}
                        modifiers={modifiers}
                        {...props}
                        className="flex flex-col items-center justify-center gap-1"
                      >
                        {/* Day number circle — green/red/default */}
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${isPresent && !modifiers.outside ? "bg-green-500 text-white" : ""} ${isAbsent && !modifiers.outside ? "bg-red-400 text-white" : ""} `}
                        >
                          {children}
                        </span>

                        {/* Icon below day number */}
                        {!modifiers.outside &&
                          hasRecord &&
                          (isPresent ? (
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                          ) : (
                            <XCircle className="h-3 w-3 text-red-400" />
                          ))}
                      </CalendarDayButton>
                    )
                  },
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
