import { AnnouncementLists } from "~/features/announcements/components/announcements-list";
import { announcementsData } from "~/services/announcement-service";
import { useRole } from "~/provider/role-testing-provider";
import { Plus, Send } from "lucide-react";
import type { Route } from "./+types/announcements";
import { NavbarContentLayout } from "~/components/layouts/navbar-content-layout";
import { Button } from "~/components/ui/button";

export const loader = async () => {
  //TODO: api call
  return { announcementsData }; //masih dummy data;
};

const Announcements = ({ loaderData }: Route.ComponentProps) => {
  const { announcementsData } = loaderData;
  const { role } = useRole();

  return (
    <NavbarContentLayout
      title="Announcements"
      subtitle={
        role === "admin" ? "Manage and view all announcements" : undefined
      }
    >
      {role === "admin" && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm">
              <Send className="h-4 w-4" />
              Blast Announcements
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Add Announcement
            </Button>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <AnnouncementLists announcements={announcementsData} />
    </NavbarContentLayout>
  );
};

export default Announcements;
