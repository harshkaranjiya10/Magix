"use server"

import { connectDB } from "@/lib/mongodb"
import User from "@/lib/models/user"
import Fees from "@/lib/models/fees"

export async function addUser(prevState: any, formData: FormData) {
  try {
    await connectDB()

    const name = formData.get("name") as string
    const mobile = formData.get("mobile") as string
    const joinedDate = formData.get("joiningDate") as string

    if (!mobile) {
      return { success: false, remark: "Mobile is required" }
    }

    if (!name) {
      return { success: false, remark: "Name is required" }
    }

    const existingUser = await User.findOne({ mobile })

    if (existingUser) {
      return { success: false, remark: "Mobile already exists" }
    }

    const newUser = await User.create({
      name,
      mobile,
      role: "user",
      joiningDate: joinedDate ? new Date(joinedDate) : null,
      password: formData.get("password")
        ? (formData.get("password") as string)
        : null,
    })

    return { success: true, remark: "User added successfully" }
  } catch (err: any) {
    console.error("DB ERROR:", err)
    return { success: false, error: "Something went wrong" }
  }
}
