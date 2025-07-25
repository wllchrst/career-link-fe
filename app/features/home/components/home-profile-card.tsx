import { EnrichmentTrack } from "~/components/home/enrichment-track";
import { AiOutlineUpload } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdSync } from "react-icons/md";
import { useRole } from "~/provider/role-testing-provider";
import FuturePlan from "./future-plan";
import { useState } from "react";
import { Modal, type ModalType } from "~/components/modal";
import { useRevalidator } from "react-router";
import UpdateStudentData from "./update-student-data";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export const HomeProfileCard = () => {
  const { role } = useRole();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const revalidator = useRevalidator();

  const onSuccess = () => {
    setActiveModal(null);
    revalidator.revalidate();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Modal
        title="Update Future Plan"
        isOpen={activeModal == "update"}
        onClose={() => setActiveModal(null)}
      >
        <UpdateStudentData onSuccess={onSuccess} />
      </Modal>

      <Card className="overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            <Avatar className="w-48 h-48 mx-auto lg:mx-0">
              <AvatarImage
                src="https://i.pinimg.com/280x280_RS/4d/3d/5d/4d3d5dbfdae11f199d158de3bb7ada35.jpg"
                alt="Daniel Adamlu"
              />
              <AvatarFallback className="text-4xl">DA</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-6 w-full">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-bold text-primary mb-2">
                  Daniel Adamlu
                </h1>
                <p className="text-xl text-muted-foreground">2602105046</p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <EnrichmentTrack />
                <EnrichmentTrack />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {role === "admin" && (
                  <Button variant="outline" className="flex items-center gap-2">
                    <MdSync className="w-4 h-4" />
                    Sync Data
                  </Button>
                )}
                <Button className="flex items-center gap-2 flex-1">
                  <AiOutlineUpload className="w-4 h-4" />
                  Upload CV
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-primary">My Experiences</h2>
          {role === "user" && (
            <Button>
              <IoMdAdd className="w-6 h-6" />
              Add Experiences
            </Button>
          )}
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-2">
                    1st Semester
                  </h3>
                  <Badge variant="secondary" className="mb-3">
                    Study Abroad
                  </Badge>
                  <p className="text-xl font-medium mb-2">
                    Tokyo University, Japan
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <MdEdit className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-2">
                    2nd Semester
                  </h3>
                  <Badge variant="secondary" className="mb-3">
                    Internship
                  </Badge>
                  <p className="text-xl font-medium mb-2">
                    Blibli (PT Global Niaga)
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <MdEdit className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">My Future Plan</h2>
        <FuturePlan onClick={() => setActiveModal("update")} />
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">My Thesis</h2>
        <Card>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-2">
                  [Judul Skripsi]
                </h3>
                <p className="text-xl text-muted-foreground">[Thesis Title]</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm text-muted-foreground w-20">
                      Topic:
                    </span>
                    <Badge variant="outline">[topic]</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm text-muted-foreground w-20">
                      Track:
                    </span>
                    <Badge variant="outline">[track]</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm text-muted-foreground w-20">
                      Supervisor:
                    </span>
                    <span>[supervisor]</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm text-muted-foreground w-20">
                      Member:
                    </span>
                    <span>[NIM] - [Name]</span>
                  </div>
                </div>
              </div>

              <Separator />

              <p className="text-muted-foreground leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
