import { useRole } from "~/role-testing-provider";

const RoleSwitcher = () => {
  const { role, setRole } = useRole();

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="roleSwitch"
        checked={role === "admin"}
        onChange={(e) => setRole(e.target.checked ? "admin" : "user")}
        className="w-5 h-5 cursor-pointer"
      />
      <label htmlFor="roleSwitch" className="cursor-pointer text-white">
        {role === "admin" ? "Admin" : "User"}
      </label>
    </div>
  );
};

export default RoleSwitcher;
