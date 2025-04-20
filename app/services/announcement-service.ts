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

//dummy api
export const getAnnouncementById = (id: string): Announcement | undefined => {
  return announcementsData.find((announcement) => announcement.id === id);
};
