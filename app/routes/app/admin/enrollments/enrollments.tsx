import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router"
import type { Route } from "./+types/enrollments"
import { getEnrollmentByBootcamp } from "~/features/enrollments/api/get-enrollment-by-bootcamp"
import EnrollmentGrid from "~/features/enrollments/components/enrollment-grid"

export const loader = async ({params}:Route.LoaderArgs) => {

    const {data: enrollments} = await getEnrollmentByBootcamp(params.bootcamp)

    return {enrollments, bootcamp: params.bootcamp}
}

const Enrollments = ({loaderData}:Route.ComponentProps) => {

    const {enrollments, bootcamp} = loaderData

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
            <EnrollmentGrid enrollments={enrollments} bootcampId={bootcamp}/>
        </div>
    </>)
}

export default Enrollments