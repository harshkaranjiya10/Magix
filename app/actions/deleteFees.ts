// app/actions/deleteFees.ts
"use server"

import { connectDB } from "@/lib/mongodb"
import Fees from "@/lib/models/fees"

export async function deleteFees(feesId: string) {
  await connectDB()

  try {
    // Delete from both collections
    await Fees.findByIdAndDelete(feesId)

    return { success: true }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
