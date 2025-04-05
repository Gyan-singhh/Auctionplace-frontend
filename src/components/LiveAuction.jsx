import React from "react";
import { Link, useNavigate } from "react-router-dom";

function LiveAuction({ products = [] }) {
  const navigate = useNavigate();

  if (products.length === 0) {
    return (
      <div className="mt-28 px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Live Auctions</h2>
        <p className="mb-8 text-gray-500">
          No products available for auction at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            <span className="text-[#2E8B57]">Live</span> Auctions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bid on exclusive items from collectors worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const productId = product._id;
            const timeLeft = product.auctionEnd
              ? Math.floor(
                  (new Date(product.auctionEnd) - new Date()) / (1000 * 60 * 60)
                )
              : null;

            return (
              <div
                key={productId}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="relative">
                  <Link to={`/product/${productId}`}>
                    {product.image?.url ? (
                      <img
                        className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity duration-300"
                        src={product.image.url}
                        alt={
                          product.image.alt || product.title || "Auction item"
                        }
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
                        <span>No Image Available</span>
                      </div>
                    )}
                  </Link>
                  {timeLeft > 0 && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                      ⌛ {timeLeft}h left
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <Link to={`/product/${productId}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-[#378870] transition-colors line-clamp-2">
                      {product.title || "Untitled Item"}
                    </h3>
                  </Link>

                  <div className="flex justify-between items-center mb-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        product.isSoldout
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {product.isSoldout ? "Sold" : "Active"}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.totalBids || 0} bids
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => navigate(`/product/${productId}`)}
                      className={`px-5 py-2.5 rounded-lg font-medium transition-all flex-1 max-w-[140px] ${
                        product.isSoldout
                          ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                          : "bg-[#2E8B57] hover:bg-[#2a6b5a] text-white hover:shadow-md transform hover:-translate-y-0.5"
                      }`}
                    >
                      {product.isSoldout ? "View Details" : "Place Bid"}
                    </button>

                    <div className="text-right">
                      <p className="text-xs ml-1 text-gray-500 uppercase tracking-wider mb-1">
                        Current Bid
                      </p>
                      <p className="text font-bold text-[#2E8B57]">
                        ${product.biddingPrice?.toFixed(2) || "0.00"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LiveAuction;
