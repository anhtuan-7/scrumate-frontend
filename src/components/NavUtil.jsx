import { Link } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";

const NavUtil = () => {
  return (
    <div>
      <div className="flex items-center gap-x-1">
        <Link to="/auth/login">
          <Button variant="text" className="inline-block">
            <Typography variant="small">Login</Typography>
          </Button>
        </Link>
        <Link to="/auth/signup">
          <Button variant="filled" color="blue" className="inline-block">
            <Typography variant="small">Sign Up</Typography>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavUtil;