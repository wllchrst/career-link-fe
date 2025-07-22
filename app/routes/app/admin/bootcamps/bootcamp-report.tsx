import type { Route } from "./+types/bootcamp-report"
import { Link } from "react-router"
import { FaArrowLeft } from "react-icons/fa"
import BootcampReportGrid from "~/features/bootcamp-report/components/bootcamp-report-grid"
import { getBootcampReportByBootcampId } from "~/features/bootcamp-report/api/get-bootcamp-report-by-bootcamp-id"

export const loader = async ({ params }: Route.LoaderArgs) => {

    const {data: enrollments} = await getBootcampReportByBootcampId(params.bootcamp)


    return {id: params.bootcamp, enrollments}
}

const BootcampReport = ({loaderData}:Route.ComponentProps) => {

    const {id, enrollments} = loaderData
    return (<>
    <div className="w-full">
        <div className={'w-full flex items-center'}>
            <Link to={`/bootcamps/${id}`}>
                <button
                    className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                    <FaArrowLeft/>
                </button>
            </Link>
            <h2 className={'font-bold text-left w-full text-4xl text-slate-700 p-6 h-full'}>Student Report Summary</h2>
        </div>
        <BootcampReportGrid enrollments={enrollments}/>
    </div>
    </>)
}

export default BootcampReport