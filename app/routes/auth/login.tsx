import { useNavigate, useSearchParams } from "react-router";
import { LoginForm } from "~/features/auth/components/login-form";

export const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <LoginForm
      onSuccess={() => navigate(`${redirectTo ? `${redirectTo}` : "/"}`)}
    />
  );
};

export default Login;
