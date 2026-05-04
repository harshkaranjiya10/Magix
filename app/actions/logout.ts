// /app/actions/logout.ts
"use server";

import { cookies } from "next/headers";

export async function logout() {
    const cookieStore = await cookies();

    cookieStore.delete("token");
    //cookieStore.delete("user");

    return { success: true, error: "" };
}