import { getCurrentUser } from "@/lib/auth";
import User from "@/lib/models/user";
import { connectDB } from "@/lib/mongodb";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import RoleForm from "@/components/role-form";

export default async function UserDetails() {
  const authUser = await getCurrentUser();
  if (!authUser) return null;

  await connectDB();

  const user = await User.findById(authUser.userId).lean();

  console.log(authUser);
  console.log(user);


  return (
    <div className={cn("flex flex-row gap-6 items-center")}>
        <div className="rounded-xl border p-2 bg-muted/50 hidden md:block">
            <div className="text-sm space-y-1">
                <p><strong>{user.name}</strong></p>
                {/* <p><strong>Mobile:</strong> {user.mobile}</p>
                <p><strong>Role:</strong> {user.role}</p> */}
            </div>
        </div>
        {user.role === "admin" && 
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Coach</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <RoleForm />
            </PopoverContent>
    </Popover>}
    </div>
  );
}