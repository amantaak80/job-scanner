import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",

  /* Now server have access to read and write in cookie*/
  withCredentials: true,
});

export async function register({ username, email, password }) {
  try {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
  }
}

export async function logout() {
  try {
    const response = await api.post("/logout");
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

export async function getCurrentUser() {
  try {
    const response = await api.get("/get-me");

    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
}
