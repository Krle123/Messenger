import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationForm } from "../../components/auth/RegistrationForm";
import type { IAuthAPIService } from "../../api_services/auth/IAuthAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook";

interface RegistrationPageProps {
  authApi: IAuthAPIService;
}

export default function RegistrationPage({ authApi }: RegistrationPageProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) 
      navigate(`/${user.role}-dashboard`);
  }, [isAuthenticated, navigate, user]);

  return (
    <main className="min-h-screen bg-gray-800/90 flex items-center justify-center">
      <RegistrationForm authApi={authApi} />
    </main>
  );
}
