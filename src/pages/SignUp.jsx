import { Link } from 'react-router-dom';
import { Button, Typography, Input } from '@material-tailwind/react';
import { Fragment } from 'react';

const SignUp = () => {
  const error = false;

  let errorMessage = undefined;
  if (error)
    errorMessage = (
      <Typography className="p-1 text-sm text-red-500">{'Error'}</Typography>
    );

  return (
    <Fragment>
      <Typography variant="h3" className="mt-6">
        Sign Up
      </Typography>
      <Typography color="gray" className="text-md mt-1">
        Welcome to Scrumate!
      </Typography>
      <form className="mb-2 mt-6">
        <div className="grid gap-4">
          <Input type="text" label="Name" required />
          <Input type="email" label="Email" required />
          <Input type="password" label="Password" required />
          <Input type="confirmPassword" label="Confirm Password" required />
        </div>
        {errorMessage}
        <Button className="mt-4 w-full">Sign Up</Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{'  '}
          <Link
            to="/auth/login"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Login
          </Link>
        </Typography>
      </form>
    </Fragment>
  );
};

export default SignUp;
