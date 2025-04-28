import {Badge} from "~/components/ui/badge";

interface Color {
    [key: string]: string
}

const styles: Color = {
    "Self Learning": "px-3 py-1 font-normal text-sm bg-transparent rounded-xl border-(--purple) text-(--purple) border-2",
    "Online": "px-3 py-1 font-normal text-sm bg-transparent rounded-xl border-(--light-green) text-(--light-green) border-2",
    "Onsite": "px-3 py-1 font-normal text-sm bg-transparent rounded-xl border-(--dark-yellow) text-(--dark-yellow) border-2",
    "Hybrid": "px-3 py-1 font-normal text-sm bg-transparent rounded-xl border-(--blue) text-(--blue) border-2",
}

export const BootcampMethodTag = ({type}: { type: string }) => {
    return (
        <Badge className={`${styles[type] ?? styles['Self Learning']}`}>
            {type}
        </Badge>
    )
}