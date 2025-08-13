import { CertificateLists } from "~/features/certificates/components/certificates-list";
import { NavbarContentLayout } from "~/components/layouts/navbar-content-layout";
import { getCertificateByUser } from "~/features/certificates/api/get-certificate-by-user";
import { useAuth } from "~/lib/auth";
import { useEffect, useState } from "react";
import type { Certificate } from "~/types/api";
import EmptyMessage from "~/components/ui/empty-message";

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

  
  if (!user){
    return <div className="flex flex-col items-center justify-center">
        <EmptyMessage text="You are prohibited to access this page. Please login first!" title="Unauthorized"/>
        <a href="/career-link/">Login here</a>
    </div>
  }

  return (
    <NavbarContentLayout title="My Certificates">
      <CertificateLists certificates={certificates} />
    </NavbarContentLayout>
  );
};

export default Certificates;
