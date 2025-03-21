import type { Announcement } from "~/types/api";
import { Badge } from "~/components/ui/badge";
import { NavLink } from "react-router";
import { AnnouncementTag } from "~/components/announcement/announcement-tag";
import { useRole } from "~/role-testing-provider";
import { Button } from "~/components/ui/button";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  const { role } = useRole();

  return (
    <NavLink to={"/announcements/" + announcement.id}>
      <div className="flex flex-col gap-1 bg-white shadow p-5 border rounded-sm">
        <div className="flex justify-between">
          <div className="text-xl font-medium text-primary">
            {announcement.title}
          </div>
          {role == "admin" && (
            <div className="flex gap-2">
              <Button variant={"outline"}>Edit</Button>
              <Button variant={"destructive"}>Delete</Button>
            </div>
          )}
        </div>
        <AnnouncementTag type={announcement.type} />
        <div className="text-accent">{announcement.description}</div>
        <div>{announcement.createdAt}</div>
      </div>
    </NavLink>
  );
};
