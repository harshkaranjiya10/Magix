"use client"

import { useActionState, useEffect, useState } from "react"
import { addFees } from "@/app/actions/addFees"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, CheckCircle2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

const initialState = { success: false, error: "" }

const initialDates = {
  paidOn: new Date() as Date | undefined,
  validFrom: new Date() as Date | undefined,
  validUntil: undefined as Date | undefined,
}

function formatDisplay(date: Date | undefined) {
  if (!date) return "Pick a date"
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function FeesForm({
  athleteId,
  onSuccess,
  initialData,
}: {
  athleteId: string
  onSuccess?: () => void
  initialData?: {
    amount: string
    notes: string
    paidOn: string
    validUntil: string
    validFrom: string
    _id: string
    
  }
}) {
  const [state, formAction, isPending] = useActionState(addFees, initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formValues, setFormValues] = useState({ amount: "", notes: "" })
  const [dates, setDates] = useState(initialDates)

  // Popover open states
  const [popoverOpen, setPopoverOpen] = useState({
    paidOn: false,
    validFrom: false,
    validUntil: false,
  })

  const [dialogOpen, setDialogOpen] = useState(!!initialData || false)
  const router = useRouter()
  useEffect(() => {
    if (initialData) {
      setFormValues({
        amount: initialData.amount,
        notes: initialData.notes ?? "",
      })
      setDates({
        paidOn: new Date(initialData.paidOn),
        validFrom: new Date(initialData.validFrom),
        validUntil: new Date(initialData.validUntil),
      })
    }
  }, [initialData])

  useEffect(() => {
    if (state.success) {
      // Reset form
      router.refresh()
      setDialogOpen(false)
      setFormValues({ amount: "", notes: "" })
      setDates(initialDates)
      console.log(onSuccess)
      onSuccess?.()

      if (!initialData) {
        setFormValues({ amount: "", notes: "" })
        setDates(initialDates)
      }
    }
  }, [state.success, onSuccess, router, initialData])

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {!initialData && <Button>Add Fees</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Athlete Fees" : "Add Athlete Fees"}
          </DialogTitle>
          <DialogDescription>
            Enter athlete fees details here.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          {/* Hidden fields for athleteId + dates */}
          <input type="hidden" name="userId" value={athleteId} />
          <input
            type="hidden"
            name="paidOn"
            value={dates.paidOn?.toISOString() ?? ""}
          />
          <input
            type="hidden"
            name="validFrom"
            value={dates.validFrom?.toISOString() ?? ""}
          />
          <input
            type="hidden"
            name="validUntil"
            value={dates.validUntil?.toISOString() ?? ""}
          />
          <input type="hidden" name="feesId" value={initialData?._id ?? ""} />

          {/* Amount */}
          <div className="space-y-1">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="e.g. 1500"
              required
              value={formValues.amount}
              onChange={(e) =>
                setFormValues({ ...formValues, amount: e.target.value })
              }
            />
          </div>

          {/* Date pickers */}
          <div className="grid grid-cols-2 gap-4">
            {/* Paid On */}
            <div className="space-y-1">
              <Label>Paid On</Label>
              <Popover
                open={popoverOpen.paidOn}
                onOpenChange={(v) =>
                  setPopoverOpen({ ...popoverOpen, paidOn: v })
                }
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDisplay(dates.paidOn)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dates.paidOn}
                    onSelect={(d) => {
                      setDates({ ...dates, paidOn: d })
                      setPopoverOpen({ ...popoverOpen, paidOn: false })
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Valid From */}
            <div className="space-y-1">
              <Label>Valid From</Label>
              <Popover
                open={popoverOpen.validFrom}
                onOpenChange={(v) =>
                  setPopoverOpen({ ...popoverOpen, validFrom: v })
                }
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDisplay(dates.validFrom)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dates.validFrom}
                    onSelect={(d) => {
                      setDates({ ...dates, validFrom: d })
                      setPopoverOpen({ ...popoverOpen, validFrom: false })
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Valid Until */}
            <div className="col-span-2 space-y-1">
              <Label>Valid Until (Next Due)</Label>
              <Popover
                open={popoverOpen.validUntil}
                onOpenChange={(v) =>
                  setPopoverOpen({ ...popoverOpen, validUntil: v })
                }
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDisplay(dates.validUntil)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dates.validUntil}
                    onSelect={(d) => {
                      setDates({ ...dates, validUntil: d })
                      setPopoverOpen({ ...popoverOpen, validUntil: false })
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="e.g. half payment, discount given..."
              rows={2}
              value={formValues.notes}
              onChange={(e) =>
                setFormValues({ ...formValues, notes: e.target.value })
              }
            />
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Saving..." : initialData ? "Update" : "Save"}
          </Button>

          {state.error && (
            <p className="text-center text-sm text-red-500">{state.error}</p>
          )}
          {state.success && (
            <p className="flex items-center justify-center gap-1 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" /> Fees saved successfully
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
