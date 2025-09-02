import toast from "react-hot-toast"
import { Form, FormField } from "~/components/ui/form"
import type { Announcement, User } from "~/types/api"
import { sendAnnouncement, type SendAnnouncementInput } from "../api/send-email-announcement"
import { getErrorMessage } from "~/lib/error"
import { useForm } from "react-hook-form"
import { Button } from "~/components/ui/button"
import Field from "~/components/ui/form-field"

interface Props {
    announcement: Announcement
    users: User[]
}

const SendAnnouncement = ({announcement, users}:Props) => {


    const form = useForm<SendAnnouncementInput>(
        {
            defaultValues: {
                subject: announcement.title,
                body: announcement.description,
                to: users.filter(e => e.name != "admin").map(e => e.email),
            }
        }
    )

    
        const sendEmail = (data: SendAnnouncementInput) => {
          const toastId = toast.loading("Sending email...")
          try {
            console.log()
            sendAnnouncement({
              data
            })
            toast.success("Announcement has sent to the email", {
              id: toastId,
            })
          } catch (error) {
            toast.error(getErrorMessage(error), {
              id: toastId,
            })
          }
        }

    return <>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(sendEmail)}>
                <Field label="Cc (separated by comma)" name="cc" control={form.control} placeholder="Insert your cc here"/>
                <Field label="Bcc (separated by comma)" name="bcc" control={form.control} placeholder="Insert your bcc here"/>
                <Field label="Signature" name="sender_signature" control={form.control} placeholder="Insert your signature here"/>
                <Button>Send</Button>
            </form>
        </Form>

    </>
}

export default SendAnnouncement