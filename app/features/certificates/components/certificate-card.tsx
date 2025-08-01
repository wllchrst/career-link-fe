import type { Certificate } from "~/types/api";
import { BootcampTypeTag } from "~/components/bootcamp/bootcamp-type-tag";
import { BootcampMethodTag } from "~/components/bootcamp/bootcamp-method-tag";
import { Download, Eye, Calendar } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import domtoimage from "dom-to-image";
import { format } from "date-fns";

interface CertificateCardProps {
  certificate: Certificate;
  viewMode?: "grid" | "list";
}

export const CertificateCard = ({
  certificate,
  viewMode = "list",
}: CertificateCardProps) => {
  const handleDownloadImage = async () => {
    const element = document.getElementById("certificate");
    if (element) {
      domtoimage
        .toPng(element)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `certificate-${certificate.id || "unknown"}.jpg`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Error downloading certificate: ", error);
        });
    }
  };

  if (viewMode === "grid") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {certificate.bootcamp.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <BootcampTypeTag type={certificate.bootcamp.type.name} />
            <BootcampMethodTag type={certificate.bootcamp.category.name} />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Claimed on {format(certificate.created_at, "MM/dd/yyyy")}</span>
          </div>

          <div className="flex gap-2 pt-2">
            <NavLink to={"/certificates/" + certificate.id} className="flex-1">
              <Button variant="default" size="sm" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </NavLink>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadImage}
              className="px-3"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-3 flex-1">
            <h3 className="text-xl font-semibold text-primary group-hover:text-primary/80 transition-colors">
              {certificate.bootcamp.name}
            </h3>

            <div className="flex flex-wrap gap-2">
              <BootcampTypeTag type={certificate.bootcamp.type.name} />
              <BootcampMethodTag type={certificate.bootcamp.category.name} />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Claimed on {format(certificate.created_at, "MM/dd/yyyy")}</span>
            </div>
          </div>

          <div className="flex gap-3 lg:flex-col lg:w-auto">
            <NavLink
              to={"/certificates/" + certificate.id}
              className="flex-1 lg:flex-none"
            >
              <Button className="w-full lg:w-auto">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </NavLink>
            <Button
              variant="outline"
              onClick={handleDownloadImage}
              className="flex-1 lg:flex-none"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
