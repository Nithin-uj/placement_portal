// src/exportToExcel.js
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName) => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Convert the data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Generate the XLS file and save it
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  // Create a Blob from the buffer
  const blob = new Blob([excelBuffer], { type: 'application/vnd.ms-excel' });

  // Save the Blob to a file
  saveAs(blob, `${fileName}.xlsx`);
};
