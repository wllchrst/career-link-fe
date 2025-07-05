import * as React from "react";
import { SidebarProvider } from "../components/ui/sidebar";
import { RoleTestingProvider } from "./role-testing-provider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "~/lib/auth";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
      <RoleTestingProvider>
        <Toaster />
        <SidebarProvider>{children}</SidebarProvider>
      </RoleTestingProvider>
    </AuthProvider>
  );
};
