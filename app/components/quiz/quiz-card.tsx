import TableLayout from "~/components/layouts/table-layout";
import {Link} from "react-router";

const QuizCard = () => {

    return (
        <>
            <div className={'w-full flex justify-between items-start'}>
                <div>
                    <h4>Opened: Tuesday, 11 May 2025, 12:00 PM</h4>
                    <h4>Closed: Friday, 14 May 2025, 12:00 PM</h4>
                </div>
                <h2 className={'font-bold'}>Highest Grade: 95.00 / 100.00</h2>
            </div>
            <div className={'w-full flex justify-between items-start'}>
                <div>
                    <h4>Grading Method  : Highest grade</h4>
                    <h4>Attempts Allowed: 2</h4>
                </div>
            </div>
            <h2 className={'font-bold text-lg'}>Summary of Your Previous Attempts</h2>
            <TableLayout />
            <Link to={'/quiz'}>
                <button
                    className={'bg-[var(--accent)] text-white rounded-md p-2 w-40 hover:bg-[var(--secondary)] transition duration-200 ease-in-out'}>
                    Attempt Quiz
                </button>
            </Link>
        </>
    )
}

export default QuizCard;