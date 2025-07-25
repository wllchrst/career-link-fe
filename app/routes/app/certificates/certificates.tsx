import { certificates } from "~/services/certificate-service";
import { CertificateLists } from "~/features/certificates/components/certificates-list";
import { NavbarContentLayout } from "~/components/layouts/navbar-content-layout";
import { Award, BookOpen } from "lucide-react";

const Certificates = () => {
  return (
    <NavbarContentLayout title="My Certificates">
      <CertificateLists certificates={certificates} />
    </NavbarContentLayout>
  );
};

export default Certificates;
