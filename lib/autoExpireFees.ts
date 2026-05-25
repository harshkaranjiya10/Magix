// lib/.ts
import { connectDB } from "@/lib/mongodb"
import Fees from "@/lib/models/fees"

export async function autoExpireFees() {
  await connectDB()

  await Fees.updateMany(
    {
      validUntil: { $lt: new Date() },
      status: "active",
    },
    {
      $set: { status: "expired" },
    }
  )
}
