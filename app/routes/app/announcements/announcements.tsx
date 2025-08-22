import { AnnouncementLists } from "~/features/announcements/components/announcements-list";
import { useRole } from "~/provider/role-testing-provider";
import { Plus, Send } from "lucide-react";
import type { Route } from "./+types/announcements";
import { NavbarContentLayout } from "~/components/layouts/navbar-content-layout";
import { Button } from "~/components/ui/button";
import { useRevalidator } from "react-router";
import { useEffect, useState } from "react";
import { Modal, type ModalType } from "~/components/modal";
import type { Announcement } from "~/types/api";
import { CreateAnnouncement } from "~/features/announcements/components/create-announcement";
import { getAnnouncements } from "~/features/announcements/api/get-announcements";
import { UpdateAnnouncement } from "~/features/announcements/components/update-announcement";
import { DeleteAnnouncement } from "~/features/announcements/components/delete-announcement";
import EmptyMessage from "~/components/ui/empty-message";
import { useAuth } from "~/lib/auth";
import { getErrorMessage } from "~/lib/error";

const Announcements = ({ loaderData }: Route.ComponentProps) => {
  const [announcementsData, setAnnouncementsData] = useState<Announcement[]>([])
  const { role } = useRole();
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const fetchAnnouncements = async () => {
    try {
      let {data: announcementsData} = await getAnnouncements()
      setAnnouncementsData(announcementsData)
    } catch (error) {
      console.log(getErrorMessage(error))
    }
  };


  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const onSuccess = async () => {
    setActiveModal(null);
    setSelectedAnnouncement(null);
    await fetchAnnouncements()
  };

  const onSelect = (e:Announcement, type:ModalType) => {
    setActiveModal(type)
    setSelectedAnnouncement(e)
  }

  
  if (!user){
    return <div className="flex flex-col items-center justify-center">
        <EmptyMessage text="You are prohibited to access this page. Please login first!" title="Unauthorized"/>
        <a href="/career-link/">Login here</a>
    </div>
  }

  return (
    <NavbarContentLayout
      title="Announcements"
      subtitle={
        role === "admin" ? "Manage and view all announcements" : undefined
      }
    >
      <Modal
        title="Add Announcement"
        isOpen={activeModal === "create"}
        onClose={() => setActiveModal(null)}
      >
        <CreateAnnouncement onSuccess={onSuccess}/>
      </Modal>

      <Modal
        title="Update Announcement"
        isOpen={activeModal === "update"}
        onClose={() => setActiveModal(null)}
      >
        {selectedAnnouncement && <UpdateAnnouncement onSuccess={onSuccess} announcement={selectedAnnouncement}/>}
      </Modal>

      <Modal
        title="Delete Announcement"
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
      >
        {selectedAnnouncement && <DeleteAnnouncement onClose={() => setActiveModal(null)} onSuccess={onSuccess} announcement={selectedAnnouncement}/>}
      </Modal>
      {role === "admin" && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button size="sm" onClick={() => setActiveModal('create')}>
              <Plus className="h-4 w-4" />
              Add Announcement
            </Button>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <AnnouncementLists announcements={announcementsData} onSelect={onSelect}/>
    </NavbarContentLayout>
  );
};

export default Announcements;
