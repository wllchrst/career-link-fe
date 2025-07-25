import { Badge } from "~/components/ui/badge";

const typeStyles = {
  "Soft Skill":
    "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200",
  "Hard Skill": "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
};

export const BootcampTypeTag = ({ type }: { type: string }) => {
  return (
    <Badge
      variant="secondary"
      className={`${
        typeStyles[type as keyof typeof typeStyles] || typeStyles["Hard Skill"]
      } transition-colors`}
    >
      {type}
    </Badge>
  );
};
