import React, { useState, useEffect } from "react";
import { FaSearch, FaShieldAlt, FaLock, FaExchangeAlt } from "react-icons/fa";
import axios from "axios";
import LiveAuction from "../components/LiveAuction";
import OurNetwork from "../components/OurNetwork.jsx";
import TrustPillars from "../components/TrustPillars";
const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/products`
        );
        setAllProducts(response.data.data || []);
        setFilteredProducts(response.data.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(allProducts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = allProducts.filter((product) => {
        const title = product.title?.toLowerCase() || "";
        const category = product.category?.toLowerCase() || "";
        const description = product.description?.toLowerCase() || "";

        return (
          title.includes(query) ||
          category.includes(query) ||
          description.includes(query)
        );
      });
      setFilteredProducts(filtered);
    }

  }, [searchQuery, allProducts]);

  const handleSearch = () => {  
    setTimeout(() => {
      const element = document.getElementById('live-auctions');
      if (element) {
        element.scrollIntoView();
      }
    }, 100);
  };

  if (error) {
    return <div className="text-red-500 text-center py-10">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2E8B57] to-[#3CB371] py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Discover, Bid & Win <span className="text-yellow-200">Unique</span>{" "}
            Items
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-10">
            Join thousands of collectors and enthusiasts in our exclusive
            auctions.
          </p>

          {/* Search Bar */}
          <div className="relative flex items-center justify-center w-full max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, categories..."
              className="w-full py-4 pl-12 pr-36 rounded-full border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent text-gray-800 placeholder-gray-700 text-lg"
            />
            <FaSearch className="absolute left-5 text-gray-500 text-xl" />
            <button onClick={() => handleSearch()} className="absolute right-2 bg-[#2E8B57] hover:bg-[#3A6B4F] text-white px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
              Search
            </button>
          </div>
        </div>
      </section>

      <TrustPillars />

      <section id="live-auctions">
        {isLoading ? (
          <div className="text-center py-10">Loading auctions...</div>
        ) : (
          <LiveAuction products={filteredProducts} />
        )}
      </section>

      <OurNetwork />
    </div>
  );
}

export default Home;
