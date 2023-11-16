import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

const MainLayout = () => {
  return (
    <div className="w-full bg-blue-grad bg-cover">
      <div className="min-h-screen bg-gray-600/50 flex flex-col items-center justify-between text-gray-200">
        <Navbar />
        <div>
          <SideBar />
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
