import { AnnouncementDetail } from "~/features/announcements/components/announcement-detail";
import type { Route } from "./+types/announcement";
import {
  announcementsData,
  getAnnouncementById,
} from "~/services/announcement-service";

export const loader = async ({ params }: Route.LoaderArgs) => {
  //TODO: api call to get announcement detail by id

  const announcement = getAnnouncementById(params.announcementId);
  if (!announcement) throw new Error();

  return { announcement };
};

export default function Announcement({ loaderData }: Route.ComponentProps) {
  return <AnnouncementDetail announcement={loaderData.announcement} />;
}
