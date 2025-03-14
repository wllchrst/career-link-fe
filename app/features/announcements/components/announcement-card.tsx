import type { Announcement } from "~/types/api";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  return (
    <div className="bg-white shadow p-5 border rounded-sm">
      <div className="flex justify-between">
        <div className="text-xl font-medium text-primary">
          {announcement.title}
        </div>
        <div>{announcement.createdAt}</div>
      </div>
      <div>{announcement.type}</div>
      <div className="text-accent">{announcement.description}</div>
    </div>
  );
};
