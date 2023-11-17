import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

const MainLayout = () => {
  return (
    <div className="w-full">
      <div className="min-h-screen overflow-scroll flex flex-col items-center text-blue-gray-900">
        <Navbar />
        <div className="grid grid-cols-6 w-full">
          <div className="cols-span-1">
            <SideBar />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
