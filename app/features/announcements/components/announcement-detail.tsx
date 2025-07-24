import { AnnouncementTag } from "~/components/announcement/announcement-tag";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import { CalendarDays } from "lucide-react";
import type { Announcement } from "~/types/api";

interface Props {
  announcement: Announcement;
}

export const AnnouncementDetail = ({ announcement }: Props) => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card className="w-full">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <AnnouncementTag type={announcement.type} />
            <Badge variant="outline" className="flex items-center gap-1.5">
              <CalendarDays className="h-3 w-3" />
              {new Date(announcement.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Badge>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {announcement.title}
            </h1>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-6 pt-6">
          {announcement.imageUrl ? (
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-muted">
              <img
                src={announcement.imageUrl}
                alt={announcement.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-video rounded-lg bg-muted/50 border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">
                No image available
              </p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {announcement.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
