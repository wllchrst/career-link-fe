import toast from "react-hot-toast"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import type { AnnouncementReply } from "~/types/api"
import { deleteAnnouncementReply } from "../api/delete-announcement-reply"
import { useState } from "react"
import CreateAnnouncementReply from "./create-announcement-reply"


interface Props {
  reply: AnnouncementReply
  className?: string,
  onSuccess: () => Promise<void>
}

export function AnnouncementReplyCard({
    reply,
    className,
    onSuccess
}: Props) {
    const [isUpdate, setUpdate] = useState(false)

    const onDelete = async (id:string) => {
        const toastId = toast.loading("Deleting reply")
        try {
            await deleteAnnouncementReply({ id })
            toast.success("Reply successfully removed", {
                id: toastId
            })
        } catch (error) {
            toast.error("Reply failed to removed", {
                id: toastId
            })
        }
    }

    const onUpdateSuccess = async () => {
        setUpdate(false)
        await onSuccess()
    }


    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex gap-3">

                <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between w-full">
                    <span className="font-medium text-sm">{reply.user.name}</span>
                    <div className="flex gap-2">
                        <Button onClick={() => setUpdate(!isUpdate)}><FaEdit /></Button>
                        <Button onClick={() => onDelete(reply.id)}><FaTrash /></Button>
                    </div>
                </div>
                {!isUpdate?
                    <p className="text-sm leading-relaxed">{reply.content}</p>:
                    <CreateAnnouncementReply onSuccess={onUpdateSuccess} announcementId={reply.announcement_id} userId={reply.user.id} content={reply.content} id={reply.id}/>
                }
                </div>
            </div>
        </div>
    )
}
