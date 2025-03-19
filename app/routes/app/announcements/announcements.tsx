import { AnnouncementLists } from "~/features/announcements/components/announcements-list";
import type { Announcement } from "~/types/api";
import {announcementsData} from "~/services/announcement-service";

const Announcements = () => {
  return (
    <div className="container flex flex-col mt-4">
      <h1 className="text-2xl text-primary font-bold mb-4 text-[var(--dark-gray)]">Announcements</h1>
      <AnnouncementLists announcements={announcementsData} />
    </div>
  );
};

export default Announcements;
