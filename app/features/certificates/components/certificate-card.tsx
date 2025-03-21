import type {Announcement, Certificate} from "~/types/api";
import {BootcampTypeTag} from "~/components/bootcamp/bootcamp-type-tag";
import {BootcampMethodTag} from "~/components/bootcamp/bootcamp-method-tag";
import { Download } from 'lucide-react';
import {NavLink} from "react-router";
import {Button} from "~/components/ui/button";


interface CertificateCardProps {
    certificate: Certificate;
}

export const CertificateCard = ({certificate}: CertificateCardProps) => {

    return (
        <>
            <div className={"flex flex-col gap-2 bg-white shadow-lg p-5 border rounded-md"}>
                <div className="text-xl font-semibold text-primary">
                    {certificate.title}
                </div>
                <div className={"flex gap-x-2 items-center"}>
                    <BootcampTypeTag type={certificate.type} />
                    <BootcampMethodTag type={certificate.method} />
                </div>
                <div className={"flex items-center justify-between"}>
                    <h4>Claimed on {certificate.createdAt}</h4>
                    <div className={"flex gap-x-6 items-center w-[15%] justify-end"}>
                        <Download size={"24"} color={"var(--primary)"}/>
                        <NavLink to={"/certificates/" + certificate.id}>
                            <Button className={"bg-accent text-[var(--white)] rounded-lg"}>Preview</Button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}