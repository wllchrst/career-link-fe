import * as React from "react";
import { SidebarProvider } from "./components/ui/sidebar";
import { RoleTestingProvider } from "./role-testing-provider";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <RoleTestingProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </RoleTestingProvider>
  );
};
