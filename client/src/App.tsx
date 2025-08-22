import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { authApi } from "./api_services/auth/AuthAPIService";
import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import ControlPanelUserPage from "./pages/control_table/ControlPanelUserPage";
import ControlpPanelAdminPage from "./pages/control_table/ControlpPanelAdminPage";
import NotFoundPage from "./pages/not_found/NotFoundPage";
import { usersApi } from "./api_services/users/UsersAPIService";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage authApi={authApi} />} />
      <Route path="/register" element={<RegistrationPage authApi={authApi} />} />
      <Route path="/404" element={<NotFoundPage />} />

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <ControlPanelUserPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <ControlpPanelAdminPage usersApi={usersApi} /> 
            </ProtectedRoute>
          }
        />

        {/* Preusmerava na dashboard kao default rutu */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Catch-all ruta za nepostojeće stranice */}
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
