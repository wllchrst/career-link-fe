import { useAuth } from "~/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const EnrichmentTrack = () => {
  const {user} = useAuth()
  return (
    <Card className="w-64">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-muted-foreground">
          {user?.enrichment_track}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          <h4 className="font-semibold">{user?.partner}</h4>
          <p className="text-sm text-muted-foreground">
            {user?.current_position ?? ""}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
