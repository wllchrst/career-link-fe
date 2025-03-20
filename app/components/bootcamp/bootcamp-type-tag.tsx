import {Badge} from "~/components/ui/badge";

interface Color {
    [key:string]:string
}

const backgroundColors :Color = {
    "Soft Skill":"px-3 py-1 font-normal text-sm rounded-xl bg-(--green)",
    "Hard Skill":"px-3 py-1 font-normal text-sm rounded-xl bg-secondary"
}

export const BootcampTypeTag = ({type}: { type:string }) => {
    return (
        <Badge className={`${backgroundColors[type]}`}>
            {type}
        </Badge>
    )
}