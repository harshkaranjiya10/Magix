"use client"

import * as React from "react"

import AthleteForm from "@/components/athlete-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

export default function DialogDrawer() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Athlete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Athlete</DialogTitle>
          <DialogDescription>Enter athlete details here.</DialogDescription>
        </DialogHeader>
        <AthleteForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
