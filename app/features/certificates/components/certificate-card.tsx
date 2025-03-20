import type {Announcement, Certificate} from "~/types/api";
import {BootcampTypeTag} from "~/components/bootcamp/bootcamp-type-tag";
import {BootcampMethodTag} from "~/components/bootcamp/bootcamp-method-tag";
import { Download } from 'lucide-react';
import {NavLink} from "react-router";


interface CertificateCardProps {
    certificate: Certificate;
}

export const CertificateCard = ({certificate}: CertificateCardProps) => {

    return (
        <>
            <div className={"flex flex-col gap-3 shadow-lg p-5 border rounded-sm"}>
                <div className="text-xl font-semibold text-primary">
                    {certificate.title}
                </div>
                <div className={"flex gap-x-2 items-center"}>
                    <BootcampTypeTag type={certificate.type} />
                    <BootcampMethodTag type={certificate.method} />
                </div>
                <div className={"flex items-center justify-between"}>
                    <h4>Claimed on {certificate.createdAt}</h4>
                    <div className={"flex gap-x-10 items-center w-[15%] justify-end"}>
                        <Download size={"24"} color={"var(--primary)"}/>
                        <NavLink to={"/certificates/" + certificate.id}>
                            <button className={"bg-accent text-white px-5 py-2 rounded-lg"}>Preview</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}