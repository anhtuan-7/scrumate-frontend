import Navbar from "../components/Navbar";

const AppList = () => {
  return (
    <div>
      <div className="w-full">
        <div className="min-h-screen overflow-x-scroll flex flex-col items-center text-blue-gray-900">
          <Navbar />
        </div>
      </div>
      Group & Project List
    </div>
  );
};

export default AppList;
