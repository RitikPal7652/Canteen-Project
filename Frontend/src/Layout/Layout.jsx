import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const Layout = () => {
  return (
    <>
      {/* Header and footer are static content and outlet is dynamic content. Outlet is pointing to children */}

      <Navbar />
      <div className="outlet">
      <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;



