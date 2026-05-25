"use client"

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import RoleForm from "@/components/role-form";
import { useUser } from "@/context/user-context";

export default function UserDetails() {
  const user = useUser();
  //console.log(user)

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