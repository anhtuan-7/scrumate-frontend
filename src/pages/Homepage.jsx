import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "@material-tailwind/react";
import Navbar from "../components/Navbar";
import useThunk from "../hooks/useThunk";
import { checkLogin } from "../store";

const Homepage = () => {
  const navigate = useNavigate();
  const [verifyToken, isLoading, error] = useThunk(checkLogin);

  const info = useSelector((state) => state.currentUser.info);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  let content;
  if (isLoading) content = <Spinner color="blue" className="h-12 w-12" />;
  else if (error) navigate("auth");
  else console.log(info);

  return (
    <div>
      <Navbar />
      <div>{content}</div>
    </div>
  );
};

export default Homepage;
