"use client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import updateUserRole from "@/app/actions/updateUserRole"
import { useActionState, useEffect, useState } from "react"

import { Field, FieldGroup } from "@/components/ui/field"

import { toast } from "sonner"

const initialState = {
    success: false,
    error: "",
};
export default function RoleForm({
    className,
    ...props
    }: React.ComponentProps<"form">) {
        
    const [state, formAction, isPending] = useActionState(updateUserRole, initialState);
    
      const [formValues, setFormValues] = useState({
        mobile: "",
        role: "user",
      });
    
      useEffect(() => {
        if (state.success) {
          setFormValues({
            mobile: "",
            role: "user",
          });
        }
        if (state.success) {
        toast.success("User role updated successfully!");
        } else if (state.error) {
        toast.error(state.error);
}      
}, [state.success, state.error]);

    return (
       <form 
        action={formAction} 
        className={cn("grid gap-4")}
        onSubmit={() => console.log("FORM SUBMITTED")}
       >
            <div className="space-y-2 m-2">
                <h4 className="leading-none font-medium">User Role</h4>
                <p className="text-sm text-muted-foreground">
                Set the role for the user.
                </p>
            </div>
             <FieldGroup>
                <Field>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="mobile">Mobile No.</Label>
                            <Input
                                id="mobile"
                                type="tel"
                                name="mobile"
                                placeholder="9999999999"
                                minLength={10}
                                maxLength={10}
                                className="col-span-2 h-8"
                                value={formValues.mobile}
                                onChange={(e) => setFormValues({ ...formValues, mobile: e.target.value })}
                            />
                        </div>
                    </div>
                </Field>
                <Field>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="mobile">Role</Label>
                        <Tabs
                            className="col-span-2" 
                            onValueChange={(value) => setFormValues({ ...formValues, role: value })}>
                            <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="user">User</TabsTrigger>
                            <TabsTrigger value="coach">Coach</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <input type="hidden" name="role" value={formValues.role} />
                        </div>
                    </div>
                </Field>
            </FieldGroup>
            <div className="flex justify-end p-2">
                 
                {isPending && <Button type="submit" disabled>
                    Saving...
                </Button>}
                {!isPending && (
                    <Button type="submit" onClick={() => {
                        state.success ? toast.success("User role updated successfully!") : toast.error("Failed to update user role.");
                    }}>
                    Save</Button>  
                )}
            </div>

            {state.error && (
                <p className="text-red-500 text-sm text-center">
                    {state.error}
                </p>
            )}
        </form> 
    )
}