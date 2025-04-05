import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";
import { useSelector } from "react-redux";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const user = useSelector((state) => state.auth.userData);

  const handleBidSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/v1/biddings/${id}`,
        {
          productId: product._id,
          price: bidAmount,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      toast.success("Bid placed successfully!");
      if (response.status === 200) {
        const newBid = {
          _id: Date.now().toString(),
          user: { name: user.name },
          price: bidAmount,
          createdAt: new Date().toISOString(),
        };
        setBids((prevBids) => [newBid, ...prevBids]);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error placing bid");
    }
    setBidAmount("");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/products/${id}`
        );
        setProduct(response.data.data);
      } catch (error) {
        console.log("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchBiddingHistory = async () => {
      try {
        const bidResponse = await axios.get(
          `${API_URL}/api/v1/biddings/${id}`
        );
        setBids(bidResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBiddingHistory();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FiLoader className="animate-spin text-4xl text-emerald-700" />
      </div>
    );
  }

  if (!product) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return (
    <div className="w-full p-4 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image Section */}
        <div>
          <img
            src={product.image?.url}
            alt={product.image?.alt || "Product"}
            className="w-full h-105 object-cover rounded-xl"
          />
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3">{product.title}</h1>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="mb-2">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="mb-2">
              <strong>Dimensions:</strong> {product.height} x {product.width} x{" "}
              {product.length} cm
            </p>
            <p className="mb-2">
              <strong>Weight:</strong> {product.weight} kg
            </p>
            <p className="mb-2">
              <strong>Commission:</strong> {product.commission}%
            </p>
            <p className="mb-4">
              <strong>Starting Price:</strong> ${product.price}
            </p>
            <p className="mb-4">
              <strong>Current Bid:</strong> ${product.biddingPrice}
            </p>
            {product.isVerify ? (
              <p className="text-green-500">✅ Verified Product</p>
            ) : (
              <p className="text-red-500">❌ Not Verified</p>
            )}
            {product.isSoldOut ? (
              <p className="text-red-500 font-semibold">Sold Out</p>
            ) : (
              <p className="text-green-500 font-semibold">Available</p>
            )}
          </div>

          {/* Bid Input Section */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) =>
                setBidAmount(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="border rounded-lg px-4 py-2 w-70"
              disabled={product.isSoldOut}
            />
            <button
              onClick={() => setBidAmount((prev) => prev + 1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-15 px-4 py-2 rounded-lg"
              disabled={product.isSoldOut}
            >
              +
            </button>
            <button
              onClick={handleBidSubmit}
              className="bg-[#2E8B57] hover:bg-green-600 text-white px-6 py-2 rounded-lg"
              disabled={product.isSoldOut}
            >
              Submit
            </button>
          </div>
        </div>

        {/* Bidding History Section */}
        <div className="w-full lg:col-span-2 bg-white shadow- rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Auction History</h2>
          <div className="overflow-x-auto rounded-md">
            <table className="w-full bg-gray-50 rounded-lg">
              <thead>
                <tr className="text-gray-700 bg-gray-100">
                  <th className="py-3 px-4 sm:px-10 text-left">No.</th>
                  <th className="py-3 px-4 text-left">User</th>
                  <th className="py-3 px-4 sm:px-10 text-left">
                    Bid Amount (USD)
                  </th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {bids.length > 0 ? (
                  bids.map((bid, index) => (
                    <tr key={bid._id} className="border-b">
                      <td className="py-3 px-3 sm:px-10">{index + 1}</td>
                      <td className="py-3 px-4">
                        {bid.user?.name || "Unknown"}
                      </td>
                      <td className="py-3 px-4 sm:px-12">
                        ${bid.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(bid.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-3 px-4 text-center" colSpan="4">
                      No bids available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
