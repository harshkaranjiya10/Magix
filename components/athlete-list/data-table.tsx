"use client"

import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CalendarIcon,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"

import { Spinner } from "@/components/ui/spinner"
import { handleExportToExcel } from "@/app/utils/exportToExcel"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"

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
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  const [datePickerOpen, setDatePickerOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 20,
  })

  const router = useRouter()
  const Coach = useUser()

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    meta: {
      refreshData: async () => {
        await fetchAndMergeAttendance(selectedDate)
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  })

  const fetchAndMergeAttendance = async (date: Date) => {
    const normalizedDate = new Date(date)
    normalizedDate.setHours(0, 0, 0, 0)

    if (isNaN(normalizedDate.getTime())) {
      console.error("Invalid date:", date)
      return
    }

    const raw = await getAttendanceForToday(normalizedDate.toISOString())
    const attendanceRecords = JSON.parse(raw)

    const attendanceMap = new Map(
      attendanceRecords.map((r: any) => [r.userId, r.attended])
    )

    const merged = data.map((athlete) => ({
      ...athlete,
      attended: attendanceMap.get(athlete._id) ?? false,
      markedBy: Coach.userId,
    })) as TData[]

    setTableData(merged)

    const newSelection: Record<string, boolean> = {}
    merged.forEach((athlete, index) => {
      if (athlete.attended) {
        newSelection[String(index)] = true
      }
    })
    setRowSelection(newSelection)
  }

  React.useEffect(() => {
    const loadAttendance = async () => {
      setIsLoading(true)
      try {
        await fetchAndMergeAttendance(selectedDate)
      } finally {
        setIsLoading(false)
      }
    }

    loadAttendance()
  }, [selectedDate, data, setTableData])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const allRows = table.getRowModel().rows
      const selectedRows = table.getSelectedRowModel().rows
      const selectedIds = new Set(selectedRows.map((row) => row.id))

      const date = new Date(selectedDate)
      date.setHours(0, 0, 0, 0)

      const records = allRows.map((row) => ({
        userId: row.original._id,
        attended: selectedIds.has(row.id),
        markedBy: Coach.userId,
      }))

      const result = await markAttendance(JSON.stringify({ date, records }))
      await fetchAndMergeAttendance(date)

      if (result.success) toast.success("Attendance marked successfully!")
      else toast.error("Failed to mark attendance!")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="gap-2 sm:flex sm:items-center sm:justify-between">
        <div className="flex gap-2 p-4">
          <Input
            placeholder="Filter Names..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn("name")?.setFilterValue(event.target.value)
              table.setPageIndex(0)
            }}
            className="max-w-sm p-2"
            disabled={isLoading}
          />

          <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
                disabled={isLoading || isSubmitting}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date)
                    setDatePickerOpen(false)
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columns</Button>
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

        <div className="flex items-center space-x-2 p-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleSubmit}
            disabled={isLoading || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner data-icon="inline-start" />
                Submit
              </>
            ) : (
              "Submit"
            )}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleExportToExcel(table, selectedDate)}
            disabled={isLoading || isSubmitting}
          >
            Export
          </Button>
        </div>
      </div>
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading attendance...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer"
                onClick={() => row.toggleSelected()}
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
      <div className="flex items-center justify-between border-t px-4 py-3">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected &middot;
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
