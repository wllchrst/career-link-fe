import type {Route} from "../../../../.react-router/types/app/routes/app/announcements/+types/announcement";
import {AnnouncementDetail} from "~/features/announcements/components/announcement-detail";

export async function loader({ params }: Route.LoaderArgs) {

}

export default function Announcement({params,}: Route.ComponentProps) {
    return <AnnouncementDetail id={params.announcement}/>;
}
