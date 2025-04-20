import { AnnouncementLists } from "~/features/announcements/components/announcements-list";
import type { Announcement } from "~/types/api";
import { announcementsData } from "~/services/announcement-service";
import { useRole } from "~/role-testing-provider";
import { IoMdAdd } from "react-icons/io";
import type { Route } from "./+types/announcements";

export const loader = async () => {
  //TODO: api call

  return { announcementsData }; //masih dummy data;
};

const Announcements = ({ loaderData }: Route.ComponentProps) => {
  const { announcementsData } = loaderData;
  const { role } = useRole();

  return (
    <div className="container flex flex-col mt-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-primary font-bold mb-4">Announcements</h1>
        {role == "admin" && (
          <div className="flex gap-5">
            <div className="bg-accent text-white rounded-md p-3">
              Blast Announcements
            </div>
            <div className="bg-accent text-white text-3xl p-3 rounded-md">
              <IoMdAdd />
            </div>
          </div>
        )}
      </div>
      <AnnouncementLists announcements={announcementsData} />
    </div>
  );
};

export default Announcements;
