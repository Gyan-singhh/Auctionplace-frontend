import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/auth-slice/index.js";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiLoader } from "react-icons/fi";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios
          .get(`${API_URL}/api/v1/users/me`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            if (res) {
              dispatch(login({ userData: res.data.data }));
            } else {
              dispatch(logout());
            }
          })
          .finally(() => setLoading(false));
      } catch (error) {
        console.log("User not fetching failed", error);
      }
    };
    fetchUser();
    setLoading(false);
  }, []);

  return !loading ? (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Outlet />
    </>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <FiLoader className="animate-spin text-4xl text-emerald-700" />
    </div>
  );
}

export default App;
