import {Badge} from "~/components/ui/badge";

interface Color {
    [key:string]:string
}

const styles :Color = {
    "Event":"w-[6%] font-normal text-sm rounded-xl bg-(--orange)",
    "Info":"w-[6%] font-normal text-sm rounded-xl bg-secondary"
}

export const AnnouncementTag = ({type}: { type:string }) => {
    return (
        <Badge className={`${styles[type]}`}>
        {type}
        </Badge>
    )
}