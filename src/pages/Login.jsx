import { Button } from "@material-tailwind/react";
import { useLoginMutation } from "../store";

const Login = () => {
  const [login, response] = useLoginMutation();

  return (
    <div>
      <Button
        onClick={() =>
          login({
            email: "anhtuan9702@gmail.com",
            password: "12345678",
          })
        }
      >
        Login
      </Button>
      <div>{!response.isLoading && console.log(response.data)}</div>
    </div>
  );
};

export default Login;
