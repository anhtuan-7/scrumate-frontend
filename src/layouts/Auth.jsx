import { Button, Typography } from '@material-tailwind/react';
import { RxGithubLogo } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="flex min-h-screen justify-end bg-blue-img bg-cover">
      <div className="flex w-full items-center justify-center bg-blue-gray-200/50 p-3 lg:w-1/3">
        <div className="w-full min-w-max rounded-2xl bg-white p-10 md:mx-10">
          <Link to="/">
            <img src="/hires-logo.png" className="w-44" />
          </Link>
          <Outlet />
          <div className="mt-2 flex w-full items-center justify-center gap-2 ">
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
