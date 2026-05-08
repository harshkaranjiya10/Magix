// app/actions/deleteAthlete.ts
"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/user";
import Attendance from "@/lib/models/attendance";

export async function deleteAthlete(userId: string) {
  await connectDB();

  try {
    // Delete from both collections
    await User.findByIdAndDelete(userId);
    await Attendance.deleteMany({ userId });

    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}