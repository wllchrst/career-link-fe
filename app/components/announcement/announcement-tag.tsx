import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

interface AnnouncementTagProps {
  type: string;
  className?: string;
}

export const AnnouncementTag = ({ type, className }: AnnouncementTagProps) => {
  const getTagVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case "urgent":
      case "important":
        return "destructive";
      case "info":
      case "information":
        return "default";
      case "update":
        return "secondary";
      case "event":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <Badge
      variant={getTagVariant(type)}
      className={cn("text-xs font-medium", className)}
    >
      {type}
    </Badge>
  );
};
