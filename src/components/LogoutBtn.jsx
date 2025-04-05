import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth-slice/index.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
const API_URL = import.meta.env.VITE_API_URL;

function LogoutBtn({ sidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/users/logout`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response && response.data) {
        toast.success("Logout successful! See you next time!");
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout failed", error);
    }
  };

  return (
    <button
      onClick={logoutHandler}
      className="w-full flex pl-3 items-center p-3 text-emerald-100 hover:cursor-pointer hover:bg-emerald-800 rounded-lg transition-colors"
    >
      <FiLogOut size={20} />
      {sidebarOpen && <span className="ml-3">Sign Out</span>}
    </button>
  );
}

export default LogoutBtn;
