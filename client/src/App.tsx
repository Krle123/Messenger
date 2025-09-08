import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { authApi } from "./api_services/auth/AuthAPIService";
import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import NotFoundPage from "./pages/not_found/NotFoundPage";
import { usersApi } from "./api_services/users/UsersAPIService";
import HomePage from "./pages/home/HomePage";
import ChatPage from "./pages/chat/ChatPage";
import { msgAPI } from "./api_services/msg/MsgAPIService";
import { ChatSelection } from "./pages/chat/ChatSelectionPage";
import { AccountPage } from "./pages/account/AccountPage";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage authApi={authApi} />} />
      <Route path="/register" element={<RegistrationPage authApi={authApi} />} />
      <Route path="/chat" element={<ProtectedRoute requiredRole="">
        <ChatPage msgApi={msgAPI} /></ProtectedRoute>} />
      <Route path="/select" element={<ProtectedRoute requiredRole="">
        <ChatSelection usersApi={usersApi} msgApi={msgAPI} /></ProtectedRoute>} />
      <Route path="/account" element={<ProtectedRoute requiredRole=""><AccountPage/></ProtectedRoute>} />
      <Route path="/404" element={<NotFoundPage />} />

      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
