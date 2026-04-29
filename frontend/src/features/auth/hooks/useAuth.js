import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getCurrentUser } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      const response = await login({ email, password });
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ email, password, username }) => {
    setLoading(true);
    try {
      const response = await register({ email, password, username });

      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    getCurrentUser,
  };
};
