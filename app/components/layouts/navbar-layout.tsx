import type { HTMLProps, ReactNode } from "react";
import Navbar from "../Navbar";
import {Sidebar, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider} from "~/components/ui/sidebar";
import {NavLink} from "react-router";
import SidebarLink from "~/components/sidebar/SidebarLink";
import SidebarContent from "~/components/sidebar/SidebarContent";

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const NavbarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider className="flex flex-col min-h-screen w-full box-border">
      <Navbar />
      <div className="mx-auto flex-grow relative w-full box-border bg-[var(--background)]">
          <Sidebar className={"absolute"} side={"left"}>
            <SidebarContent />
          </Sidebar>
          <div>
            {children}
          </div>
      </div>
    </SidebarProvider>
  );
};
