import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import type { Student } from "~/types/api";

interface StudentProps {
    student: Student[];
}

const HomeAdmin = ({ student } : StudentProps) => {
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
                    <div className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3">
                        <div>Sync Data</div>
                    </div>
                    <div className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3">
                        <div>Download All Students</div>
                    </div>
                    <div className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3">
                        <FaFilter />
                        <div>Filter</div>
                    </div>
                </div>
            </div>
            <table className="mt-5 border-separate border-spacing-y-5">
                <thead>
                    <tr>
                        <th className="pr-3">
                            <input type="checkbox" className="w-4 h-4" />
                        </th>
                        <th className="font-normal">NIM</th>
                        <th className="font-normal">Name</th>
                        <th className="font-normal">Email</th>
                        <th className="font-normal">Current Semester</th>
                        <th className="font-normal">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {student.map((s, idx) => (
                        <tr key={idx} className="bg-white shadow rounded-md">
                            <td className="px-4 py-3 rounded-l-md">
                                <input type="checkbox" className="w-4 h-4" />
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                                {s.nim}
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                                {s.full_name}
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                                {s.email}
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                                {s.curr_semester}
                            </td>
                            <td className="px-4 py-3 text-sm rounded-r-md">
                                <div className="flex justify-center gap-4">
                                    <button className="p-1 text-blue-600 hover:bg-blue-100 rounded-md transition-colors">
                                        <MdEdit className="text-primary text-3xl"/>
                                    </button>
                                    <button className="p-1 text-red-600 hover:bg-red-100 rounded-md transition-colors">
                                        <MdDelete className="text-primary text-3xl"/>
                                    </button>
                                    <button className="bg-accent text-white px-4 py-1 rounded-md text-sm">
                                        Detail
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HomeAdmin