import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/me", {
          withCredentials: true,
        });

        if (res?.data?.user) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        console.log("CheckAuth Error:", err);

        if (err.response?.status === 401) {
          console.log("Set me koi galti hai");
          setAuthenticated(false);
        } else {
          console.error("Something else went wrong", err);
          setAuthenticated(false);
        }
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Checking login...</div>; // optional loading state
  }

  return isAuthenticated ? children : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;
