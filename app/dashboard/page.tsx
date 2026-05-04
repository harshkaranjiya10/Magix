import CalendarUI from "@/components/calendar-ui"
import { Card } from "@/components/ui/card"
export default function Page() {
  return (
    <>
      <div className="grid auto-rows-min gap-4">
      

        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card>
            Add New Workout
          </Card>
          <Card>
            Workout routines
          </Card>
          {/* <div className="aspect-video rounded-xl bg-muted/50" /> */}
          <CalendarUI />
        </div>
        <div className="min-h-screen rounded-xl bg-muted/50" />
      </div>
    </>
  )
}