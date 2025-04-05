import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { format } from "date-fns";
import {
  FaTrophy,
  FaMoneyBillWave,
  FaUser,
  FaCalendarAlt,
  FaBoxOpen,
} from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";

const WinningBids = () => {
  const [wonProducts, setWonProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userInfo = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWonProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}/api/v1/products/won`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        setWonProducts(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "");
        setLoading(false);
        toast.error(error);
      }
    };

    fetchWonProducts();
  }, [userInfo, navigate]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FiLoader className="animate-spin text-4xl text-emerald-700" />
      </div>
    );
  }

  if (wonProducts.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-8 text-center">
        <FaBoxOpen className="mx-auto text-4xl text-gray-500 mb-4" />
        <h2 className="text-2xl font-bold">You haven't won any bids yet</h2>
        <p className="text-gray-600 mt-2">
          Start bidding on products to see them here when you win!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
      <FaTrophy className="text-3xl text-yellow-400 mr-4" />
        <h1 className="text-3xl font-bold">Your Winning Bids</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wonProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleProductClick(product._id)}
          >
            <img
              src={product.image?.url || "/placeholder-product.jpg"}
              alt={product.image?.alt || product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col h-full">
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>

              <div className="flex items-center mb-2 text-gray-600">
                <FaUser className="mr-2" />
                <span>Sold by: {product.user?.name || "Unknown"}</span>
              </div>

              <div className="flex items-center mb-2 text-gray-600">
                <FaCalendarAlt className="mr-2" />
                <span>
                  Won on: {format(new Date(product.updatedAt), "MMM dd, yyyy")}
                </span>
              </div>

              <div className="flex items-center mb-3">
                <GiPriceTag className="mr-2 text-gray-600 text-xl" />
                <span className="text-lg font-bold text-green-700">
                  ${product.biddingPrice.toFixed(2)}
                </span>
              </div>

              {product.isPaid && (
                <div className="mt-auto">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <FaMoneyBillWave className="mr-1" />
                    Payment Completed
                  </div>
                </div>
              )}

              <button
                className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <FaMoneyBillWave className="mr-2" />
                Arrange Payment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinningBids;
