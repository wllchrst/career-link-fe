import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Session, SessionData } from "~/types/api"
import { Form } from "~/components/ui/form"
import Field from "~/components/ui/form-field"
import { Button } from "~/components/ui/button"
import toast from "react-hot-toast"
import { getErrorMessage } from "~/lib/error"
import { updateSessionData, updateSessionDataInputSchema, type UpdateSessionDataInput } from "../api/update-session-data"

interface Props {
    session:Session,
    sessionData: SessionData,
    onSuccess: () => void
}

const UpdateSessionData = ({session, sessionData, onSuccess}:Props) => {

    const form = useForm<UpdateSessionDataInput>({
        resolver: zodResolver(updateSessionDataInputSchema),
        defaultValues: {
            description: '',
            link: '',
            session_id: session.id
        }
    })

    const onSubmit = async (data:UpdateSessionDataInput) => {
        const toastId = toast.loading("Updating session data...")
        try {
            const res = await updateSessionData({data, id:sessionData.id})
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

export default UpdateSessionData