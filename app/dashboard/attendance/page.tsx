import AthleteList from "@/components/athlete-list"
import DialogDrawer from "@/components/dialog-drawer"

export default function Page() {

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="mb-4 font-bold md:text-2xl">Attendance Dashboard</h1>
        <DialogDrawer />
      </div>
      <AthleteList />
    </div>
  )
}
