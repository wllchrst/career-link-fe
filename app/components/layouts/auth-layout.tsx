import { useEffect } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router";

const AuthLayout = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const navigate = useNavigate();

  useEffect(() => {
    //TODO: cek apakah use sekarang udah login, kalau belum maka redirect ke redirectTo atau default ke homepage
  }, []);

  return (
    <div className="flex min-h-screen min-w-screen flex-col justify-center">
      <div className="mx-auto shadow py-7 px-10 rounded-md w-[350px] border bg-card">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
