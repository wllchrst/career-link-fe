import { CertificateLists } from "~/features/certificates/components/certificates-list";
import { NavbarContentLayout } from "~/components/layouts/navbar-content-layout";
import type { Route } from "./+types/certificates";
import { getCertificateByUser } from "~/features/certificates/api/get-certificate-by-user";

export const loader = async () => {
  const {data: certificates} = await getCertificateByUser('sdf')
  return {certificates}
}

const Certificates = ({loaderData}:Route.ComponentProps) => {
  
  const {certificates} = loaderData

  return (
    <NavbarContentLayout title="My Certificates">
      <CertificateLists certificates={certificates} />
    </NavbarContentLayout>
  );
};

export default Certificates;
