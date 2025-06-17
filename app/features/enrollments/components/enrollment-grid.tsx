import { useRef, useState, type ChangeEvent } from "react"
import { Button } from "~/components/ui/button"
import EmptyMessage from "~/components/ui/empty-message"
import { exportToExcel, importExcel } from "~/lib/excel"
import type { Enrollment } from "~/types/api"
import { createEnrollment } from "../api/create-enrollment"
import { useRevalidator } from "react-router"
import toast from "react-hot-toast"
import { getErrorMessage } from "~/lib/error"
import { Progress } from "~/components/ui/progress"
import TableLayout from "~/components/layouts/table-layout"
import { MasterDataTableHeader } from "~/components/ui/table-header"
import { compare } from "~/lib/utils"
import StudentRow from "~/features/home/components/student-row"

interface Props {
    enrollments: Enrollment[],
    bootcampId: string,
}

interface Template {
    email: string
}

const EnrollmentGrid = ({enrollments, bootcampId}:Props) => {

    const revalidator = useRevalidator()
    const [progress, setProgress] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const template: Template[] = [
        {
            email: "axel.kurniawan@binus.ac.id"
        }
    ]

    const mappingStudent=  async (res:Template[]) => {
        const toastId = toast.loading("Enrolling students...");
    try {
        for (let i = 0; i < res.length; i++){
            await createEnrollment(res[i].email, bootcampId)
            setProgress(prev => prev + 100 / res.length);
        }
        toast.success("Student imported", { id: toastId });
        setTimeout(() => {
            setProgress(0)
            revalidator.revalidate()
        }, 3000);
    } catch (error) {
      toast.error(getErrorMessage(error), {
        id: toastId,
      });
    }finally{
        if (fileInputRef.current){
            fileInputRef.current.value = "";
        }
    }

    }
    
    const importStudent = (e:ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        reader.onload = (event) => importExcel<Template>(event, (res) => mappingStudent(res))
        reader.readAsArrayBuffer(e.target.files![0])
    }

    return (
        <>
            <div className="flex gap-5 w-full">
                <Button className="bg-purple-500 hover:bg-purple-400" onClick={() => exportToExcel('enrolled-students', template)}>
                    Download Excel Template
                </Button>
                <label htmlFor="file" className="bg-green-600 hover:bg-green-500 px-2 rounded-md text-white text-sm font-medium flex items-center justify-center">
                    Import Excel
                </label>
                <input ref={fileInputRef} type="file" name="" id="file" hidden onChange={importStudent}/>
            </div>
            {progress > 0 && <Progress value={progress} className="w-full"/>}
            {
                enrollments.length < 1 ? <EmptyMessage text="There is no enrolled student in this bootcamp. if you want to add student, you can import excel using our template" title="No Enrolled Student"/>:
                <TableLayout
                    header = {<MasterDataTableHeader />}
                >
                    {enrollments.sort((a, b) => compare(a.user.nim ?? '', b.user.nim ?? '')).map(
                    (e, idx) => (
                        <StudentRow cur={1} idx={idx} e={e.user}/>
                    )
                    )}
                </TableLayout>
            }
        </>
    )
}

export default EnrollmentGrid