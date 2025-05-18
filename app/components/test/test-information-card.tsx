import { format } from "date-fns"
import { useRole } from "~/role-testing-provider"
import type { SessionTest } from "~/types/api"

interface Props {
    test: SessionTest,
    score?: number,
}

const TestInformationCard = ({test, score=0}:Props) => {

    const {role} = useRole()

    return (
        <div className={"w-full flex justify-between items-start"}>
            <div>
                <h2 className="font-bold text-xl mb-2">{test.title}</h2>
                <h4>
                Opened: {format(new Date(test.open_date), "MM/dd/yyyy HH:mm")}
                </h4>
                <h4>
                Closed: {format(new Date(test.close_date), "MM/dd/yyyy HH:mm")}
                </h4>
            </div>
            {role == 'user' && <h4 className={'font-bold text-lg'}>{`Highest Grade: ${score} / 100.00`}</h4>}
        </div>
    )
}

export default TestInformationCard