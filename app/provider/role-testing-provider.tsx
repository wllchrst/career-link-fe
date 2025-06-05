import { createContext, useState, useContext, type ReactNode, useEffect } from "react";

type Role = "user" | "admin";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleTestingProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>("user");

  useEffect(() => {

    let newRole = window.localStorage.getItem('role')
    if (newRole == 'admin' || newRole == 'user'){
      setRole(newRole)
    }
    console.log('here')
  }, [role])  

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
