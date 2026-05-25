// app/dashboard/progress/[id]/not-found.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col items-center justify-center gap-4 p-4 text-center">
      <UserX className="h-16 w-16 text-muted-foreground" />
      <h1 className="text-2xl font-bold">Athlete Not Found</h1>
      <p className="text-muted-foreground">
        No athlete exists with this ID. It may have been deleted or the link is
        invalid.
      </p>
      <Button asChild>
        <Link href="/dashboard/attendance">Back to Athletes</Link>
      </Button>
    </div>
  )
}
