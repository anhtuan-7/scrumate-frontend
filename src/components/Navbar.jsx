import { Navbar as MaterialNavbar } from "@material-tailwind/react";
import NavUtil from "./NavUtil";

const Navbar = () => {
  return (
    <MaterialNavbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-10 py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <img src="/hires-logo.png" className="w-40" />
        <NavUtil />
      </div>
    </MaterialNavbar>
  );
};

export default Navbar;
