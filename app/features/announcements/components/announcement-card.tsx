import type { Announcement } from "~/types/api";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  return (
    <div className="bg-white shadow p-3">
      <div className="flex justify-between">
        <div>{announcement.title}</div>
        <div>{announcement.createdAt}</div>
      </div>
      <div>{announcement.type}</div>
      <div>{announcement.description}</div>
    </div>
  );
};
