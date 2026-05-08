"use server";

import { connectDB } from "@/lib/mongodb";
import Attendance from "@/lib/models/attendance";

export async function markAttendance(data: any) {
  await connectDB();

  try {
    const { date, records } = JSON.parse(data);

    if (!records) {
      return { success: false };
    }

    const operations = records.map((record: any) => ({

      updateOne: {
        filter: {
          userId: record.userId,
          date,
        },
        update: {
          $set: {
            attended: record.attended
          },
        },
        upsert: true,
      },
    }));

    await Attendance.bulkWrite(operations);
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}