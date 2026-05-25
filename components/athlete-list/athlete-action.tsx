// At the top of columns.tsx — add this component
import { deleteAthlete } from "@/app/actions/deleteAthlete"

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

export default function AthleteActions({ athleteId }: { athleteId: string }) {
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
