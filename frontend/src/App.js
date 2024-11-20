import React, { useState, useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./components/Authentication";
import HomePage from "./components/HomePage";
import AuctioneerDashboard from "./pages/AuctioneerDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AboutUs from "./components/AboutUs"; // Import the AboutUs component

const App = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const tokenParts = token.split(".");
        if (tokenParts.length === 3) {
          const decodedToken = JSON.parse(atob(tokenParts[1])); // Decode JWT payload
          setUserRole(decodedToken.role); // Assuming role is stored in the JWT token
        } else {
          console.error("Invalid token format");
          localStorage.removeItem("access_token");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("access_token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUserRole(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar is now rendered globally in App.js */}
        <Navbar userRole={userRole} handleLogout={handleLogout} />

        <main className="mx-auto">
          <Routes>
            {/* HomePage as the default route */}
            <Route
              path="/"
              element={<HomePage userRole={userRole} handleLogout={handleLogout} />}
            />

            <Route
              path="/login"
              element={
                userRole ? (
                  <Navigate to={`/${userRole}-dashboard`} /> // Redirect to specific dashboard based on user role
                ) : (
                  <Authentication setUserRole={setUserRole} />
                )
              }
            />

            <Route
              path="/registration"
              element={<Authentication setUserRole={setUserRole} />}
            />

            <Route
              path="/admin-dashboard"
              element={userRole === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
            />

            <Route
              path="/auctioneer-dashboard"
              element={userRole === "auctioneer" ? <AuctioneerDashboard /> : <Navigate to="/" />}
            />

            <Route
              path="/client-dashboard"
              element={userRole === "client" ? <ClientDashboard /> : <Navigate to="/" />}
            />

            {/* About Us route */}
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;