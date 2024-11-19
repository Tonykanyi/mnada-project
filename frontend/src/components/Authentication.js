import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Authentication = ({ setUserRole }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      console.log("Sending login request:", { username, password });
  
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(), // Ensure no extra spaces
          password: password.trim(),
        }),
      });
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        const data = await response.json();
        console.error("Login failed:", data);
        setError(data.message || "Login failed.");
        return;
      }
  
      const data = await response.json();
      console.log("Login successful:", data);
  
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user_role", data.role);
      setUserRole(data.role);
      navigate(`/${data.role}-dashboard`);
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Sending registration request:", { username, email, password, role });

      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const data = await response.json();
        console.error("Registration failed:", data);
        setError(data.message || "Registration failed.");
        setLoading(false);
        return;
      }

      console.log("Registration successful");
      setIsLoginMode(true);
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("client");
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">{isLoginMode ? "Login" : "Register"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={isLoginMode ? handleLogin : handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-2 border mb-4 ${loading ? "bg-gray-100" : ""}`}
            required
            disabled={loading}
          />
          {!isLoginMode && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border mb-4 ${loading ? "bg-gray-100" : ""}`}
              required
              disabled={loading}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border mb-4 ${loading ? "bg-gray-100" : ""}`}
            required
            disabled={loading}
          />
          {!isLoginMode && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full p-2 border mb-4 ${loading ? "bg-gray-100" : ""}`}
              disabled={loading}
            >
              <option value="client">Client</option>
              <option value="auctioneer">Auctioneer</option>
              <option value="admin">Admin</option>
            </select>
          )}
          <button
            type="submit"
            className={`w-full py-2 rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : isLoginMode ? "Login" : "Register"}
          </button>
        </form>
        <button
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="text-blue-500 mt-4 w-full text-center"
        >
          {isLoginMode ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Authentication;
