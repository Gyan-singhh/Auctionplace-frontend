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
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_URL}/api/v1/users/me`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.data?.data) {
          dispatch(login({ userData: response.data.data }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("User fetch failed:", error);
        localStorage.removeItem('token');
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  return !loading ? (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Outlet />
    </>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <FiLoader className="animate-spin text-4xl text-emerald-700" />
    </div>
  );
}

export default App;
