import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

export const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
