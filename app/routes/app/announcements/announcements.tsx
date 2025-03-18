import { AnnouncementLists } from "~/features/announcements/components/announcements-list";
import type { Announcement } from "~/types/api";

export const announcementsData: Announcement[] = [
  {
    id: "1",
    title: "announcement 1",
    type: "Event",
    imageUrl: "dummy",
    description: "lorem impsum",
    createdAt: "2025-04-26",
  },
  {
    id: "2",
    title: "announcement 2",
    type: "Info",
    imageUrl: "dummy2",
    description: "another description",
    createdAt: "2025-04-26",
  },
];

const Announcements = () => {
  return (
    <div className="container flex flex-col mt-4">
      <h1 className="text-2xl text-primary font-bold mb-4 text-[var(--dark-gray)]">Announcements</h1>
      <AnnouncementLists announcements={announcementsData} />
    </div>
  );
};

export default Announcements;
