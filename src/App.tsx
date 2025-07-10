import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardPOC from "./pages/DashboardPOC";
import { fakeAuth } from "./auth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            fakeAuth.isAuthenticated() ? <DashboardPOC /> : <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
