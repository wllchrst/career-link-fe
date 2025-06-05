import type { ChangeEvent } from "react";
import { useRole } from "~/provider/role-testing-provider";

const RoleSwitcher = () => {
  const { role, setRole } = useRole();

  const updateRole = (e:ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.checked ? "admin" : "user")
    window.localStorage.setItem('role', e.target.checked ? "admin" : "user")
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="roleSwitch"
        checked={role === "admin"}
        onChange={updateRole}
        className="w-5 h-5 cursor-pointer"
      />
      <label htmlFor="roleSwitch" className="cursor-pointer text-white">
        {role === "admin" ? "Admin" : "User"}
      </label>
    </div>
  );
};

export default RoleSwitcher;
