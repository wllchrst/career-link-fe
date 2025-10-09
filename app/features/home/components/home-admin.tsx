import { FaFilter } from "react-icons/fa";
import type { User } from "~/types/api";
import TableLayout from "~/components/layouts/table-layout";
import Paginator from "~/components/ui/paginator";
import { Button } from "~/components/ui/button";
import { exportToExcel, importExcel } from "~/lib/excel";
import { useNavigate, useRevalidator } from "react-router";
import { syncUser } from "../api/sync-student-data";
import { useRef, useState, type ChangeEvent } from "react";
import { MasterDataTableHeader } from "~/components/ui/table-header";
import StudentRow from "./student-row";
import { compare } from "~/lib/utils";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import { Progress } from "~/components/ui/progress";
import { createBatchUsers, type BatchUserInput } from "../api/create-batch-users";

interface StudentProps {
  student: User[];
  cur: number;
  lastPage: number;
}

const HomeAdmin = ({ student, cur, lastPage }: StudentProps) => {

  const [isLoading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Student data template based on User type
  const studentTemplate = [
    {
      nim: "",
      name: "",
      email: "",
      phone: "",
      major: "",
      cv_file_path: ""
    }
  ];

  const mappingStudents = async (res: BatchUserInput[]) => {
    const toastId = toast.loading("Importing students...");
    try {
      // Convert numeric fields to strings
      const processedStudents = res.map(student => ({
        ...student,
        nim: String(student.nim || ''),
        phone: String(student.phone || ''),
        email: String(student.email || ''),
        name: String(student.name || ''),
        major: String(student.major || ''),
        cv_file_path: String(student.cv_file_path || '') // Always send as string, never null
      }));

      await createBatchUsers(processedStudents);
      toast.success("Students imported successfully", { id: toastId });
      setTimeout(() => {
        setProgress(0);
        revalidator.revalidate();
      }, 2000);
    } catch (error) {
      toast.error(getErrorMessage(error), {
        id: toastId,
      });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const importStudents = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = (event) => importExcel<BatchUserInput>(event, (res) => mappingStudents(res));
    reader.readAsArrayBuffer(e.target.files![0]);
  };

  const onPrev = () => {
    if (cur == 1) return;
    navigate(`/home?page=${cur - 1}`);
  };
  const onNext = () => {
    if (lastPage == cur) return;
    navigate(`/home?page=${cur + 1}`);
  };
  const sync = () => {
    setLoading(true);
    const toastId = toast.loading("Syncing data...")
    syncUser().then(() => {
      toast.success("Sync success", {id: toastId})

      setTimeout(() => {
        setLoading(false);
        navigate(`/?page=${1}`);
      }, 2000);
      
    });
  };

  return (
    <div className="container flex flex-col">
      <h1 className="text-2xl text-primary font-bold mb-4">Student Lists</h1>
      <div className="flex justify-between items-center">
        
        <div className="flex gap-4">
          <Button
            onClick={() => exportToExcel("student-data-master", student)}
            className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3 hover:text-white transition duration-400"
          >
            Download Student Data
          </Button>
          <label htmlFor="student-file" className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3 hover:text-white hover:bg-primary transition duration-400 cursor-pointer">
            Import Student Data from Excel
          </label>
          <input 
            ref={fileInputRef} 
            type="file" 
            id="student-file" 
            hidden 
            accept=".xlsx,.xls" 
            onChange={importStudents}
          />
          <Button
            onClick={() => exportToExcel("student-data-template", studentTemplate)}
            className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3 hover:text-white transition duration-400"
          >
            Download Student Data Excel Template
          </Button>
          <Button
            onClick={sync}
            className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3 hover:text-white transition duration-400"
          >
            {isLoading ? "Syncing..." : "Sync Data"}
          </Button>
          <div className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3">
            <FaFilter />
            <div>Filter</div>
          </div>
        </div>
      </div>
      {progress > 0 && <Progress value={progress} className="w-full"/>}
      <Paginator cur={cur} student={student} onPrev={onPrev} onNext={onNext} lastPage={lastPage} />
      <TableLayout
        header = {<MasterDataTableHeader />}
      >
        {student.sort((a, b) => compare(a.nim ?? '', b.nim ?? '')).map(
          (e, idx) => (
            <StudentRow cur={cur} idx={idx} e={e}/>
          )
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
        )}
      </TableLayout>
      <Paginator cur={cur} student={student} onPrev={onPrev} onNext={onNext} lastPage={lastPage} />
    </div>
  );
};

export default HomeAdmin;
