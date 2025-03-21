import type { Announcement } from "~/types/api";
import { Badge } from "~/components/ui/badge";
import { NavLink } from "react-router";
import { AnnouncementTag } from "~/components/announcement/announcement-tag";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  return (
    <NavLink to={"/announcements/" + announcement.id}>
      <div className="flex flex-col gap-1 bg-white shadow p-5 border rounded-sm">
        <div className="flex justify-between">
          <div className="text-xl font-medium text-primary">
            {announcement.title}
          </div>
          <div>{announcement.createdAt}</div>
        </div>
        <AnnouncementTag type={announcement.type} />
        <div className="text-accent">{announcement.description}</div>
      </div>
    </NavLink>
  );
};
