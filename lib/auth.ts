import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getCurrentUser() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as {
      role: string;
      name: string;
      mobile: string;
      userId: string;
    };
  } catch {
    return null;
  }
}