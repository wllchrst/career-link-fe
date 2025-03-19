import {AnnouncementTag} from "~/components/announcement/AnnouncementTag";

export const AnnouncementDetail = ({id}:{id:string}) => {

    return <div className={"w-4/5 h-4/5 flex flex-col justify-between gap-y-5 py-5"}>
        <AnnouncementTag type={"Event"}/>
        <h4 className={"text-[var(--primary)] text-2xl font-semibold"}>{"Announcement Title"}</h4>
        <h4 className={"text-xl"}>{"12 September 2024"}</h4>
        <div className={"object-cover w-full h-screen bg-black"}>
        </div>
        <p>another description</p>
    </div>
}