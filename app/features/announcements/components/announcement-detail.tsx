import { AnnouncementTag } from "~/components/announcement/announcement-tag";
import type { Announcement } from "~/types/api";

interface Props {
  announcement: Announcement;
}

export const AnnouncementDetail = ({ announcement }: Props) => {
  return (
    <div className={"w-full h-4/5 flex flex-col gap-y-2 py-5"}>
      <AnnouncementTag type={announcement.type} />
      <h4 className={"text-[var(--primary)] text-2xl font-semibold mt-2"}>
        {announcement.title}
      </h4>
      <h4 className={"text-xl"}>{announcement.createdAt}</h4>
      <div className={"object-cover w-full h-screen bg-black my-2"}></div>
      <p>{announcement.description}</p>
    </div>
  );
};
