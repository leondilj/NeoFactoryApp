import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/login/index";
import { fakeAuth } from "@/auth/auth";
import DashboardFinanceiro from "@/pages/dashboard/index";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Seu conteúdo de rotas aqui */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              fakeAuth.isAuthenticated() ? <DashboardFinanceiro /> : <Navigate to="/" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}