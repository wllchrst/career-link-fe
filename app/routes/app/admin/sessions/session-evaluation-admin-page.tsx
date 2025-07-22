import EvaluationAdminGrid from "~/features/evaluation/components/evaluation-admin-grid"
import type { Route } from "./+types/session-evaluation-admin-page";
import { getEvaluationQuestionBySession } from "~/features/evaluation/api/get-evaluation-question-by-session";
import { useRevalidator } from "react-router";


export const loader = async ({ params }: Route.LoaderArgs) => {

    let {data: evaluationQuestions} = await getEvaluationQuestionBySession(params.session)
    
    return {session: params.session, evaluationQuestions}
};

const SessionEvaluationAdminPage = ({loaderData}:Route.ComponentProps) => {

    const {session, evaluationQuestions} = loaderData

    let revalidator = useRevalidator()

    const onSuccess = async () => {
        await revalidator.revalidate()
    }

    return (
        <>
           <EvaluationAdminGrid onSuccess={onSuccess} id="" sessionId={session} questions={evaluationQuestions}/> 
        </>
    )
}

export default SessionEvaluationAdminPage