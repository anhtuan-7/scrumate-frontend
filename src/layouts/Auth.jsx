import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-2 lg:grid-cols-3 bg-blue-img bg-cover">
      <div className="bg-center col-span-0 md:col-span-1 lg:col-span-2" />
      <div className="w-full bg-blue-gray-500/75 flex justify-center items-center">
        <div className="md:mx-10 p-10 bg-blue-gray-100 w-full lg:rounded-lg shadow-lg">
          <img src="/hires-logo.png" className="w-44" />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
