import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import type { User } from "~/types/api";
import * as XLSX from 'xlsx';
import { useState, type ChangeEvent } from "react";
import TableLayout from "~/components/layouts/table-layout";
import { TableCell, TableRow } from "~/components/ui/table";
import Paginator from "~/components/ui/paginator";
import { Button } from "~/components/ui/button";
import pkg from 'file-saver';

interface StudentProps {
    student: User[];
}

const HomeAdmin = ({ student } : StudentProps) => {
    

  const [data, setData] = useState<User[]>([]);
  const [page, setPage] = useState(0);

  const handleFileUpload = (e:ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    const reader = new FileReader();

    reader.onload = (event) => {
        if (event.target == null) return

        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        let sheetData = XLSX.utils.sheet_to_json<string[]>(sheet, {header: 1});
        sheetData = sheetData.slice(11)
        
        const headers = sheetData[0];
        const rows = sheetData.slice(1).map((row) => {
            const obj: any = {};
            headers.forEach((header, index) => {
                obj[header.toLowerCase().replace(' ', '_')] = row[index];
            });
            return obj;
        });

        setData(rows)
        console.log(sheetData.length)
    };

    if (file != null){
        reader.readAsBinaryString(file[0]);
    }
  };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
        pkg.saveAs(blob, `${'Student-Data'}.xlsx`);
    };

    const onPrev = () => {
        if (0 < page)
            setPage(page - 1)
    }
    const onNext = () => {
        if (Math.floor(data.length / 10) > page)
            setPage(page + 1)
    }

    return (
        <div className="container flex flex-col">
            <h1 className="text-2xl text-primary font-bold mb-4">Student Lists</h1>
            <div className="flex justify-between items-center">
                <div className="flex gap-5">
                    <div className="flex items-center bg-white px-3 py-2 rounded-md w-120">
                        <CiSearch className="text-gray-500 text-xl" />
                        <input
                            type="text"
                            placeholder="Search by NIM, Name, or Email"
                            className="bg-transparent outline-none px-2 py-1 text-gray-600 w-full"
                        />
                    </div>
                    <button className="bg-accent text-white px-4 py-2 rounded-md">
                        Search
                    </button>
                </div>
                <div className="flex gap-4">
                    <label htmlFor="file" className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3">
                        Sync Data
                    </label>
                    <input type="file" id='file' onChange={handleFileUpload} className="hidden"/>
                    <Button onClick={exportToExcel} className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3">
                        Download All Students
                    </Button>
                    <div className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3">
                        <FaFilter />
                        <div>Filter</div>
                    </div>
                </div>
            </div>
            <TableLayout columns={['No.', 'NIM', 'Name', 'Email', 'Phone', 'Program']}>
                {
                    data.slice(page * 10, page * 10 + 10).map((e, idx) => 
                        <TableRow className={`${idx%2 == 0?'bg-gray-300':''}`}>
                            <TableCell className="font-medium">{(idx + page * 10) + 1}</TableCell>
                            <TableCell>{e.student_id ?? '-'}</TableCell>
                            <TableCell>{e.student_name}</TableCell>
                            <TableCell>{e.student_email}</TableCell>
                            <TableCell>{e.student_phone.replace('+62', '0')}</TableCell>
                            <TableCell className="text-center">{e.academic_program ?? '-'}</TableCell>
                        </TableRow>
                    )
                }
            </TableLayout>
            <Paginator onPrev={onPrev} onNext={onNext} />
            {/* student id, academic group, student name, student email, student phone */}
        </div>
    )
}

export default HomeAdmin