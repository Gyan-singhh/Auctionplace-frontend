import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#2a5c3d] to-[#3a6b4f] text-gray-100">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Social */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center space-x-2 mb-4">
              <img src={"/logo.png"} alt="TheAuctionApp Logo" className="h-8" />
              <span className="text-xl font-bold text-white">
                TheAuctionPlace
              </span>
            </div>
            <p className="text-green-100 mb-6 hidden md:block">Bid. Win. Enjoy.</p>
            <div className="flex space-x-4">
              <Link
                href="/"
                className="text-green-100 hover:text-yellow-200 transition-colors"
              >
                <FaFacebookF size={18} />
              </Link>
              <Link
                href="/"
                className="text-green-100 hover:text-yellow-200 transition-colors"
              >
                <FaTwitter size={18} />
              </Link>
              <Link
                href="/"
                className="text-green-100 hover:text-yellow-200 transition-colors"
              >
                <FaInstagram size={18} />
              </Link>
              <Link
                href="/"
                className="text-green-100 hover:text-yellow-200 transition-colors"
              >
                <FaLinkedinIn size={18} />
              </Link>
            </div>
          </div>

          {/* Marketplace Links */}
          <div className="hidden md:block">
            <h4 className="text-white font-semibold mb-4 text-lg">
              Marketplace
            </h4>
            <ul className="space-y-2">
              {[
                "All Auctions",
                "Categories",
                "Featured Items",
                "Ending Soon",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-green-100 hover:text-yellow-200 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="hidden md:block">
            <h4 className="text-white font-semibold mb-4 text-lg">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Blog", "Careers", "Press"].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-green-100 hover:text-yellow-200 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="hidden md:block">
            <h4 className="text-white font-semibold mb-4 text-lg">Support</h4>
            <ul className="space-y-2">
              {["Help Center", "Contact Us", "FAQs", "Safety Tips"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-green-100 hover:text-yellow-200 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-green-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-100 text-sm">
              © {currentYear} TheAuctionApp. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Terms", "Privacy", "Cookies", "Affiliates"].map((item) => (
                <Link
                  key={item}
                  href="/"
                  className="text-green-100 hover:text-yellow-200 text-sm transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
