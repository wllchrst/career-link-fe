import { getCertificate } from "~/features/certificates/api/get-certificate";
import {CertificatePreview} from "~/features/certificates/components/certificate-preview";
import type { Route } from "./+types/certificate";

export const loader = async ({params}:Route.LoaderArgs) => {
    const {data: certificate} = await getCertificate(params.id)
    return {certificate}
}

export default function Certificate({loaderData}: Route.ComponentProps) {

    const {certificate} = loaderData

    return <CertificatePreview certificate={certificate}/>;
}
