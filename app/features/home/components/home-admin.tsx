import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import type { User } from "~/types/api";
import TableLayout from "~/components/layouts/table-layout";
import { TableCell, TableRow } from "~/components/ui/table";
import Paginator from "~/components/ui/paginator";
import { Button } from "~/components/ui/button";
import { exportToExcel } from "~/lib/excel";
import { useNavigate } from "react-router";
import { syncUser } from "../api/sync-student-data";
import { useState } from "react";

interface StudentProps {
    student: User[];
    cur: number;
    lastPage: number;
}

const HomeAdmin = ({ student, cur, lastPage } : StudentProps) => {
    const perPage = 8
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onPrev = () => {
        if (cur == 1) return
        navigate(`/?page=${cur - 1}&per_page=${perPage}`)
    }
    const onNext = () => {
        if (lastPage == cur) return
        navigate(`/?page=${cur + 1}&per_page=${perPage}`)
    }
    const sync = () => {
        setLoading(true)
        syncUser().then(e => {
            setLoading(false)
            navigate(`/?page=${1}&per_page=${perPage}`)
            
        })
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
                    <Button onClick={() => exportToExcel('Student-data-master', student)} className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3 hover:text-white transition duration-400">
                        Download Student Data
                    </Button>
                    <Button onClick={sync} className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3 hover:text-white transition duration-400">
                       {isLoading ? 'Syncing...':'Sync Data'}
                    </Button>
                    <div className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3">
                        <FaFilter />
                        <div>Filter</div>
                    </div>
                </div>
            </div>
            <TableLayout columns={['No.', 'NIM', 'Name', 'Email', 'Phone', 'Program']}>
                {
                    student.map((e, idx) => 
                        <TableRow className="shadow-md p-5 bg-white rounded-lg grid grid-cols-20">
                            <TableCell className="font-medium text-center col-span-1">{(idx + (cur - 1) * perPage) + 1}</TableCell>
                            <TableCell className=" col-span-2">{e.nim ?? '-'}</TableCell>
                            <TableCell className=" col-span-7">{e.name}</TableCell>
                            <TableCell className=" col-span-5">{e.email}</TableCell>
                            <TableCell className=" col-span-2">{e.phone.replace('+62', '0')}</TableCell>
                            <TableCell className="text-center col-span-3">{e.major ?? '-'}</TableCell>
                        </TableRow>
                        // <tr key={idx} className="bg-white shadow rounded-md">
                        //     <td className="px-4 py-3 rounded-l-md">
                        //         <input type="checkbox" className="w-4 h-4" />
                        //     </td>
                        //     <td className="px-4 py-3 text-sm text-center">
                        //         {e.nim ?? '-'}
                        //     </td>
                        //     <td className="px-4 py-3 text-sm text-center">
                        //         {e.name}
                        //     </td>
                        //     <td className="px-4 py-3 text-sm text-center">
                        //         {e.email}
                        //     </td>
                        //     <td className="px-4 py-3 text-sm text-center">
                        //         {e.phone.replace('+62', '0')}
                        //     </td>
                        //     <td className="px-4 py-3 text-sm text-center">
                        //         {e.major ?? '-'}
                        //     </td>
                        //     <td className="px-4 py-3 text-sm rounded-r-md">
                        //         <div className="flex justify-center gap-4">
                        //             <button className="p-1 text-blue-600 hover:bg-blue-100 rounded-md transition-colors">
                        //                 <MdEdit className="text-primary text-3xl"/>
                        //             </button>
                        //             <button className="p-1 text-red-600 hover:bg-red-100 rounded-md transition-colors">
                        //                 <MdDelete className="text-primary text-3xl"/>
                        //             </button>
                        //             <button className="bg-accent text-white px-4 py-1 rounded-md text-sm">
                        //                 Detail
                        //             </button>
                        //         </div>
                        //     </td>
                        // </tr>
                    )
                }
            </TableLayout>
            <Paginator onPrev={onPrev} onNext={onNext} lastPage={lastPage}/>
        </div>
    )
}

export default HomeAdmin