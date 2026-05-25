"use client"

import { ColumnDef } from "@tanstack/react-table"
import FeesActions from "@/components/athlete-list-fees/fees-action"

export type Athlete = {
  userId: string
  paidOn: string
  amount: number
  validFrom: string
  validUntil: string
  notes: string
  status: string
  _id: string
}

export const columns: ColumnDef<Athlete>[] = [
  {
    accessorKey: "paidOn",
    header: "Paid On",
    cell: ({ row }) => {
      const date = new Date(row.getValue("paidOn"))
      return date.toLocaleDateString("en-IN", { 
        day: "numeric", 
        month: "short", 
        year: "numeric" 
      })
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => `₹${row.getValue("amount")}`,
  },
  {
    accessorKey: "validFrom",
    header: "Valid From",
    cell: ({ row }) => {
      const date = new Date(row.getValue("validFrom"))
      return date.toLocaleDateString("en-IN", { 
        day: "numeric", 
        month: "short", 
        year: "numeric" 
      })
    },
  },
  {
    accessorKey: "validUntil",
    header: "Valid Until",
    cell: ({ row }) => {
      const date = new Date(row.getValue("validUntil"))
      return date.toLocaleDateString("en-IN", { 
        day: "numeric", 
        month: "short", 
        year: "numeric" 
      })
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium
          ${status === "active"  ? "bg-green-100 text-green-700"   : ""}
          ${status === "expired" ? "bg-red-100 text-red-500"       : ""}
          ${status === "pending" ? "bg-yellow-100 text-yellow-600" : ""}
        `}>
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string
      return notes || "—"
    },
  },
  {
      accessorKey: "dummy",
      header: "",
      cell: ({ row, table }) => (
        <FeesActions
          key={row.id}
          fees={row.original}
          athleteId={row.original.userId}
          onDeleted={() => table.options.meta?.refreshData()}
          onUpdate={() => table.options.meta?.refreshData()}
        />
      ),
    },
]