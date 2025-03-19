import {Badge} from "~/components/ui/badge";

interface Color {
    [key:string]:string
}

const backgroundColors :Color = {
    "Soft Skill":"w-[10%] font-normal text-sm rounded-xl bg-(--green)",
    "Hard Skill":"w-[10%] font-normal text-sm rounded-xl bg-secondary"
}

export const BootcampTypeTag = ({type}: { type:string }) => {
    return (
        <Badge className={`${backgroundColors[type]}`}>
            {type}
        </Badge>
    )
}