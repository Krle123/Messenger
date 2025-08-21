import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationForm } from "../../components/auth/RegistrationForm";
import type { IAuthAPIService } from "../../api_services/auth/IAuthAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook";

interface RegistrationPageProps {
  authApi: IAuthAPIService;
}

export default function RegistracijaPage({ authApi }: RegistrationPageProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) 
      navigate(`/${user.role}-dashboard`);
  }, [isAuthenticated, navigate, user]);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-slate-600/75 to-orange-800/70 flex items-center justify-center">
      <RegistrationForm authApi={authApi} />
    </main>
  );
}
