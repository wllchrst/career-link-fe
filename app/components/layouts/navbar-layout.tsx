import type { HTMLProps, ReactNode } from "react";
import Navbar from "../Navbar";

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const NavbarLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto flex-grow">{children}</div>
    </div>
  );
};
