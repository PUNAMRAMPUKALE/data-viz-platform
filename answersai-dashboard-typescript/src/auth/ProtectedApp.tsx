import React from "react";
import { useAuth } from "../hooks/useAuth";
import Login from "../pages/Login";
import App from "../App";

const ProtectedApp: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ color: "white" }}>Loading...</div>;
  if (!user) return <Login />;

  return <App />;
};

export default ProtectedApp;
