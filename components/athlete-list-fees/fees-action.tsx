// At the top of columns.tsx — add this component
import { deleteFees } from "@/app/actions/deleteFees"

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
import { Athlete } from "./column"
import FeesForm from "../fees-form"
import { useEffect, useState } from "react"

export default function FeesActions({
  athleteId,
  fees,
  onDeleted,
  onUpdate,
}: {
  athleteId: string
  onDeleted: () => void
  onUpdate: () => void
  fees: Athlete
}) {
  const handleDelete = async () => {
    await deleteFees(fees._id)
    onDeleted() // tell parent to refresh
  }

  const router = useRouter()
  const [editOpen, setEditOpen] = useState(false)
  //console.log(fees)

  useEffect(() => {
    //console.log(fees)
  }, [fees])
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
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
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

      {editOpen && (
        <FeesForm
          athleteId={athleteId}
          initialData={{ ...fees, amount: fees.amount.toString() }}
          onSuccess={() => {
            setEditOpen(false)
          }}
        />
      )}
    </>
  )
}
