import { AnnouncementTag } from "~/components/announcement/announcement-tag";

export const AnnouncementDetail = ({ id }: { id: string }) => {
  return (
    <div className={"w-full h-4/5 flex flex-col gap-y-2 py-5"}>
      <AnnouncementTag type={"Event"} />
      <h4 className={"text-[var(--primary)] text-2xl font-semibold mt-2"}>
        {"Announcement Title"}
      </h4>
      <h4 className={"text-xl"}>{"12 September 2024"}</h4>
      <div className={"object-cover w-full h-screen bg-black my-2"}></div>
      <p>another description</p>
    </div>
  );
};
