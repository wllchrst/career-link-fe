import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { LoginForm } from "~/features/auth/components/login-form";
import { useAuth } from "~/lib/auth";

export const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const {user} = useAuth();

  useEffect(() => {
    if (user){
      navigate("home")
    }
  }, [])

  if (user) {
    return null
  }

  return (
    <LoginForm
      onSuccess={() => navigate(`home`)}
    />
  );
};

export default Login;
