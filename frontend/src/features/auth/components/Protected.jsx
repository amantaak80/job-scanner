import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Protected({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
}

export default Protected;
