import React from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid } from "react-icons/fi";

const DashboardBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/user")}
      className="relative flex items-center justify-center gap-2 bg-[#2E8B57] hover:bg-[#2a6b5a] text-white py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md group"
      aria-label="User Dashboard"
    >
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></span>

      <FiGrid className="text-lg transition-transform group-hover:scale-110" />

      <span className="font-medium tracking-wide">Dashboard</span>
    </button>
  );
};

export default DashboardBtn;
