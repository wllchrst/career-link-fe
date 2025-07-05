import { useEffect } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router";
import { useAuth } from "~/lib/auth";
import GlobalSpinner from "../ui/global-spinner";

const AuthLayout = () => {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(redirectTo ? redirectTo : "/", {
        replace: true,
      });
    }
  }, [loading, user]);

  if (loading) return null;

  return (
    <div className="flex min-h-screen min-w-screen flex-col justify-center">
      <div className="mx-auto shadow py-7 px-10 rounded-md w-[350px] border bg-card">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
