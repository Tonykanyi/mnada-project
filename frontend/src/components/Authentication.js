import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Authentication = ({ setUserRole }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username.trim(),
          password: password.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Login failed.");
        return;
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_role", data.user_data.role);
      setUserRole(data.user_data.role);
      navigate(`/${data.user_data.role}-dashboard`);
    } catch (error) {
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
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role: "client", // Default role
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Registration failed.");
        setLoading(false);
        return;
      }

      setIsLoginMode(true);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${require("../images/auction1.jpg")})`,
      }}
    >
      {/* Authentication Form */}
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 transition duration-300 ease-in-out transform hover:scale-105 hover:opacity-80 hover:bg-opacity-90">
          <h2 className="text-xl font-bold mb-4 text-center">
            {isLoginMode ? "Login" : "Register"}
          </h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={isLoginMode ? handleLogin : handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-2 border mb-4 ${
                loading ? "bg-gray-100" : ""
              }`}
              required
              disabled={loading}
            />
            {!isLoginMode && (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-2 border mb-4 ${
                  loading ? "bg-gray-100" : ""
                }`}
                required
                disabled={loading}
              />
            )}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border mb-4 ${
                loading ? "bg-gray-100" : ""
              }`}
              required
              disabled={loading}
            />
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
            {isLoginMode
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-800 py-4 text-center text-white w-full">
        <p>&copy; 2024 Mnada Auctions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Authentication;
