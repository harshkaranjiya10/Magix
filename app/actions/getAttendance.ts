// app/actions/getAttendance.ts
"use server"

import { connectDB } from "@/lib/mongodb"
import Attendance from "@/lib/models/attendance"

export async function getAttendanceForToday(dateString?: string) {
  await connectDB()
  
  const date = dateString ? new Date(dateString) : new Date()
  date.setHours(0, 0, 0, 0)

  const records = await Attendance.find({ date }).lean()
  console.log(records)
  return JSON.stringify(records)
}