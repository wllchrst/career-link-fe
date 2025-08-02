import { SidebarTrigger } from "~/components/ui/sidebar";
import { NavLink } from "react-router";
import RoleSwitcher from "./role-switcher";
import { useRole } from "~/provider/role-testing-provider";
import { NavItem } from "./ui/nav-item";

export default function Navbar() {
  const { role } = useRole();

  const navLinks = [
    { label: "Announcements", to: "/announcements" },
    { label: "Bootcamps", to: "/bootcamps", userOnly: true },
    {
      label: "Bootcamps",
      to: "/admin/bootcamps",
      adminOnly: true,
      children: [
        { label: "Category", to: "/admin/bootcamps/categories" },
        { label: "Types", to: "/admin/bootcamps/types" },
      ],
    },
    { 
      label: "Certificates", 
      to: "/certificates", 
      userOnly: true
    },
  ];

  return (
    <>
      <div className="w-full bg-primary flex items-center">
        <SidebarTrigger />
        <NavLink to={"/"}>
          <h2 className="font-semibold text-white text-3xl mx-10">
            CareerLink
          </h2>
        </NavLink>

        {navLinks.map((link) => {
          if (link.adminOnly && role !== "admin") return null;
          if (link.userOnly && role !== "user") return null;

          return <NavItem key={link.label} link={link} />;
        })}

        <RoleSwitcher />
      </div>
    </>
  );
}
