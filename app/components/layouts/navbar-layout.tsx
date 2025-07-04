import Navbar from "../navbar";
import { Sidebar } from "~/components/ui/sidebar";
import { Outlet } from "react-router";
import SidebarContent from "~/components/sidebar/sidebar-content";
import CenterLayout from "~/components/layouts/center-layout";

const NavbarLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full box-border bg-[var(--background)]">
      <Navbar />
      <div className="flex-grow relative min-h-screen w-full box-border">
        <Sidebar className={"absolute min-h-full"} side={"left"}>
          <SidebarContent />
        </Sidebar>
        <div className="mx-auto max-w-[1200px] w-full h-full">
          <CenterLayout>
            <Outlet />
          </CenterLayout>
        </div>
      </div>
    </div>
  );
};

export default NavbarLayout;
