import * as XLSX from 'xlsx'
import pkg from 'file-saver';


const exportToExcel = (name:string, data:any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    pkg.saveAs(blob, `${name}.xlsx`);
};

function importExcel<T>(event: ProgressEvent<FileReader>, onSuccess:(res:T[]) => void) {
    if (event.target == null) return []
    
    const workbook = XLSX.read(event.target.result, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    let sheetData = XLSX.utils.sheet_to_json<T>(sheet, {header: 1});

    onSuccess(sheetData)
}

export {exportToExcel, importExcel}
