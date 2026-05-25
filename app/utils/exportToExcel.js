// Import required libraries
import * as XLSX from "xlsx"
import { toast } from "sonner" // Toast from Sonner for showing notifications
import { saveAs } from "file-saver" // Optional: Used to enhance file download handling

// Flag to prevent multiple exports at the same time
let isExportInProgress = false

/**
 * Function to handle exporting selected rows to an Excel file.
 * @param {Object} table - The @shadcn/ui table instance to access selected rows.
 */
export const handleExportToExcel = async (table, selectedDate) => {
  // Check if an export operation is already in progress
  if (isExportInProgress) {
    toast.error("Export is already in progress. Please wait.")
    return
  }

  // Set the flag to indicate the export operation has started
  isExportInProgress = true

  try {
    // Retrieve the selected rows using the table's getSelectedRowModel method
    const selectedRows = table.getRowModel().rows

    // Check if there are any selected rows
    if (selectedRows.length === 0) {
      toast.error("Please select products to export.")
      return
    }

    // Convert selected product data to an array of arrays for the worksheet
    const selectedProducts = selectedRows.map((row) => row.original)

    // Log the selected products for debugging
    const formattedDate = selectedDate
      .toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-")

    const fileName = `attendance_${formattedDate}.xlsx`

    // Create the data array for the worksheet, including headers and product data
    const worksheetData = [
      [`Attendance Report - ${formattedDate}`],
      [], // Empty spacer row
      ["Name", "Mobile", "Attendance", "createdAt"], // Header Row
      ...selectedProducts.map((product) => [
        product.name,
        product.mobile,
        product.attended ? "Present" : "Absent",
        product.createdAt,
      ]),
    ]

    // Create a new workbook and worksheet using XLSX
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "")

    XLSX.writeFile(workbook, fileName)

    // Optional: Save file using file-saver (if using for enhanced file handling)
    // const excelBlob = new Blob([workbook], { type: "application/octet-stream" });
    // saveAs(excelBlob, "selected_products.xlsx");

    // Notify success
    toast.success("Export completed successfully!")
  } catch (error) {
    // Log error for debugging
    console.error("Error during Excel export:", error)
    // Show user-friendly error message
    toast.error("An error occurred while exporting. Please try again.")
  } finally {
    // Reset the export flag regardless of success or error
    isExportInProgress = false
  }
}
