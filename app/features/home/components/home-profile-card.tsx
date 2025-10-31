import { EnrichmentTrack } from "~/components/home/enrichment-track";
import { MdEdit } from "react-icons/md";
import { useRole } from "~/provider/role-testing-provider";
import FuturePlan from "./future-plan";
import { useEffect, useState } from "react";
import { Modal, type ModalType } from "~/components/modal";
import UpdateStudentData from "./update-student-data";
import UpdatePassword from "./update-password";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useAuth } from "~/lib/auth";

export const HomeProfileCard = () => {
  const { user, fetchUser } = useAuth();
  const { role } = useRole();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSuccess = () => {
    setActiveModal(null);
    fetchUser();
  };

  const extractInitials = (name: string | undefined) => {
    if (!name) return "";
    const names = name.split(" ");
    const initials = names.map((n) => n.charAt(0).toUpperCase()).join("");
    return initials;
  };

  const onClickEdit = () => {
    setIsModalOpen(prev => !prev);
  };

  useEffect(() => {
    if (
      user &&
      (user.skill == "" ||
        user.future_position == "" ||
        user.cv_image_path == "")
    ) {
      setActiveModal("update");
    }
  }, [user]);

  return (
    <div className="w-full mx-auto p-6 space-y-8">
      <Modal
        title="Update My Future Plan"
        isOpen={activeModal == "update"}
        onClose={() => {
          if (
            user &&
            (user.cv_image_path == "" ||
              user.skill == "" ||
              user.future_position == "")
          ) {
            return;
          }
          setActiveModal(null);
        }}
      >
        <UpdateStudentData user={user!} onSuccess={onSuccess} />
      </Modal>

      <Modal
        title="Update Password"
        isOpen={activeModal == "password"}
        onClose={() => setActiveModal(null)}
      >
        <UpdatePassword user={user!} onSuccess={onSuccess} />
      </Modal>

      <Card className="overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            <Avatar className="w-48 h-48 mx-auto lg:mx-0">
              <AvatarImage alt={user?.name} />
              <AvatarFallback className="text-4xl">
                {extractInitials(user?.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-6 w-full">
              <div className="flex items-center justify-between gap-4">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-bold text-primary mb-2">
                  {user?.name}
                </h1>
                <p className="text-xl text-muted-foreground">{user?.nim}</p>
              </div>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveModal("password")}
                >
                  Change Password
                </Button>
              </div>

              {user?.enrichment_track && (
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <EnrichmentTrack />
                </div>
              )}

              {/* <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex items-center gap-2 flex-1 hover:cursor-pointer">
                  <AiOutlineUpload className="w-4 h-4" />
                  Upload CV
                </Button>
              </div> */}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {user?.enrichment_track && (
          <>
            <div className="flex justify-between items-center mt-16">
              <h2 className="text-3xl font-bold text-primary">
                My Experiences
              </h2>
              {/* {role === "user" && (
                <Button>
                  <IoMdAdd className="w-6 h-6" />
                  Add Experience
                </Button>
              )} */}
            </div>
            <Card>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold text-primary mb-2">
                        1st Semester
                      </h3>
                      <Badge variant="secondary" className="mb-3">
                        {user?.enrichment_track}
                      </Badge>
                      <p className="text-xl font-medium mb-2">
                        {user?.partner} - {user?.current_position}
                      </p>
                    </div>
                    {/* <Button variant="ghost" size="icon">
                      <MdEdit className="w-5 h-5" />
                    </Button> */}
                  </div>
                </div>

                <Separator />

                {user?.duration?.startsWith("12") && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-semibold text-primary mb-2">
                          2nd Semester
                        </h3>
                        <Badge variant="secondary" className="mb-3">
                          {user.enrichment_track}
                        </Badge>
                        <p className="text-xl font-medium mb-2">
                          {user.partner} - {user.current_position}
                        </p>
                      </div>
                      {/* <Button variant="ghost" size="icon">
                        <MdEdit className="w-5 h-5" />
                      </Button> */}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="space-y-6 mt-12">
        <h2 className="text-3xl font-bold text-primary">My Future Plan</h2>
        <FuturePlan
          onClick={() => setActiveModal("update")}
          position={user?.future_position ?? ""}
          skill={user?.skill ?? ""}
        />
      </div>
    </div>
  );
};
