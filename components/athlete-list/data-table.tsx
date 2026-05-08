"use client"

import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  RowSelection,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"

import { markAttendance } from "@/app/actions/markAttendance"
import { getAttendanceForToday } from "@/app/actions/getAttendance"

import { toast } from "sonner"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [tableData, setTableData] = React.useState<TData[]>(data)
  const [sorting, setSorting] = React.useState<SortingState>([])

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const [rowSelection, setRowSelection] = React.useState({})
  const [presentAthletes, setPresentAthletes] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    meta: {
      refreshData: async () => {
        // re-fetch athletes from your parent or re-init
        await fetchAndMergeAttendance()
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  React.useEffect(() => {
    const initAttendance = async () => {
      const date = new Date()
      date.setHours(0, 0, 0, 0)

      const records = data.map((athlete) => ({
        userId: athlete._id,
      }))
      await markAttendance(JSON.stringify({ date, records }))

      // Now fetch today's actual attendance and merge
      await fetchAndMergeAttendance()
    }

    initAttendance()
  }, []) // runs once on mount

  const fetchAndMergeAttendance = async () => {
    const raw = await getAttendanceForToday()
    const attendanceRecords: { userId: string; attended: boolean }[] =
      JSON.parse(raw)

    // Build a lookup map: userId → attended
    const attendanceMap = new Map(
      attendanceRecords.map((r) => [r.userId, r.attended])
    )

    // Merge attended status into each athlete row
    const merged = data.map((athlete) => ({
      ...athlete,
      attended: attendanceMap.get(athlete._id) ?? false,
    })) as TData[]

    setTableData(merged)

    const newSelection: Record<string, boolean> = {}
    merged.forEach((athlete, index) => {
      if (athlete.attended) {
        newSelection[String(index)] = true
      }
    })
    setRowSelection(newSelection)
    data = merged
  }

  const handleSubmit = async () => {
    const allRows = table.getRowModel().rows
    const selectedRows = table.getSelectedRowModel().rows

    const selectedIds = new Set(selectedRows.map((row) => row.id))
    //console.log(allRows)
    const date = new Date()
    date.setHours(0, 0, 0, 0)

    const records = allRows.map((row) => ({
      userId: row.original._id,
      attended: selectedIds.has(row.id),
    }))

    const result = await markAttendance(JSON.stringify({ date, records }))

    await fetchAndMergeAttendance()

    if (result.success) return toast.success("Attendance marked successfully!")
    else return toast.error("Failed to mark attendance!")
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="flex items-center p-4">
        <Input
          placeholder="Filter Names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm p-2"
        />
        <div className="m-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    column.id !== "dummy" &&
                    column.id !== "name" &&
                    column.id !== "select" && (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          variant="default"
          size="sm"
          className="mr-2"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      {/* Selected columns visible */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
