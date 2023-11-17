import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

const MainLayout = () => {
  return (
    <div className="w-full">
      <div className="min-h-screen overflow-x-scroll flex flex-col items-center text-blue-gray-900">
        <Navbar />
        <div className="flex w-full">
          <SideBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
