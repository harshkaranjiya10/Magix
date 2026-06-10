import CalendarUI from "@/components/calendar-ui"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from "next/image"

import Magix from "@/public/Magix-bg.png"
import { CalendarCheck, Dumbbell, Link, TrendingUp } from "lucide-react"

export default function Page() {
  return (
    <>
      <div className="grid auto-rows-min gap-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {/* 1. Start Workout Option */}
          <Card className="transition-all hover:border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Start Workout</CardTitle>
              <Dumbbell className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                Begin an active workout session. Choose a routine or start an
                empty one on the fly.
              </CardDescription>
              <div className="flex gap-2 pt-2">
                <Link href="/workout/active?empty=true" className="w-full">
                  <Button variant="outline" className="w-full">
                    Empty Workout
                  </Button>
                </Link>
                <Link href="/workout/routines" className="w-full">
                  <Button className="w-full">Use Routine</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 2. Attendance Option */}
          {/* <Card className="transition-all hover:border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Attendance</CardTitle>
              <CalendarCheck className="h-6 w-6 text-emerald-500" />
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                View your monthly attendance records, check-in history, and
                active membership status.
              </CardDescription>
              <Link href="/dashboard/attendance" className="block pt-2">
                <Button variant="secondary" className="w-full">
                  View Records
                </Button>
              </Link>
            </CardContent>
          </Card> */}

          {/* 3. Monthly Progress Option */}
          <Card className="transition-all hover:border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                Monthly Progress
              </CardTitle>
              <TrendingUp className="h-6 w-6 text-sky-500" />
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                Analyze your performance trends. Track reps, max weights, and
                total training volume over time.
              </CardDescription>
              <Link href="/dashboard/progress" className="block pt-2">
                <Button variant="secondary" className="w-full">
                  View Graphs
                </Button>
              </Link>
            </CardContent>
          </Card>

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
