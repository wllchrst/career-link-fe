import type { Route } from "./+types/session-test-attempt-page";
import { getSessionTestQuestions } from "~/features/quiz/api/get-test-question";
import SessionTestAttemptGrid from "~/features/quiz/components/session-test-attempt-grid";

export const loader = async ({ params }:Route.LoaderArgs) => {

    const {data: questions} = await getSessionTestQuestions(params.test)

    return {questions}
}

const Quiz = ({loaderData}:Route.ComponentProps) => {

    const {questions} = loaderData

    return (
        <div className="flex gap-2 w-full">
            {/* <div className="flex bg-white shadow rounded-md">
                <GoArrowLeft />
                <div>Pretest Session 3</div>
            </div> */}
            <SessionTestAttemptGrid questions={questions}/>
        </div>
    );
}

export default Quiz