import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography, Input } from "@material-tailwind/react";
import Toast from "../components/Toast";
import { GoSync } from "react-icons/go";
import useThunk from "../hooks/useThunk";
import { login } from "../store";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.currentUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doLogin, isLoading, error] = useThunk(login);

  useEffect(() => {
    if (user) {
      Toast.fire({
        title: "Login Successfully",
        icon: "success",
        timer: "2000",
      });
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = () => {
    doLogin({ email, password });
  };

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
          <Typography className="text-red-500 text-sm p-1">
            {error.message}
          </Typography>
        )}
        <div className="p-1 mt-2 flex flex-col items-end">
          <Link
            to="/auth/forgot"
            className="text-sm text-blue-500 transition-colors hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </div>
        <Button className="mt-3 w-full" onClick={handleLogin}>
          <div className="flex justify-center">
            {isLoading ? <GoSync className="animate-spin" /> : "Login"}
          </div>
        </Button>
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
