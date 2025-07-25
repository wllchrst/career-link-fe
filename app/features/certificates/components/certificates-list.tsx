import type { Certificate } from "~/types/api";
import { CertificateCard } from "~/features/certificates/components/certificate-card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Search, Grid, List, Award } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface CertificateListProps {
  certificates: Certificate[];
}

export const CertificateLists = ({ certificates }: CertificateListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch = cert.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || cert.type === filterType;
    const matchesMethod =
      filterMethod === "all" || cert.method === filterMethod;
    return matchesSearch && matchesType && matchesMethod;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-3">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Hard Skill">Hard Skill</SelectItem>
                <SelectItem value="Soft Skill">Soft Skill</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterMethod} onValueChange={setFilterMethod}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Onsite">Onsite</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Self Learning">Self Learning</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-r-none"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-l-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {filteredCertificates.length} of {certificates.length}{" "}
          certificates
        </p>
      </div>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filteredCertificates.length > 0 ? (
          filteredCertificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.id || index}
              certificate={certificate}
              viewMode={viewMode}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <Award className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No certificates found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
