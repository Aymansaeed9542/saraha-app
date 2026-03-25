import api from "../lib/api";

export const signupUser = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  if (response.data.status !== 201) {
    throw new Error(response.data.message || "Failed to create account");
  }
  return response.data;
};
// Note: Login is handled natively by NextAuth signIn("credentials") from "next-auth/react"
