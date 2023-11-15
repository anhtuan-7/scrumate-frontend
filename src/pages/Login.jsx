import { Link } from "react-router-dom";
import { Button, Typography, Input } from "@material-tailwind/react";
import { Fragment } from "react";

const Login = () => {
  const error = false;

  let errorMessage = undefined;
  if (error)
    errorMessage = (
      <Typography className="text-red-500 text-sm p-1">{"Error"}</Typography>
    );

  return (
    <Fragment>
      <Typography variant="h3" className="mt-6">
        Login
      </Typography>
      <Typography color="gray" className="mt-1 text-md">
        Welcome back!
      </Typography>
      <form className="mt-6 mb-2">
        <div className="grid gap-6">
          <Input type="email" label="Email" required />
          <Input type="password" label="Password" required />
        </div>
        {errorMessage}
        <div className="p-1 mt-2 flex flex-col items-end">
          <Link
            to="/auth/forgot"
            className="text-sm text-blue-500 transition-colors hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </div>
        <Button className="mt-3 w-full">Login</Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don&apos;t have an account yet?{"  "}
          <Link
            to="/auth/signup"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign up
          </Link>
        </Typography>
      </form>
    </Fragment>
  );
};

export default Login;
