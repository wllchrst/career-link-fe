import type { Announcement, User } from "~/types/api";
import { AnnouncementCard } from "./announcement-card";
import { Send } from "lucide-react";
import type { ModalType } from "~/components/modal";

interface AnnouncementListProps {
  announcements: Announcement[];
  onSelect: (e:Announcement, type:ModalType) => void;
}

export const AnnouncementLists = ({ announcements, onSelect }: AnnouncementListProps) => {
  if (announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <Send className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No announcements yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          When announcements are created, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} onSelect={onSelect} />
      ))}
    </div>
  );
};
