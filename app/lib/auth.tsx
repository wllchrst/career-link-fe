import { z } from "zod";
import type { ApiResponse, AuthResponse } from "~/types/api";
import { api } from "./api-client";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

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

export const logout = (redirectTo: string) => {
  const navigate = useNavigate();
  Cookies.remove("access_token");
  navigate(`/auth/login${encodeURIComponent(redirectTo)}`);
};

//TODO: buat api untuk dapatin me menggunakan token
