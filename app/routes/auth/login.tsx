import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import EmptyMessage from "~/components/ui/empty-message";
import { LoginForm } from "~/features/auth/components/login-form";
import { useAuth } from "~/lib/auth";

export const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const {user} = useAuth();

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center">
        <EmptyMessage text="You are already login to this app" title="Unauthorized"/>
        <a href="/career-link/home">Click here</a>
      </div>
    )
  }

  return (
    <LoginForm
      onSuccess={() => navigate(`home`)}
    />
  );
};

export default Login;
