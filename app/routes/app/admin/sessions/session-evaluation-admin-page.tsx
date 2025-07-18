import EvaluationAdminGrid from "~/features/evaluation/components/evaluation-admin-grid"
import type { Route } from "./+types/session-evaluation-admin-page";


export const loader = async ({ params }: Route.LoaderArgs) => {
    
    return {session: params.session}
};

const SessionEvaluationAdminPage = ({loaderData}:Route.ComponentProps) => {

    const {session} = loaderData

    const onSuccess = () => {

    }

    return (
        <>
           <EvaluationAdminGrid onSuccess={onSuccess} id="" sessionId={session} /> 
        </>
    )
}

export default SessionEvaluationAdminPage