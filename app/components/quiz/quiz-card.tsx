import TableLayout from "~/components/layouts/table-layout";
import {Link} from "react-router";
import { TableCell, TableRow } from "../ui/table";
import { useRole } from "~/role-testing-provider";
import { Button } from "../ui/button";

interface Props{
    onCreate: () => void
}

const QuizCard = ({onCreate}:Props) => {
    
    const {role} = useRole()

    return (
        <>
            <div className={'w-full flex justify-between items-start'}>
                <div>
                    <h4>Opened: Tuesday, 11 May 2025, 12:00 PM</h4>
                    <h4>Closed: Friday, 14 May 2025, 12:00 PM</h4>
                </div>
                {/* <h2 className={'font-bold'}>Highest Grade: 95.00 / 100.00</h2> */}
            </div>
            <div className={'w-full flex justify-between items-start'}>
                <div>
                    <h4>Grading Method  : Highest grade</h4>
                    <h4>Attempts Allowed: 2</h4>
                </div>
            </div>
            
            <div className="flex gap-5 justify-start items-center">
                {role != 'admin'?
                    <Link to={'/quiz'}>
                        <Button
                            className={'bg-[var(--accent)] text-white rounded-md p-2 w-40 hover:bg-[var(--secondary)] transition duration-200 ease-in-out'}>
                            Attempt Quiz
                        </Button>
                    </Link>:
                    <>
                        <Button
                            className={'bg-slate-500 text-white rounded-md p-2 w-40 hover:bg-slate-700 transition duration-200 ease-in-out'}
                            onClick={onCreate}
                        >
                            Add New Quiz
                        </Button>
                        <Button
                            className={'bg-[var(--accent)] text-white rounded-md p-2 w-40 hover:bg-[var(--secondary)] transition duration-200 ease-in-out'}>
                            Update
                        </Button>
                        <Button
                            className={'bg-red-500 text-white rounded-md p-2 w-40 hover:bg-red-700 transition duration-200 ease-in-out'}>
                            Delete
                        </Button>
                    </>
                }
            </div>
        </>
    )
}

export default QuizCard;