import { Badge } from "~/components/ui/badge";

const methodStyles = {
  "Self Learning":
    "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
  Online: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
  Onsite: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
  Hybrid: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
};

export const BootcampMethodTag = ({ type }: { type: string }) => {
  return (
    <Badge
      variant="outline"
      className={`${
        methodStyles[type as keyof typeof methodStyles] ||
        methodStyles["Self Learning"]
      } transition-colors`}
    >
      {type}
    </Badge>
  );
};
