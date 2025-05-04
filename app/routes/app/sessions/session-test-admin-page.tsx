import CreateQuestion from "~/features/quiz/components/create-question";
import type { Route } from "./+types/session-test-admin-page";
import { Button } from "~/components/ui/button";
import { useState } from "react";


export const loader = async ({ params }: Route.LoaderArgs) => {


    return {questions: [], id: params.test}
};



const SessionTestAdminPage = ({loaderData}:Route.ComponentProps) => {

    const {questions, id} = loaderData
    const [count, setCount] = useState(questions.length)

    return (
        <>
        <div className="flex flex-col gap-5">
            <div className="flex gap-5">
                <Button onClick={() =>setCount(count + 1)}>Add Question</Button>
                <Button onClick={() =>setCount(count == 0 ? 0:count - 1)} variant={'destructive'}>Delete Question</Button>
            </div>
            {Array.from({length: count}).map((_, idx) => 
                <CreateQuestion sessionTestId={id} number={(idx+1) + ""}/>
            )}

            
        </div>
        </>
    )
}

export default SessionTestAdminPage