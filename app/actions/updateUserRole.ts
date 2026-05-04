"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/user";

export default async function updateUserRole(prevState: any, formData: FormData) {
    await connectDB();

    console.log("Received form data:", {
        mobile: formData.get("mobile"),
        role: formData.get("role"),
    });
    
    const mobile = formData.get("mobile") as string;
    const role = formData.get("role") as string;

    if (!mobile || !role) {
        return {
            success: false,
            error: "Mobile and role are required.",
        };
    }

    const user = await User.findOne({ mobile });

    if (!user) {
        return {
            success: false,
            error: "User not found.",
        };
    }

    user.role = role;
    await user.save();

    console.log(`Updated role for user ${mobile} to ${role}`);  

    return {
        success: true,
        error: "",
    };
}