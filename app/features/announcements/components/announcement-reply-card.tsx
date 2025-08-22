import toast from "react-hot-toast"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { useRole } from "~/provider/role-testing-provider"
import type { AnnouncementReply } from "~/types/api"
import { deleteAnnouncementReply } from "../api/delete-announcement-reply"
import { useState } from "react"
import CreateAnnouncementReply from "./create-announcement-reply"


interface Props {
  reply: AnnouncementReply
  className?: string
}

export function AnnouncementReplyCard({
    reply,
    className
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


    return (
        <div className={cn("space-y-4", className)}>
        <div className="flex gap-3">

            <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between w-full">
                <span className="font-medium text-sm">{reply.user_id}</span>
                <Button onClick={() => setUpdate(!isUpdate)}><FaEdit /></Button>
                <Button onClick={() => onDelete(reply.id)}><FaTrash /></Button>
                
            </div>
            {!isUpdate?
                <p className="text-sm leading-relaxed">{reply.content}</p>:
                <CreateAnnouncementReply onSuccess={async () => setUpdate(false)} announcementId={reply.announcement_id} userId={reply.user_id} content={reply.content} id={reply.id}/>
            }
            </div>
        </div>
        </div>
    )
}
