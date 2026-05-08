// app/actions/getAthleteProgress.ts
"use server";

import { connectDB } from "@/lib/mongodb";
import Attendance from "@/lib/models/attendance";
import User from "@/lib/models/user";

export async function getAthleteProgress(userId: string, year: number, month: number) {
  await connectDB();

  // First day and last day of the requested month
  const from = new Date(year, month, 1)
  const to = new Date(year, month + 1, 0) // last day of month

  const [athlete, attendance] = await Promise.all([
    User.findById(userId).lean(),
    Attendance.find({
      userId,
      date: { $gte: from, $lte: to },
    }).lean(),
  ])

  return JSON.stringify({ athlete, attendance })
}