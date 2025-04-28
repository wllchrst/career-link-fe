import {BootcampMethodTag} from "~/components/bootcamp/bootcamp-method-tag";
import { BootcampTypeTag } from "./bootcamp-type-tag";
import {Button} from "~/components/ui/button";
import type { BootcampCategory, BootcampType } from "~/types/api";

type BootcampDetailCardProps = {
    name: string;
    description: string;
    image: string;
    type: BootcampType;
    category: BootcampCategory;
}

const BootcampDetailCard = ({name, description, image, type, category}:BootcampDetailCardProps) => {
    
    return (
        <>
            <div className={"flex bg-white p-6 rounded-xl gap-16"}>
                <div className={"flex flex-col gap-2 justify-between"}>
                    <div className="flex flex-col gap-5">
                        <p className={"text-primary text-3xl font-semibold"}>{name}</p>
                        <div className="flex gap-2">
                            <BootcampTypeTag type={type.name}/>
                            <BootcampMethodTag type={category.name}/>
                        </div>
                        <p className={"text-justify"}>{description}</p>

                    </div>
                    <Button className={"mt-7 py-6 bg-accent font-normal"}>Enroll Now</Button>
                </div>
                <img src={`${import.meta.env.VITE_STORAGE_URL}/${image}`} alt=""
                     className="w-lg rounded-lg border"/>
            </div>
        </>
    )
}

export default BootcampDetailCard