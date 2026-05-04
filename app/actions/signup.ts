"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";

export async function signup(prevState: any, formData: FormData) {
    await connectDB();

    const name = formData.get("name") as string;
    const mobile = formData.get("mobile") as string;
    const password = formData.get("password") as string;

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ mobile });

    if (existingUser) {
        return { success: false, error: "Mobile number already registered" };
    }
    const createdAt = new Date().toISOString();

    await User.create({
        name,
        mobile,
        password: hashedPassword,
        role: "user",
        joiningDate: createdAt
    });

    return { success: true, error: "" };
}