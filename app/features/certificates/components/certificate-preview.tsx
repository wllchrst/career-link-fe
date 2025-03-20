import {Download} from "lucide-react";
import {BootcampTypeTag} from "~/components/bootcamp/bootcamp-type-tag";
import {BootcampMethodTag} from "~/components/bootcamp/bootcamp-method-tag";

export const CertificatePreview = ({id}: { id:string | undefined }) => {

    return (
        <div className={"flex flex-col gap-y-3 w-4/5 p-5"}>
            <h4 className={"text-[var(--primary)] text-3xl font-semibold"}>{"Bootcamp Title"}</h4>
            <div className={"flex gap-x-2 items-center"}>
                <BootcampTypeTag type={"Hard Skill"}/>
                <BootcampMethodTag type={"Online"}/>
            </div>
            <div className={"flex justify-between items-center mr-4"}>
                <h4 className={"text-xl font-semibold"}>Claimed on {"12 September 2024"}</h4>
                <Download size={"24"} color={"var(--primary)"}/>
            </div>
            <div className={"object-cover w-full h-130 bg-black"}>

            </div>
        </div>
    )
};