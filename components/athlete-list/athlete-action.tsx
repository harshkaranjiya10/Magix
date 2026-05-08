// At the top of columns.tsx — add this component
import { useState } from "react"
import { deleteAthlete } from "@/app/actions/deleteAthlete"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { MoreHorizontalIcon, Pencil, Trash2Icon } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import { useRouter } from "next/navigation"

export default function AthleteActions({
  athleteId,
  onDeleted,
}: {
  athleteId: string
  onDeleted: () => void
}) {
  const handleDelete = async () => {
    await deleteAthlete(athleteId)
    onDeleted() // tell parent to refresh
  }

  const router = useRouter()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => router.push(`/dashboard/progress/${athleteId}`)}
            >
              <Pencil />
              Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive" onClick={handleDelete}>
              <Trash2Icon />
              Trash
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
