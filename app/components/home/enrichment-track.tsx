import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const EnrichmentTrack = () => {
  return (
    <Card className="w-64">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-muted-foreground">
          1st Semester
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          <h4 className="font-semibold">Study Abroad</h4>
          <p className="text-sm text-muted-foreground">
            Tokyo University, Japan
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
