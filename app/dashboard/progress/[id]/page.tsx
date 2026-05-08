// app/progress/[id]/page.tsx
import { getAthleteProgress } from "@/app/actions/getAthleteProgress"
import ProgressClient from "@/app/dashboard/progress/[id]/progressClient"

// app/dashboard/progress/[id]/page.tsx
export default async function ProgressPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const now = new Date()
  const raw = await getAthleteProgress(id, now.getFullYear(), now.getMonth())
  const { athlete, attendance } = JSON.parse(raw)

  return (
    <ProgressClient
      athleteId={id}
      athlete={athlete}
      initialAttendance={attendance}
    />
  )
}
