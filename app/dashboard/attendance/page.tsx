import AthleteList from "@/components/athlete-list"
import DialogDrawer from "@/components/dialog-drawer"

export default function Page() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="font-bold md:text-2xl md:font-extrabold">
          <h1>Attendance Dashboard</h1>
        </div>
        <div>
          <DialogDrawer />
        </div>
      </div>
      <AthleteList />
    </div>
  )
}
