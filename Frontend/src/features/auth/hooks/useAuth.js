import { useDispatch } from "react-redux";
import { register, login, getMe } from "../services/auth.api.js";
import { setUser, setLoading, setError } from "../auth.slice.js";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleRegister({ email, username, password }) {
    try {
      dispatch(setLoading(true));
      const data = await register({ email, username, password });
      return data;
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Registration failed"),
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));

      await login({ email, password });

      const data = await getMe();

      dispatch(setUser(data.user));

      return data;
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Login failed"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (err) {
      dispatch(dispatch(setUser(null)));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
  };
}
