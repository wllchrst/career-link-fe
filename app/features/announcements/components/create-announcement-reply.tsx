import { Form } from "~/components/ui/form"
import { createAnnouncementReply, type CreateAnnouncementReplyInput } from "../api/create-announcement-reply"
import { useForm } from "react-hook-form"
import TextAreaField from "~/components/ui/text-area-field"
import { Button } from "~/components/ui/button"
import toast from "react-hot-toast"
import { updateAnnouncementReply } from "../api/update-announcement-reply"

interface Props {
    id?: string
    userId: string
    announcementId: string
    content?: string
    onSuccess: () => Promise<void>
}

const CreateAnnouncementReply = ({id, content, announcementId, userId, onSuccess}:Props) => {

    const form = useForm<CreateAnnouncementReplyInput>({
        defaultValues: {
            announcement_id: announcementId,
            user_id: userId,
            content: content ?? ""
        }
    })

    const onSubmit = async (data:CreateAnnouncementReplyInput) => {
        const toastId = toast.loading("Sending reply...")
        try {
            if (id){
                await updateAnnouncementReply({ id, data })
            }else{
                await createAnnouncementReply({ data })
            }
            toast.success("Reply successfully sent", {id: toastId})
            await onSuccess()
        } catch (error) {
            toast.error("Reply failed to sent", {id: toastId})
        }
    }

    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <TextAreaField control={form.control} name="content" placeholder="insert reply here" label="Reply"/>
            <Button>Send</Button>
        </form>
    </Form>)
}
export default CreateAnnouncementReply