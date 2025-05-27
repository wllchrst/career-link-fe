import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { exportToExcel } from "~/lib/excel"
import type { Route } from "./+types/enrollments"
import { getEnrollmentByBootcamp } from "~/features/enrollments/api/get-enrollment-by-bootcamp"
import EmptyMessage from "~/components/ui/empty-message"


interface Template {
    email: string
}

export const loader = async ({params}:Route.LoaderArgs) => {

    const {data: enrollments} = await getEnrollmentByBootcamp(params.bootcamp)

    return {enrollments, bootcamp: params.bootcamp}
}

const Enrollments = ({loaderData}:Route.ComponentProps) => {

    const {enrollments, bootcamp} = loaderData

    const template: Template[] = [
        {
            email: "axel.kurniawan@binus.ac.id (example)"
        }
    ]

    return (<>
        <div className="w-full flex flex-col gap-5">
            <div className={'w-full flex items-center'}>
                <Link to={`/bootcamps/${bootcamp}`}>
                    <button
                        className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                        <FaArrowLeft/>
                    </button>
                </Link>
                <h2 className={'font-bold text-left w-full text-4xl text-slate-700 p-6 h-full'}>Enrolled Students</h2>
            </div>
            <div className="flex gap-5 w-full">
                <Button className="bg-purple-500 hover:bg-purple-400" onClick={() => exportToExcel('enrolled-students', template)}>
                    Download Excel Template
                </Button>
                <Button className="bg-green-500 hover:bg-green-400">
                    Import Excel
                </Button>
            </div>
            {
                enrollments.length < 1 ? <EmptyMessage text="There is no enrolled student in this bootcamp. if you want to add student, you can import excel using our template" title="No Enrolled Student"/>:
                <></>
            }

        </div>
    </>)
}

export default Enrollments