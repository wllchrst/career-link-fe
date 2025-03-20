import {Badge} from "~/components/ui/badge";

interface Color {
    [key:string]:string
}

const styles :Color = {
    "Event":"xl:w-[5%] w-[7%] py-[0.3%] font-normal xl:text-sm text-xs rounded-xl bg-(--orange)",
    "Info":"xl:w-[5%] w-[7%] py-[0.3%] font-normal xl:text-sm text-xs rounded-xl bg-secondary"
}

export const AnnouncementTag = ({type}: { type:string }) => {
    return (
        <Badge className={`${styles[type]}`}>
        {type}
        </Badge>
    )
}