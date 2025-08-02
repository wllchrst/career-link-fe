import { z } from "zod";
import type { ApiResponse, AuthResponse, User } from "~/types/api";
import { api } from "./api-client";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const loginInputSchema = z.object({
  nim: z.string().min(1, "NIM is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const login = ({
  data,
}: {
  data: LoginInput;
}): Promise<ApiResponse<AuthResponse>> => {
  return api.post("/user/login", data);
};

export const getUser = (): Promise<{ data: User }> => {
  return api.get("user/me");
};

export const logout = (redirectTo: string) => {
  const navigate = useNavigate();
  Cookies.remove("access_token");
  navigate(`/auth/login${encodeURIComponent(redirectTo)}`);
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  fetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("access_token");

  const fetchUser = async () => {
    try {
      if (!token) {
        setUser(null);
        return;
      }

      const res = await getUser();
      setUser(res.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, fetchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("userAuth must be within an AuthProvider");
  return context;
};
