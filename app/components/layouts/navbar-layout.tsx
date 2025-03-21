import type { HTMLProps, ReactNode } from "react";
import Navbar from "../navbar";
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "~/components/ui/sidebar";
import { NavLink } from "react-router";
import SidebarLink from "~/components/sidebar/sidebar-link";
import SidebarContent from "~/components/sidebar/sidebar-content";
import CenterLayout from "~/components/layouts/center-layout";

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const NavbarLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen w-full box-border bg-[var(--background)]">
      <Navbar />
      <div className="flex-grow relative min-h-screen w-full box-border">
        <Sidebar className={"absolute min-h-full"} side={"left"}>
          <SidebarContent />
        </Sidebar>
        <div className="mx-auto max-w-[1200px] w-full h-full">
          <CenterLayout>{children}</CenterLayout>
        </div>
      </div>
    </div>
  );
};
