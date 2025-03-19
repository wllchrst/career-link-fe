import {Badge} from "~/components/ui/badge";

interface Color {
    [key:string]:string
}

const styles :Color = {
    "Self Learning":"w-[10%] font-normal text-sm bg-transparent rounded-xl border-(--purple) text-(--purple) border-2",
    "Online":"w-[10%] font-normal text-sm bg-transparent rounded-xl border-(--light-green) text-(--light-green) border-2",
    "Onsite":"w-[10%] font-normal text-sm bg-transparent rounded-xl border-(--dark-yellow) text-(--dark-yellow) border-2",
    "Hybrid":"w-[10%] font-normal text-sm bg-transparent rounded-xl border-(--blue) text-(--blue) border-2"
}

export const BootcampMethodTag = ({type}: { type:string }) => {
    return (
        <Badge className={`${styles[type]}`}>
            {type}
        </Badge>
    )
}