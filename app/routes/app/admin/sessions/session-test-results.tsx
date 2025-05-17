import { getAllStudentAttemptByTest } from "~/features/quiz/api/attempt/get-all-student-attempt-by-test"
import type { Route } from "./+types/session-test-results"



export const loader = async ({ params }: Route.LoaderArgs) => {
    
    const {data: attempts} = await getAllStudentAttemptByTest(params.test).catch(() => ({data: []}))

    return {attempts}
}

const SessionTestResults = ({loaderData}:Route.ComponentProps) => {

    const {attempts} = loaderData
    return (<>
        {attempts.map(e => e.user.name)}
    </>)
}

export default SessionTestResults