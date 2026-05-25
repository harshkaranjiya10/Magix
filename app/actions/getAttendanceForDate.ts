// app/actions/getAttendanceForDate.ts
"use server"

import { connectDB } from "@/lib/mongodb"
import Attendance from "@/lib/models/attendance"

export async function getAttendanceForDate(date: Date) {
  await connectDB()

  const from = new Date(date)
  from.setHours(0, 0, 0, 0)

  const to = new Date(date)
  to.setHours(23, 59, 59, 999)

  const records = await Attendance.find({
    date: { $gte: from, $lte: to },
  }).lean()

  return JSON.stringify(records)
}
