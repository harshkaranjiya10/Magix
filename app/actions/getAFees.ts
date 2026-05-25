// app/actions/getAFees.ts
"use server"

import { connectDB } from "@/lib/mongodb"
import Fees from "@/lib/models/fees"



export async function getAFees(id: string) {
  await connectDB()
  const fees = await Fees.findOne({ id })

  return JSON.stringify(fees)
}
