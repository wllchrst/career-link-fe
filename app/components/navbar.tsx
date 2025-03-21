import { SidebarTrigger } from "~/components/ui/sidebar";
import { NavLink } from "react-router";
import RoleSwitcher from "./role-switcher";

export default function Navbar() {
  return (
    <>
      <div className="w-full bg-primary p-5 flex items-center gap-x-10">
        <SidebarTrigger />
        <NavLink to={"/"}>
          <h2 className="font-semibold text-white text-3xl">CareerLink</h2>
        </NavLink>
        <NavLink to={"/announcements"}>
          <h4 className="font-medium text-white text-xl">Announcements</h4>
        </NavLink>
        <NavLink to={"/bootcamps"}>
          <h4 className="font-medium text-white text-xl">Bootcamps</h4>
        </NavLink>
        <NavLink to={"/certificates"}>
          <h4 className="font-medium text-white text-xl">Certificates</h4>
        </NavLink>
        <RoleSwitcher />
      </div>
    </>
  );
}
