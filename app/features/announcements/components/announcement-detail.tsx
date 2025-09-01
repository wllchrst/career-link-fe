import { AnnouncementTag } from "~/components/announcement/announcement-tag";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import { CalendarDays, Send } from "lucide-react";
import type { Announcement, AnnouncementReply, User } from "~/types/api";
import CreateAnnouncementReply from "./create-announcement-reply";
import { useAuth } from "~/lib/auth";
import { Accordion } from "~/components/ui/accordion";
import AccordionLayout from "~/components/layouts/accordion-layout";
import { useEffect, useState } from "react";
import { getAnnouncementReplyByAnnouncement } from "../api/get-announcement-reply-by-announcement";
import { AnnouncementReplyCard } from "./announcement-reply-card";
import EmptyMessage from "~/components/ui/empty-message";
import { useRole } from "~/provider/role-testing-provider";
import { getAnnouncementReplyByUser } from "../api/get-announcement-reply-by-user";
import { Button } from "~/components/ui/button";
import SendAnnouncement from "./send-announcement";
import { sendAnnouncement } from "../api/send-email-announcement";
import toast from "react-hot-toast";
import { getUsers } from "~/features/home/api/get-student-data";
import { getErrorMessage } from "~/lib/error";
import { Modal } from "~/components/modal";

interface Props {
  announcement: Announcement;
}

export const AnnouncementDetail = ({ announcement }: Props) => {
  const {user} = useAuth()
  const [replies, setReplies] = useState<AnnouncementReply[]>([])
  const [isSend, setSend] = useState(false)
  const [users, setUsers] = useState<User[]>([])


  const getReplies = async () => {

    const {data: replies} = user?.name == 'admin' ? 
    await getAnnouncementReplyByAnnouncement({announcementId: announcement.id}): 
    await getAnnouncementReplyByUser({userId: user?.id ?? ""})
    
    setReplies(replies)
  }
  const getAllUsers = async () => {
    const {data: users} = await getUsers(1,10000)
    setUsers(users)
  }

  useEffect(() => {
    getReplies()
    getAllUsers()
  }, [])

  if (!user){
    return <div className="flex flex-col items-center justify-center">
        <EmptyMessage text="You are prohibited to access this page. Please login first!" title="Unauthorized"/>
        <a href="/career-link/">Login here</a>
    </div>
  }

  

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 flex flex-col gap-3">
        <Modal onClose={() => setSend(false)} isOpen={isSend}>
          <SendAnnouncement announcement={announcement} users={users} />
        </Modal>
      {user.name == 'admin' && <Button variant="outline" size="sm" onClick={(e) => setSend(true)}>
        <Send className="h-4 w-4" />
        Blast Announcements
      </Button>}
      <AccordionLayout text={announcement.title}>
        <Card className="w-full">

          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <AnnouncementTag type={announcement.type} />
              <Badge variant="outline" className="flex items-center gap-1.5">
                <CalendarDays className="h-3 w-3" />
                {new Date(announcement.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Badge>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-6 pt-6">
            {announcement.image_path ? (
              <div className="w-full aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={`${import.meta.env.VITE_STORAGE_URL}/${announcement.image_path}`}
                  alt={announcement.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-video rounded-lg bg-muted/50 border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  No image available
                </p>
              </div>
            )}
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {announcement.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </AccordionLayout>
      <Card>
        <CardHeader className="space-y-4">
          <CreateAnnouncementReply announcementId={announcement.id} userId={user?.id ?? ""} onSuccess={getReplies}/>
        </CardHeader>
        <Separator />
        <CardContent>
            {replies.map(e => <AnnouncementReplyCard reply={e} onSuccess={getReplies} />)}
        </CardContent>
      </Card>
    </div>
  );
};
