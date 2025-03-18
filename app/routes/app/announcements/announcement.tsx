import type {Route} from "../../../../.react-router/types/app/routes/app/announcements/+types/announcement";
import {AnnouncementTag} from "~/components/announcement/AnnouncementTag";

export async function loader({ params }: Route.LoaderArgs) {

}

export default function Announcement({params,}: Route.ComponentProps) {
    return (<>
            <div className={"w-4/5 h-4/5 flex flex-col justify-between"}>
                <AnnouncementTag type={"Event"} />
            </div>
        </>);
}
