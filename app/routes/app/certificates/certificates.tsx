import { AnnouncementLists } from "~/features/announcements/components/announcements-list";
import type { Certificate } from "~/types/api";
import {certificates} from "~/services/certificate-service";
import {CertificateLists} from "~/features/certificates/components/certificates-list";

const Certificates = () => {
    return (
        <div className="container flex flex-col mt-4">
            <h1 className="text-2xl text-primary font-bold mb-4 text-[var(--dark-gray)]">My Certificates</h1>
            <CertificateLists certificates={certificates} />
        </div>
    );
};

export default Certificates;
