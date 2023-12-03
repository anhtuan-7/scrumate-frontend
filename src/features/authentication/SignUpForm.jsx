import { Button, Input, Typography } from '@material-tailwind/react';
import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { GoSync } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Toast from '../../components/Toast';
import { useSignUpMutation } from './authApi';
import { doLogin, setUser } from './statusSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [signUp, { data, error, isLoading }] = useSignUpMutation();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.data.user));
      dispatch(doLogin());
      Toast.fire({
        title: 'Sign Up Successfully',
        icon: 'success',
        timer: '2000',
      });
      navigate('/app/groups');
    }
  }, [data, navigate, dispatch]);

  const handleSignUp = () => {
    signUp({ name, email, password, confirmPassword });
  };

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
          <Input
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <Typography className="p-1 text-sm text-red-500">
            {error.data ? error.data.message : error.error}
          </Typography>
        )}
        <Button className="mt-3 w-full" onClick={handleSignUp}>
          <div className="flex justify-center">
            {isLoading ? <GoSync className="animate-spin" /> : 'Sign Up'}
          </div>
        </Button>
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
