import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="min-h-screen flex justify-end bg-blue-img bg-cover">
      <div className="w-full lg:w-1/3 flex justify-center items-center bg-blue-gray-200/50 p-3 ">
        <div className="md:mx-10 p-10 bg-white w-full rounded-2xl shadow-lg">
          <Link to="/">
            <img src="/hires-logo.png" className="w-44" />
          </Link>
          <Outlet />
          <div className="text-center">
            <Typography color="gray">Continue with Google</Typography>
            <Typography color="gray">Continue with Github</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
