import { useState } from "react";
import axios from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/rides";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: "40px auto" }}>
      <h2>Login</h2>

      <form onSubmit={loginUser}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
