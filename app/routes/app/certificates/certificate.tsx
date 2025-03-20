import type {Route} from "../../../../.react-router/types/app/routes/app/announcements/+types/announcement";
import {CertificatePreview} from "~/features/certificates/components/certificate-preview";

export async function loader({ params }: Route.LoaderArgs) {

}

export default function Certificate({params,}: Route.ComponentProps) {
    return <CertificatePreview id={params.certificate}/>;
}
