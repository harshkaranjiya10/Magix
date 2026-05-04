"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import AthleteList from "@/components/athlete-list"
import AthleteForm from "@/components/athlete-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function Page() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="mb-4 font-bold md:text-2xl">Attendance Dashboard</h1>

        
        {isDesktop ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Add Athlete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Athlete</DialogTitle>
                <DialogDescription>
                  Enter athlete details here.
                </DialogDescription>
              </DialogHeader>
              <AthleteForm />
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button>Add Athlete</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Add New Athlete</DrawerTitle>
                <DrawerDescription>
                  Enter athlete details here.
                </DrawerDescription>
              </DrawerHeader>
              <AthleteForm className="px-4" />
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </div>
      <AthleteList />
    </div>
  )
}
