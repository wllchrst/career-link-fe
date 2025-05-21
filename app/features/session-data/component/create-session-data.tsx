import { useForm } from "react-hook-form"
import { createSessionData, type CreateSessionDataInput, createSessionDataInputSchema } from "../api/create-session-data"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Session } from "~/types/api"
import { Form } from "~/components/ui/form"
import Field from "~/components/ui/form-field"
import { Button } from "~/components/ui/button"
import toast from "react-hot-toast"
import { getErrorMessage } from "~/lib/error"

interface Props {
    session:Session,
    onSuccess: () => void
}

const CreateSessionData = ({session, onSuccess}:Props) => {

    const form = useForm<CreateSessionDataInput>({
        resolver: zodResolver(createSessionDataInputSchema),
        defaultValues: {
            description: '',
            link: '',
            session_id: session.id
        }
    })

    const onSubmit = async (data:CreateSessionDataInput) => {
        const toastId = toast.loading("Creating session data...")

        try {
            const res = await createSessionData({data})
            toast.success(res.message, {id: toastId})
            
        } catch (error) {
            toast.error(getErrorMessage(error), {id: toastId})
            
        }


        onSuccess()
    }

    return (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Field control={form.control} label="Link" name="link" placeholder="https://website.com/" />
                <Field control={form.control} label="Description" name="description" placeholder="https://website.com/" />
                <Button>Submit</Button>
            </form>
        </Form>
    </>)
}

export default CreateSessionData