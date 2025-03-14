import type { Announcement } from "~/types/api";
import { AnnouncementCard } from "./announcement-card";

interface AnnouncementListProps {
  announcements: Announcement[];
}

export const AnnouncementLists = ({ announcements }: AnnouncementListProps) => {
  return (
    <div className="flex flex-col gap-5">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </div>
  );
};
