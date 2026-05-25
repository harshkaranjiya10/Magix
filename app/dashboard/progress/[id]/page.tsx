// app/progress/[id]/page.tsx
import { getAthleteProgress } from "@/app/actions/getAthleteProgress"
import ProgressClient from "@/app/dashboard/progress/[id]/progressClient"
import { getFees } from "@/app/actions/getFees"

import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import AthleteListFees from "@/components/athlete-list-fees"
import { autoExpireFees } from "@/lib/autoExpireFees"
import DeleteAthleteDialog from "@/components/DeleteAthleteDialog"
import { notFound } from "next/navigation"

export default async function ProgressPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await autoExpireFees()

  const { id } = await params

  const now = new Date()
  const raw = await getAthleteProgress(id, now.getFullYear(), now.getMonth())
  const { athlete, attendance } = JSON.parse(raw)

  if (!athlete) notFound()

  const fees = JSON.parse(await getFees(id))

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{athlete?.name ?? "Unknown"}</h1>

            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>

            <DeleteAthleteDialog id={id} />
          </div>
          <p className="text-sm text-muted-foreground">{athlete?.mobile}</p>
          <p className="text-sm text-muted-foreground">
            {athlete?.joiningDate.split("T")[0].split("-").reverse().join("-")}
          </p>
        </div>

        <div className="mt-2 flex flex-col items-center justify-center">
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${!fees[0] ? "bg-yellow-100 text-yellow-600" : ""} ${fees[0]?.status === "active" ? "bg-green-100 text-green-700" : ""} ${fees[0]?.status === "expired" ? "bg-red-100 text-red-500" : ""} ${fees[0]?.status === "pending" ? "bg-yellow-100 text-yellow-600" : ""} `}
          >
            {fees[0]?.status ?? "Pending"}
          </span>
        </div>
      </div>
      {/* <FeesForm athleteId={id} /> */}

      <AthleteListFees id={id} />
      <ProgressClient
        athleteId={id}
        athlete={athlete}
        initialAttendance={attendance}
      />
    </div>
  )
}
