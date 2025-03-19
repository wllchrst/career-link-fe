import type { Certificate } from "~/types/api";
import {CertificateCard} from "~/features/certificates/components/certificate-card";

interface CertificateListProps {
    certificates: Certificate[];
}

export const CertificateLists = ({ certificates }: CertificateListProps) => {
    return (
        <div className="flex flex-col gap-5">
            {certificates.map((certificate) => (
                <CertificateCard certificate={certificate}></CertificateCard>
            ))}
        </div>
    );
};
