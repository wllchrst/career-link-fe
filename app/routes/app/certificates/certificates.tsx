import { CertificateLists } from "~/features/certificates/components/certificates-list";
import { NavbarContentLayout } from "~/components/layouts/navbar-content-layout";
import { getCertificateByUser } from "~/features/certificates/api/get-certificate-by-user";
import { useAuth } from "~/lib/auth";
import { useEffect, useState } from "react";
import type { Certificate } from "~/types/api";

const Certificates = () => {
  
  const {user} = useAuth()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  
  const fetch = async () => {
    const {data: certificates} = await getCertificateByUser(user?.id!)
    setCertificates(certificates)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <NavbarContentLayout title="My Certificates">
      <CertificateLists certificates={certificates} />
    </NavbarContentLayout>
  );
};

export default Certificates;
