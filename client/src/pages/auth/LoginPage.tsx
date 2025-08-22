import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/auth/LoginForm";
import type { IAuthAPIService } from "../../api_services/auth/IAuthAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook";

interface LoginPageProps {
  authApi: IAuthAPIService;
}

export default function LoginPage({ authApi }: LoginPageProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  console.log("LoginPage Auth state:", { isAuthenticated, user });

  useEffect(() => {
    if (isAuthenticated && user) 
      navigate(`/${user.role}-dashboard`);
  }, [isAuthenticated, navigate, user]);

  return (
    <main className="min-h-screen bg-gray-800/90 flex items-center justify-center">
      <LoginForm authApi={authApi} />
    </main>
  );
}
