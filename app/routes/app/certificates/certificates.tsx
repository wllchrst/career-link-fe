import { certificates } from "~/services/certificate-service";
import { CertificateLists } from "~/features/certificates/components/certificates-list";
import { NavbarContentLayout } from "~/components/layouts/navbar-content-layout";
import { Award, BookOpen } from "lucide-react";

const Certificates = () => {
  return (
    <NavbarContentLayout title="My Certificates">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">
                  Total Certificates
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {certificates.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">
                  Hard Skills
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {
                    certificates.filter((cert) => cert.type === "Hard Skill")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">
                  Soft Skills
                </p>
                <p className="text-2xl font-bold text-purple-900">
                  {
                    certificates.filter((cert) => cert.type === "Soft Skill")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <CertificateLists certificates={certificates} />
      </div>
    </NavbarContentLayout>
  );
};

export default Certificates;
