import CreateQuestion from "~/features/quiz/components/create-question";
import type { Route } from "./+types/session-test-admin-page";
import { Button } from "~/components/ui/button";


export const loader = async ({ params }: Route.LoaderArgs) => {

    return {id: params.id}
};



const SessionTestAdminPage = ({loaderData}:Route.ComponentProps) => {

    const {id} = loaderData

    const onSuccess = () => {

    }

    return (
        <>
            <Button>Add Question</Button>
            <CreateQuestion sessionTestId={id} onSuccess={onSuccess}/>
        </>
    )
}

export default SessionTestAdminPage