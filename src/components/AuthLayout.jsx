import React, { useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const { status: authStatus, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading) {
      if (authentication && !authStatus) {
        navigate("/login");
      } else if (!authentication && authStatus) {
        navigate("/");
      }
    }
  }, [authStatus, isLoading, navigate, authentication]);

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <FiLoader className="animate-spin text-4xl text-emerald-700" />
    </div>
  ) : (
    <>{children}</>
  );
}

export default AuthLayout;
