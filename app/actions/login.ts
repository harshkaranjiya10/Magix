"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function login(prevState: any, formData: FormData) {
  await connectDB();

  const mobile = formData.get("mobile") as string;
  const password = formData.get("password") as string;

  const user = await User.findOne({ mobile });
  console.log("User authenticated successfully:", user); // debug

  if (!user) {
    return { error: "User not found", success: false };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return { error: "Invalid password", success: false };
  }

 const token = jwt.sign(
  { userId: user._id },
   process.env.JWT_SECRET!,
  { expiresIn: "7d" }
 );

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30  days
  });


  return { success: true, error: "" };
}