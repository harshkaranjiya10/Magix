import { connectDB } from "@/lib/mongodb"
import User from "@/lib/models/user"

export async function getUsers() {
  await connectDB()

  const users = await User.find({role: "user"}).lean();

  return users
}