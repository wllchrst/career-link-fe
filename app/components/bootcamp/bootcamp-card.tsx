import type { Bootcamp } from "~/types/api";
import { BootcampMethodTag } from "./bootcamp-method-tag";
import { BootcampTypeTag } from "./bootcamp-type-tag";
import { NavLink } from "react-router";
import { useRole } from "~/provider/role-testing-provider";
import { Button } from "../ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Eye, Edit, Trash2, Users, Calendar, MapPin } from "lucide-react";

interface Props {
  bootcamp: Bootcamp;
  viewMode?: "grid" | "list";
  onUpdate?: (bootcamp: Bootcamp) => void;
  onDelete?: (bootcamp: Bootcamp) => void;
}

export const BootcampCard = ({
  bootcamp,
  viewMode = "grid",
  onUpdate,
  onDelete,
}: Props) => {
  const { role } = useRole();

  if (viewMode === "list") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <img
                src={`${import.meta.env.VITE_STORAGE_URL}/${
                  bootcamp.image_path
                }`}
                alt={bootcamp.name}
                className="w-35 h-24 object-cover rounded-lg border"
              />
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    {bootcamp.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {bootcamp.description}
                  </p>
                </div>

                <div className="flex gap-2">
                  <NavLink to={`/bootcamps/${bootcamp.id}`}>
                    <Button variant="default" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </NavLink>

                  {role === "admin" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdate?.(bootcamp)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete?.(bootcamp)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {/* <BootcampTypeTag type={bootcamp.types.name} />
                <BootcampMethodTag type={bootcamp.categories.name} /> */}
                <Badge variant="secondary">Active</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
      <div className="relative">
        <img
          src={`${import.meta.env.VITE_STORAGE_URL}/${bootcamp.image_path}`}
          alt={bootcamp.name}
          className="h-35 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {role === "admin" && (
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onUpdate?.(bootcamp)}
              className="h-8 w-8 p-0"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete?.(bootcamp)}
              className="h-8 w-8 p-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-primary transition-colors">
            {bootcamp.name}
          </h3>

          <div className="flex flex-wrap gap-2">
            {/* <BootcampTypeTag type={bootcamp.types.name} />
            <BootcampMethodTag type={bootcamp.categories.name} /> */}
            <Badge variant="outline" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </div>

          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {bootcamp.description}
          </p>
        </div>

        <div className="pt-2">
          <NavLink to={`/bootcamps/${bootcamp.id}`} className="block">
            <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
};
