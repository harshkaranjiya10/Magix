import CalendarUI from "@/components/calendar-ui"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from "next/image"

import Magix from "@/public/Magix-bg.png"

export default function Page() {
  return (
    <>
      <div className="grid auto-rows-min gap-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card>Add New Workout</Card>
          <Card>Workout routines</Card>
          {/* <div className="aspect-video rounded-xl bg-muted/50" /> */}
          <CalendarUI />
        </div>
        <div className="gap-4 rounded-xl bg-muted/50">
          <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <Image
              src={Magix}
              alt="Event cover"
              className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle>Design systems meetup</CardTitle>
              <CardDescription>
                A practical talk on component APIs, accessibility, and shipping
                faster.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">View Event</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
