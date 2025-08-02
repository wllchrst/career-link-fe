import { MdEdit } from "react-icons/md";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

interface Props {
  onClick: () => void;
  skill: string;
  position: string;
}

const FuturePlan = ({ onClick, skill, position }: Props) => {
  
  return (
    <Card>
      <CardContent className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-2">
                Position
              </h3>
              <p className="text-lg">{position}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClick}>
            <MdEdit className="w-5 h-5" />
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-primary">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skill.split(',').map((s, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FuturePlan;
