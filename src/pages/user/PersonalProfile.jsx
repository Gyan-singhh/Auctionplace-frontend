import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FiUser,
  FiMail,
  FiDollarSign,
  FiGrid,
  FiEdit,
  FiLoader,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

function PersonalProfile() {
  const user = useSelector((state) => state.auth.userData);
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setAvatar(
        user.avatar.secureUrl ||
          "https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
      );
      setLoading(false);
    }
  }, [user]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image size should be less than 3MB");
      return;
    }

    setIsUploading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await axios.put(
        `${API_URL}/api/v1/users/update-image`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      setAvatar(response?.data?.data?.avatar?.secureUrl);
      toast.success("Profile image updated successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error(
        error.response?.data?.message || "Failed to update profile image"
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FiLoader className="animate-spin text-4xl text-emerald-700" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center md:mt-20 bg-gray-50 p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="relative group">
              <img
                src={avatar}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-emerald-100 mb-4"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                {isUploading ? (
                  <FiLoader className="animate-spin text-2xl text-white" />
                ) : (
                  <FiEdit className="text-2xl text-white" />
                )}
                <input
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>
            <h2 className="text-xl font-semibold mt-2">{user?.name}</h2>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm mt-2">
              {user?.role}
            </span>
          </div>

          {/* Read-only Details Section */}
          <div className="w-full md:w-2/3 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <FiUser className="text-emerald-700" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <FiMail className="text-emerald-700" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <FiGrid className="text-emerald-700" />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium capitalize">{user?.role}</p>
              </div>
            </div>

            <div className={user.role === "admin" ? "grid grid-cols-1 md:grid-cols-2 gap-4 mt-6" : ""}>
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded">
                <FiDollarSign className="text-emerald-700" />
                <div>
                  <p className="text-sm text-gray-500">Balance</p>
                  <p className="font-bold text-lg">
                    ${user?.balance?.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>
              {user.role === "admin" && (
                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded">
                <FiDollarSign className="text-emerald-700" />
                  <div>
                    <p className="text-sm text-gray-500">Commission Balance</p>
                    <p className="font-bold text-lg">
                      ${user?.commissionBalance?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalProfile;
