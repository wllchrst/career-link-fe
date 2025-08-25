import { AnnouncementDetail } from "~/features/announcements/components/announcement-detail";
import type { Route } from "./+types/announcement";
import { getAnnouncement } from "~/features/announcements/api/get-announcement";
import { useEffect, useState } from "react";
import type { Announcement } from "~/types/api";

export const loader = async ({ params }: Route.LoaderArgs) => {

  const { announcementId } = params;
  if (!announcementId) throw new Error("no announcement id");

  return { id: announcementId };
};

export default function Announcement({ loaderData }: Route.ComponentProps) {
  const [announcement, setAnnouncement] = useState<Announcement>()

  const fetchAnnouncement = async () => {
    
      const {data: announcement} = await getAnnouncement({id: loaderData.id});

      if (!announcement) throw new Error("no announcement found");

      setAnnouncement(announcement)
  }

  useEffect(() => {
    fetchAnnouncement()
  },[])

  if (!announcement){
    return null;
  }
  return <AnnouncementDetail announcement={announcement} />;
}
