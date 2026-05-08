// app/actions/getAttendance.ts
"use server";

import { connectDB } from "@/lib/mongodb";
import Attendance from "@/lib/models/attendance";

export async function getAttendanceForToday() {
  await connectDB();

  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const records = await Attendance.find({ date }).lean();

  return JSON.stringify(records);
}