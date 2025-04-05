import React from "react";
import { FaShieldAlt, FaLock, FaExchangeAlt } from "react-icons/fa";

function TrustPillars() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Safe and Secure Marketplace
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform ensures your transactions are protected with
            industry-leading security measures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-[#E8F5E9] w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <FaShieldAlt className="text-[#2E8B57] text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">
              Secure Payments
            </h3>
            <p className="text-gray-600 text-center">
              All transactions are encrypted and processed through trusted
              payment gateways.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-[#E8F5E9] w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <FaLock className="text-[#2E8B57] text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">
              Identity Protection
            </h3>
            <p className="text-gray-600 text-center">
              Your personal information is always kept private and never shared.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-[#E8F5E9] w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <FaExchangeAlt className="text-[#2E8B57] text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">
              Fair Bidding
            </h3>
            <p className="text-gray-600 text-center">
              Transparent auction process with real-time updates and
              notifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrustPillars;
