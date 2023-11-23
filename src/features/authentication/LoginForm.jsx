import { Button, Input, Typography } from '@material-tailwind/react';
import { Fragment, useEffect, useState } from 'react';
import { GoSync } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';

import Toast from '../../components/Toast';
import { useLoginMutation } from './authApi';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { data, error, isLoading }] = useLoginMutation();

  useEffect(() => {
    if (data) {
      const { user } = data.data;
      localStorage.setItem('user', JSON.stringify(user));
      Toast.fire({
        title: 'Login Successfully',
        icon: 'success',
        timer: '2000',
      });
      navigate('/app');
    }
  }, [data, navigate]);

  const handleLogin = () => {
    login({ email, password });
  };

  return (
    <Fragment>
      <Typography variant="h3" className="mt-6">
        Login
      </Typography>
      <Typography color="gray" className="text-md mt-1">
        Welcome back!
      </Typography>
      <form className="mb-2 mt-6">
        <div className="grid gap-6">
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
        </div>
        {error && (
          <Typography className="p-1 text-sm text-red-500">
            {error.data.message}
          </Typography>
        )}
        <div className="mt-2 flex flex-col items-end p-1">
          <Link
            to="/auth/forgot"
            className="text-sm text-blue-500 transition-colors hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </div>
        <Button className="mt-3 w-full" onClick={handleLogin}>
          <div className="flex justify-center">
            {isLoading ? <GoSync className="animate-spin" /> : 'Login'}
          </div>
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don&apos;t have an account yet?{'  '}
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

export default LoginForm;
