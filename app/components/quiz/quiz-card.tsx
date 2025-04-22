import TableLayout from "~/components/layouts/table-layout";

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
        </>
    )
}

export default QuizCard;