import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { RxGithubLogo } from "react-icons/rx";

const Auth = () => {
  return (
    <div className="min-h-screen flex justify-end bg-blue-img bg-cover">
      <div className="w-full lg:w-1/3 flex justify-center items-center bg-blue-gray-200/50 p-3 ">
        <div className="md:mx-10 p-10 bg-white w-full rounded-2xl shadow-lg">
          <Link to="/">
            <img src="/hires-logo.png" className="w-44" />
          </Link>
          <Outlet />

          <div className="w-full flex  items-center justify-center gap-2 mt-2">
            <Typography variant="paragraph" color="gray">
              Or continue with
            </Typography>
            <Button
              size="sm"
              variant="outlined"
              color="blue-gray"
              className="flex items-center justify-center gap-2"
            >
              <RxGithubLogo className="text-lg" />
              Github
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
