import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/auth-slice/index.js";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = async (data) => {
    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/users/login`,
        {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response) {
        toast.success("Login successful!");
        dispatch(authLogin({ userData: response.data.user }));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const password = watch("password");

  return (
    <div className="flex items-center justify-center py-15 bg-gray-200 px-4 md:px-0">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex-1 p-10 bg-white flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            Welcome Back!
          </h1>

          <p className="text-lg text-gray-600 md:mb-8 max-w-md">
            Sign in to access your account and continue bidding on exclusive
            items.
          </p>

          <div className="w-16 h-1 bg-emerald-500 mb-8 hidden md:block"></div>

          <div className="space-y-6 hidden md:block">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-emerald-100 p-2 rounded-full mr-4 text-emerald-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  24/7 Auctions
                </h3>
                <p className="text-gray-500">
                  Bid anytime from anywhere in the world
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#236f44] to-[#1a4b2c] p-12 text-white">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit(login)}>
            <div className="mb-4">
              <label className="block text-gray-300">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be valid",
                  },
                })}
                className="w-full bg-transparent border-b-2 border-gray-300 p-2 focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-300">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full bg-transparent border-b-2 border-gray-300 p-2 focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-300">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full bg-transparent border-b-2 border-gray-300 p-2 focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-green-600 py-3 rounded-full transition-all ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-700"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-green-300 underline hover:text-green-400"
            >
              Sign-up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
