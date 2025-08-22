import type { Announcement } from "~/types/api";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { NavLink } from "react-router";
import { AnnouncementTag } from "~/components/announcement/announcement-tag";
import { useRole } from "~/provider/role-testing-provider";
import { Edit2, Trash2, Calendar, Send } from "lucide-react";
import type { ModalType } from "~/components/modal";
import { sendAnnouncement } from "../api/send-email-announcement";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";

interface AnnouncementCardProps {
  announcement: Announcement;
  onSelect: (e:Announcement, type:ModalType) => void;

}

export const AnnouncementCard = ({ announcement, onSelect }: AnnouncementCardProps) => {
  const { role } = useRole();

  const sendEmail = () => {
    const toastId = toast.loading("Sending email...")
    try {
      sendAnnouncement({
        id: announcement.id,
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

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-border/50">
      <NavLink to={`/announcements/${announcement.id}`} className="block">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {announcement.title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <AnnouncementTag type={announcement.type} />
                {role !== "admin" && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {announcement.created_at}
                  </div>
                )}
              </div>
            </div>

            {role === "admin" && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  sendEmail()
                }}>
                  <Send className="h-4 w-4" />
                  Blast Announcements
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    onSelect(announcement, 'update')
                  }}
                  >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.preventDefault()
                    onSelect(announcement, 'delete')
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <NavLink to={`/announcements/${announcement.id}`} className="block">
            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
              {announcement.description}
            </p>
          </NavLink>

          {role === "admin" && (
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                Created {announcement.created_at}
              </div>
              <Badge variant="secondary" className="text-xs">
                Published
              </Badge>
            </div>
          )}
        </CardContent>
      </NavLink>
    </Card>
  );
};
