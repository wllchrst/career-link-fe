import { getCertificate } from "~/features/certificates/api/get-certificate";
import {CertificatePreview} from "~/features/certificates/components/certificate-preview";
import type { Route } from "./+types/certificate";
import { useEffect, useState } from "react";
import { type Certificate } from "~/types/api";

export const loader = async ({params}:Route.LoaderArgs) => {
    return {id: params.id}
}

export default function Certificate({loaderData}: Route.ComponentProps) {

    const [certificate, setCertificate] = useState<Certificate>()
    
    const fetchAnnouncement = async () => {
        const {data: certificate} = await getCertificate(loaderData.id)
        setCertificate(certificate)
    }

    useEffect(() => {
        fetchAnnouncement()
    }, [])

    if (!certificate){
        return null
    }

    return <CertificatePreview certificate={certificate}/>;
}
