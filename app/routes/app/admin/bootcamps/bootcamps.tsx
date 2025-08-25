import { useEffect, useState } from "react";
import { useRevalidator } from "react-router";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { NavbarContentLayout } from "~/components/layouts/navbar-content-layout";
import { Modal, type ModalType } from "~/components/modal";
import { Card, CardContent } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { BootcampsGrid } from "~/features/bootcamp/components/bootcamps-grid";
import { CreateBootcamp } from "~/features/bootcamp/components/create-bootcamp";
import { UpdateBootcamp } from "~/features/bootcamp/components/update-bootcamp";
import { DeleteBootcamp } from "~/features/bootcamp/components/delete-bootcamp";

import { getBootcampCategories } from "~/features/bootcamp-category/api/get-bootcamp-categories";
import { getBootcampTypes } from "~/features/bootcamp-type/api/get-bootcamp-types";
import { getBootcamps } from "~/features/bootcamp/api/get-bootcamps";

import { type BootcampCategory, type BootcampType, type Bootcamp, type User } from "~/types/api";
import type { Route } from "./+types/bootcamps";
import {
  Plus,
  Search,
  Grid,
  List,
  TrendingUp,
  Users,
  Calendar,
  Filter,
} from "lucide-react";

const Bootcamps = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedBootcamp, setSelectedBootcamp] = useState<Bootcamp | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const revalidator = useRevalidator();
  const [categories, setCategories] = useState<BootcampCategory[]>([])
  const [bootcampTypes, setBootcampTypes] = useState<BootcampType[]>([])
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([])

  const onSuccess = () => {
    setActiveModal(null);
    setSelectedBootcamp(null);
    revalidator.revalidate();
  };

  const fetchBootcamps = async () => {
    const {data: bootcamps} = await getBootcamps()
    const {data: bootcampTypes} = await getBootcampTypes()
    const {data: bootcampCategories} = await getBootcampCategories()

    setBootcampTypes(bootcampTypes)
    setCategories(bootcampCategories)
    setBootcamps(bootcamps)
  }

  useEffect(() => {
    fetchBootcamps()
  }, [])

  const dummySpeakers: User[] = [
    
  ];

  // Filter bootcamps based on search and filters
  const filteredBootcamps = bootcamps.filter((bootcamp) => {
    const matchesSearch =
      bootcamp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bootcamp.description.toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesCategory = filterCategory === "all" || bootcamp.categories?.name === filterCategory;
    // const matchesType = filterType === "all" || bootcamp.types?.name === filterType;
    return matchesSearch; // && matchesCategory && matchesType;
  });

  return (
    <>
      <Modal
        title="Add Bootcamp"
        isOpen={activeModal === "create"}
        onClose={() => setActiveModal(null)}
      >
        <CreateBootcamp
          categories={categories}
          types={bootcampTypes}
          speakers={dummySpeakers}
          onSuccess={onSuccess}
        />
      </Modal>

      <Modal
        title="Update Bootcamp"
        isOpen={activeModal === "update"}
        onClose={() => setActiveModal(null)}
      >
        <UpdateBootcamp
          bootcamp={selectedBootcamp!}
          categories={categories}
          types={bootcampTypes}
          speakers={dummySpeakers}
          onSuccess={onSuccess}
        />
      </Modal>

      <Modal
        title="Delete Bootcamp"
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
      >
        <DeleteBootcamp
          selectedCategory={selectedBootcamp!}
          onSuccess={onSuccess}
          onClose={() => setActiveModal(null)}
        />
      </Modal>

      <NavbarContentLayout
        title="Bootcamp Management"
        subtitle="Manage all bootcamps available in the system"
      >
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex gap-3 flex-1">
                  <Button
                    onClick={() => setActiveModal("create")}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Bootcamp
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>

                  <div className="flex border rounded-md ml-auto">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div
                className={`mt-4 space-y-4 transition-all duration-200 ${
                  showFilters ? "block" : "hidden"
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search bootcamps..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select
                    value={filterCategory}
                    onValueChange={setFilterCategory}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {bootcampTypes.map((type) => (
                        <SelectItem key={type.id} value={type.name}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-sm text-muted-foreground">
                  Showing {filteredBootcamps.length} of {bootcamps.length}{" "}
                  bootcamps
                </div>
              </div>
            </CardContent>
          </Card>

          {filteredBootcamps.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No bootcamps found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ||
                  filterCategory !== "all" ||
                  filterType !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Get started by creating your first bootcamp."}
                </p>
                {!searchTerm &&
                  filterCategory === "all" &&
                  filterType === "all" && (
                    <Button
                      onClick={() => setActiveModal("create")}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Your First Bootcamp
                    </Button>
                  )}
              </CardContent>
            </Card>
          ) : (
            <BootcampsGrid
              bootcamps={filteredBootcamps}
              viewMode={viewMode}
              onUpdate={(bootcamp) => {
                setSelectedBootcamp(bootcamp);
                setActiveModal("update");
              }}
              onDelete={(bootcamp) => {
                setSelectedBootcamp(bootcamp);
                setActiveModal("delete");
              }}
            />
          )}
        </div>
      </NavbarContentLayout>
    </>
  );
};

export default Bootcamps;
