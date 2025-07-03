import {Download} from "lucide-react";
import {BootcampTypeTag} from "~/components/bootcamp/bootcamp-type-tag";
import {BootcampMethodTag} from "~/components/bootcamp/bootcamp-method-tag";
import domtoimage from 'dom-to-image';
import type { Bootcamp } from "~/types/api";
import CertificateCard from "~/components/certificate/certificate";

interface Props {
    bootcamp: Bootcamp
}

export const CertificatePreview = ({bootcamp}: Props) => {

    const handleDownloadImage = async () => {
        console.log('here')
        const element = document.getElementById('certificate')
        if (element) {
            domtoimage.toPng(element)
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `1234567890-dfba0a24-6810-42e1-9d46-978d6d6ccedf.jpg`;
                link.href = dataUrl;
                link.click();
            })
            .catch((error) => {
                console.error("Error: ", error);
            });

        }
    };

    return (
        <div className={"flex flex-col gap-y-3 w-4/5 p-5"}>
            <h4 className={"text-[var(--primary)] text-3xl font-semibold"}>{"Bootcamp Title"}</h4>
            <div className={"flex gap-x-2 items-center"}>
                <BootcampTypeTag type={"Hard Skill"}/>
                <BootcampMethodTag type={"Online"}/>
            </div>
            <div className={"flex justify-between items-center mr-4"}>
                <h4 className={"text-xl font-semibold"}>Claimed on {"12 September 2024"}</h4>
                <Download size={"24"} color={"var(--primary)"} onClick={handleDownloadImage}/>
            </div>
            <CertificateCard />
        </div>
    )
};

