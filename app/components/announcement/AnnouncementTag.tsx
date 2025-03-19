import {Badge} from "~/components/ui/badge";

interface Color {
    [key:string]:string
}

const backgroundColors :Color = {
    "Event":"[var(--orange)]",
    "Info":"secondary"
}

export const AnnouncementTag = ({type}: { type:string }) => {
    return (
        <Badge className={`w-[6%] font-normal text-sm rounded-xl bg-${backgroundColors[type]}`}>
        {type}
        </Badge>
    )
}