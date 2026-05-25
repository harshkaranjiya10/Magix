// app/actions/getFees.ts
"use server"

import { connectDB } from "@/lib/mongodb"
import Fees from "@/lib/models/fees"

export async function getFees(userId: string) {
  await connectDB()
  const fees = await Fees
    .find({ userId })
    .sort({ validUntil: -1 })
    .lean()

  return JSON.stringify(fees) // always array, even if empty []
}