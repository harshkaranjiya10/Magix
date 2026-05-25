"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import AthleteActions from "@/components/athlete-list/athlete-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.w
export type Athlete = {
  _id: string
  id: string
  mobile: string
  name: string
  status: string
  workout: string
}

export const columns: ColumnDef<Athlete>[] = [
  {
    id: "select",
    size: 40,

    header: ({ table }) => (
      <div>
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("name").length > 20
          ? row.getValue("name").slice(0, 15) + "..."
          : row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "markedBy",
    header: "Marked By",

    cell: ({ row }) =>
      row.getValue("markedBy") === "" ? "Not Marked" : row.getValue("markedBy"),
  },
  {
    accessorKey: "dummy",
    header: "",
    cell: ({ row, table }) => (
      <AthleteActions key={row.id} athleteId={row.original._id} />
    ),
  },
]
