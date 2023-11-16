import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="min-h-screen flex justify-end bg-blue-img bg-cover">
      <div className="w-full lg:w-1/3 p-3 lg:p-10 bg-blue-gray-500/75 flex justify-center items-center">
        <div className="md:mx-10 p-10 bg-blue-gray-100 w-full rounded-2xl shadow-lg">
          <Link to="/">
            <img src="/hires-logo.png" className="w-44" />
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
