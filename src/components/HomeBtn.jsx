import React from "react";
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const HomeBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="flex items-center justify-center gap-2 py-2 px-4 text-green-700  hover:bg-green-50 rounded transition-colors  duration-200"
    >
      <FiHome className="text-lg text-green-700" />
      <span>Home</span>
    </button>
  );
};

export default HomeBtn;
