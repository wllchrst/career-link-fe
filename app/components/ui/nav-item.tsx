import { NavLink } from "react-router";

interface Props {
  label: string;
  to: string;
  userOnly?: boolean;
  adminOnly?: boolean;
  children?: { label: string; to: string }[];
}

export const NavItem = ({ link }: { link: Props }) => {
  if (link.children) {
    return (
      <div className="relative group p-5">
        <NavLink
          to={link.to}
          className="font-semibold text-white text-xl cursor-pointer flex items-center gap-1"
        >
          {link.label}
          <svg
            className="w-4 h-4 mt-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </NavLink>

        <div className="absolute left-0 top-full hidden group-hover:block bg-primary shadow-md z-20 hover:bg-secondary">
          {link.children.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              className="block  px-10 py-5 text-white font-bold"
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <NavLink to={link.to} className="font-semibold text-white text-xl p-5">
      {link.label}
    </NavLink>
  );
};
