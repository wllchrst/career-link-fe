import * as React from "react";
import { SidebarProvider } from "./components/ui/sidebar";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};
