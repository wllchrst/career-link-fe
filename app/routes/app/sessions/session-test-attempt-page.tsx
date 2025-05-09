import { FaArrowLeft } from "react-icons/fa";
import { getSessionTestQuestions } from "~/features/quiz/api/question/get-test-question";
import SessionTestAttemptGrid from "~/features/quiz/components/session-test-attempt-grid";
import type { Route } from "./+types/session-test-attempt-page";
import { Link, useNavigate } from "react-router";
import { finalizeStudentAttempt } from "~/features/quiz/api/attempt/finalize-student-attempt";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";

export const loader = async ({ params }:Route.LoaderArgs) => {

    const {data: questions} = await getSessionTestQuestions(params.test)

    return {questions, sessionId: params.session, testId: params.test, attemptId: params.attempt}
}

const Quiz = ({loaderData}:Route.ComponentProps) => {

    const {questions, sessionId, attemptId, testId} = loaderData
    const navigate = useNavigate()

    const finish = async (id:string) => {
        try{
            await finalizeStudentAttempt({
                data: {
                    test_id: testId,
                    user_id: 'sdf'
                }
            })
            toast.success("Your test has been successfully submitted!", {id: id})
            setTimeout(() => {
                navigate(`/session/${sessionId}`)
            }, 2000);
        }catch(error){
            toast.error(getErrorMessage(error), {
                id: id,
            });
        }
    }

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
                <SessionTestAttemptGrid onFinish={finish} attemptId={attemptId} questions={questions.sort((a,b) => a.number - b.number)}/>
            </div>
        </div>
    );
}

export default Quiz