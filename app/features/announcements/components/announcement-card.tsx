import type { Announcement } from "~/types/api";
import { Badge } from "~/components/ui/badge";
import { NavLink } from "react-router";
import { AnnouncementTag } from "~/components/announcement/announcement-tag";
import { useRole } from "~/role-testing-provider";
import { Button } from "~/components/ui/button";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  const { role } = useRole();

  return (
    <NavLink to={"/announcements/" + announcement.id}>
      <div className="flex flex-col gap-1 bg-white shadow p-5 border rounded-md">
        <div className="flex justify-between">
          <div className="text-xl font-medium text-primary">
            {announcement.title}
          </div>
          {role == "admin" ? (
            <div className="flex gap-3">
              <MdEdit className="text-primary text-3xl"/>
              <MdDelete className="text-primary text-3xl"/>
            </div>
          ) : <div>{announcement.createdAt}</div>}
        </div>
        <AnnouncementTag type={announcement.type} />
        <div className="text-accent">{announcement.description}</div>
        {role == "admin" && (
            <div>{announcement.createdAt}</div>
        )}
      </div>
    </NavLink>
  );
};
