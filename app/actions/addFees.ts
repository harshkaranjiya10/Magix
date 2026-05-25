// app/actions/addFees.ts
"use server"

import { connectDB } from "@/lib/mongodb"
import Fees from "@/lib/models/fees"

const initialState = { success: false, error: "" }

export async function addFees(_: typeof initialState, formData: FormData) {
  try {
    await connectDB()

    const feesId    = formData.get("feesId") as string
    const userId    = formData.get("userId") as string
    const amount    = Number(formData.get("amount"))
    const paidOn    = new Date(formData.get("paidOn") as string)
    const validFrom = new Date(formData.get("validFrom") as string)
    const validUntil= new Date(formData.get("validUntil") as string)
    const notes     = formData.get("notes") as string

    if (!userId || !amount || !validFrom || !validUntil) {
      return { success: false, error: "All fields are required." }
    }

    // Edit existing record
    if (feesId) {
      await Fees.findByIdAndUpdate(feesId, {
        amount,
        paidOn,
        validFrom,
        validUntil,
        notes,
      })
      return { success: true, error: "" }
    }

    // Create new record
    await Fees.create({
      userId,
      amount,
      paidOn,
      validFrom,
      validUntil,
      status: "active",
      notes,
    })

    return { success: true, error: "" }
  } catch (err) {
    console.error("addFees error:", err)
    return { success: false, error: "Failed to save fees." }
  }
}