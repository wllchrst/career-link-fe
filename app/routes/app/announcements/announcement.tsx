import { AnnouncementDetail } from "~/features/announcements/components/announcement-detail";
import type { Route } from "./+types/announcement";
import {
  announcementsData,
  getAnnouncementById,
} from "~/services/announcement-service";

export const loader = async ({ params }: Route.LoaderArgs) => {
  //TODO: api call to get announcement detail by id

  const { announcementId } = params;
  if (!announcementId) throw new Error("no announcement id");

  const announcement = getAnnouncementById(announcementId);
  if (!announcement) throw new Error("no announcement found");

  return { announcement };
};

export default function Announcement({ loaderData }: Route.ComponentProps) {
  return <AnnouncementDetail announcement={loaderData.announcement} />;
}
