import { FaArrowLeft } from "react-icons/fa";
import { getSessionTestQuestions } from "~/features/quiz/api/question/get-test-question";
import SessionTestAttemptGrid from "~/features/quiz/components/session-test-attempt-grid";
import type { Route } from "./+types/session-test-attempt-page";
import { Link, useNavigate } from "react-router";
import { finalizeStudentAttempt } from "~/features/quiz/api/attempt/finalize-student-attempt";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import { useEffect, useState } from "react";
import type { Question } from "~/types/api";
import { useAuth } from "~/lib/auth";

export const loader = async ({ params }:Route.LoaderArgs) => {

    
    return {bootcampId: params.bootcamp, sessionId: params.session, testId: params.test, attemptId: params.attempt}
}

const Quiz = ({loaderData}:Route.ComponentProps) => {

    let {sessionId, bootcampId, attemptId, testId} = loaderData
    
    const [questions, setQuestions] = useState<Question[]>([]);

    const fetchQuestion = async () => {
        
        let savedQuestions = window.localStorage.getItem(`test_questions-${attemptId}`);

        if (!savedQuestions) {

            let {data}:{data: Question[]} = await getSessionTestQuestions(loaderData.testId).catch(() => ({data: []}))
            for (let i = data.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [data[i], data[j]] = [data[j], data[i]];
            }
            setQuestions(data);
            window.localStorage.setItem(`test_questions-${attemptId}`, JSON.stringify(data));
            
        }else{
            console.log("Using saved questions")
            setQuestions(JSON.parse(savedQuestions));
        }
    }

    useEffect(() => {
        fetchQuestion()
    }, [])

    const {user} = useAuth()
    

    const navigate = useNavigate()

    const finish = async (id:string) => {
        try{
            await finalizeStudentAttempt({
                data: {
                    test_id: testId,
                    user_id: user?.id!
                }
            })
            toast.success("Your test has been successfully submitted!", {id: id})
            setTimeout(() => {
                navigate(`/bootcamps/${bootcampId}/session/${sessionId}`)
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
                <Link to={`/bootcamps/${bootcampId}/session/${sessionId}`}>
                    <button
                        className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                        <FaArrowLeft/>
                    </button>
                </Link>
            </div>
            <div className="flex gap-2 w-full">
               {
               questions.length > 0 && 
               <SessionTestAttemptGrid onFinish={finish} attemptId={attemptId} questions={questions}/>
               }
            </div>
        </div>
    );
}

export default Quiz