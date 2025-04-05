import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiBox,
  FiPlusCircle,
  FiUser,
  FiList,
  FiMail,
  FiAward,
  FiUserCheck,
  FiBarChart2,
} from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import LogoutBtn from "./LogoutBtn.jsx";
import { useSelector } from "react-redux";
import HomeBtn from "./HomeBtn.jsx";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Personal Profile");
  const user = useSelector((state) => state.auth.userData);

  const baseNavItems = [
    {
      icon: <FiUserCheck size={20} />,
      name: "Personal Profile",
      slug: "/user",
    },
    {
      icon: <FiBarChart2 size={20} />,
      name: "Analytics Dashboard",
      slug: "/user/analytics",
    },
    {
      icon: <FiBox size={20} />,
      name: "My Products",
      slug: "/user/my-products",
    },
    {
      icon: <FiPlusCircle size={20} />,
      name: "Create Product",
      slug: "/user/create-product",
    },
    {
      icon: <FiAward size={20} />,
      name: "Winning Bids",
      slug: "/user/winning-bids",
    },
  ];

  const adminNavItems = [
    {
      icon: <FiList size={20} />,
      name: "All Product List",
      slug: "/user/all-product-list",
    },
    { icon: <FiUser size={20} />, name: "All Users", slug: "/user/all-users" },
    {
      icon: <FiMail size={20} />,
      name: "Messages",
      slug: "/user/messages",
    },
  ];

  const navItems =
    user?.role === "admin" ? [...baseNavItems, ...adminNavItems] : baseNavItems;

  return (
    <div
      className={`min-h-screen bg-gray-50 transition-all duration-300 ${
        sidebarOpen ? "md:pl-64" : "md:pl-20"
      }`}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-12 bg-white shadow-sm z-50 flex items-center justify-between px-4 border-">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-emerald-700 hover:text-emerald-900 transition-colors p-1 rounded-md hover:bg-emerald-50"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <HomeBtn />
      </header>

      <aside
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-emerald-800 to-emerald-900 text-white z-40 transition-all duration-300 
          ${sidebarOpen ? "w-64" : "w-20"} 
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="h-full flex flex-col">
          {sidebarOpen && (
            <div className="flex flex-col items-center mt-20 mb-4">
              <div className="w-24 h-24 mb-4 border-2 border-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                {user?.avatar?.secureUrl ? (
                  <img
                    alt="User profile"
                    className="w-full h-full object-cover"
                    src={user?.avatar?.secureUrl}
                  />
                ) : (
                  <div>{user?.name?.charAt(0).toUpperCase()}</div>
                )}
              </div>
              <h3 className="text-lg font-semibold">
                {user?.name || "User Name"}
              </h3>
              <p className="text-sm text-emerald-200">
                {user?.email || "user@example.com"}
              </p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            <nav>
              <ul className={`space-y-2 px-2 ${!sidebarOpen ? "mt-15" : ""}`}>
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.slug}
                      onClick={() => setActiveLink(item.name)}
                      className={`w-full flex items-center p-3 rounded-lg transition-all duration-200
                        ${
                          activeLink === item.name
                            ? "bg-emerald-700 text-white shadow-md"
                            : "text-emerald-100 hover:bg-emerald-800 hover:shadow-sm"
                        }`}
                    >
                      <span className="flex-shrink-0 pl-1">{item.icon}</span>
                      {sidebarOpen && <span className="ml-3">{item.name}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="px-2 py-2 border-t border-emerald-700">
            <LogoutBtn sidebarOpen={sidebarOpen} />
          </div>
        </div>
      </aside>

      <main className="pt-12 px-4 pb-4">
        <Outlet />
      </main>
    </div>
  );
}
