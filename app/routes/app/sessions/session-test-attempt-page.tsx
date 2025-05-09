import { FaArrowLeft } from "react-icons/fa";
import { getSessionTestQuestions } from "~/features/quiz/api/question/get-test-question";
import SessionTestAttemptGrid from "~/features/quiz/components/session-test-attempt-grid";
import type { Route } from "./+types/session-test-attempt-page";
import { Link } from "react-router";

export const loader = async ({ params }:Route.LoaderArgs) => {

    const {data: questions} = await getSessionTestQuestions(params.test)

    return {questions, sessionId: params.session}
}

const Quiz = ({loaderData}:Route.ComponentProps) => {

    const {questions, sessionId} = loaderData

    return (
        <div className="flex flex-col w-full">
            <div className={'w-full flex items-center mb-5'}>
                <Link to={`/session/${sessionId}`}>
                    <button
                        className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                        <FaArrowLeft/>
                    </button>
                </Link>
            </div>
            <div className="flex gap-2 w-full">
                <SessionTestAttemptGrid questions={questions.sort((a,b) => a.number - b.number)}/>
            </div>
        </div>
    );
}

export default Quiz