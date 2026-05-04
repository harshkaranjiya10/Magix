"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useRouter } from "next/navigation"

import {addUser} from "@/app/actions/addUser"
import { useActionState, useEffect, useState } from "react"

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}
function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

export default function AthleteForm({
  className,
}: React.ComponentProps<"form">) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [value, setValue] = React.useState(formatDate(date))
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const router = useRouter()
  const initialState = {
    success: false,
    remark: "",
  }

  const [state, formAction, isPending] = useActionState(addUser, initialState)

  const [formValues, setFormValues] = React.useState({
    mobile: "",
    password: "",
    joiningDate: new Date(),
    name: "",
  })

  React.useEffect(() => {
    if (state.success) {
      setFormValues({
        mobile: "",
        joiningDate: new Date(),
        name: "",
        password: "",
      })
    }
  }, [state.success, router])

  return (
    <div>
      <form
        action={formAction}
        className={cn("grid items-start gap-6", className)}
      >
        <div className="grid gap-3">
          <Label htmlFor="name">Full Name</Label>
          <Input type="text" id="name" name="name" value={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}/>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            type="tel"
            id="mobile"
            maxLength={10}
            minLength={10}
            name="mobile"
            value={formValues.mobile}
            onChange={(e) => setFormValues({ ...formValues, mobile: e.target.value })}
          />
        </div>

        <div>
          <Field className=" w-48">
            <FieldLabel htmlFor="date-required">Joining Date</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="date-required"
                value={value}
                placeholder="June 01, 2025"
                onChange={(e) => {
                  const date = new Date(e.target.value)
                  setValue(e.target.value)
                  if (isValidDate(date)) {
                    setDate(date)
                    setMonth(date)
                  }
                  setFormValues({ ...formValues, joiningDate: date })
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault()
                    setOpen(true)
                  }
                }}
              />
              <InputGroupAddon align="inline-end">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <InputGroupButton
                      id="date-picker"
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Select date"
                    >
                      <CalendarIcon />
                      <span className="sr-only">Select date</span>
                    </InputGroupButton>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={(date) => {
                        setDate(date)
                        setValue(formatDate(date))
                        setOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </InputGroupAddon>
            </InputGroup>
            {/* Hidden for Joining date */}
            <input
              type="hidden"
              name="joiningDate"
              value={date?.toISOString() || "" }
              
            />
          </Field>
        </div>
        {state.remark && (
          <p className="text-red-500 text-sm text-center">
            {state.remark}
          </p>
        )}

        
        <Button type="submit">
          Save changes
        </Button>
        
      </form>
    </div>
  )
}
