import React, { useContext } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
  Badge,
} from "@material-tailwind/react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";
import { useCart } from "../Context/CartContext.jsx";
import logo from "../../assets/logo_cafe.png";

const StickyNavbar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const { token, role, logout } = useContext(AuthContext);
  const { cart } = useCart();
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    return () => window.removeEventListener("resize", () => {});
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {["Home", "About", "Menu", "Reservation", "Contact"].map((item) => (
        <Typography
          key={item}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className="flex items-center text-[#5A3E36] hover:text-[#FF9130] transition-colors"
          >
            {item}
          </Link>
        </Typography>
      ))}
      {token ? (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <button
              onClick={logout}
              className="flex items-center text-[#5A3E36] hover:text-[#FF9130] transition-colors"
            >
              Logout
            </button>
          </Typography>
          {role === "admin" && (
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal"
            >
              <Link
                to="/admin-dashboard"
                className="flex items-center text-[#5A3E36] hover:text-[#FF9130] transition-colors"
              >
                Dashboard
              </Link>
            </Typography>
          )}
        </>
      ) : (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link
            to="/login"
            className="flex items-center text-[#5A3E36] hover:text-[#FF9130] transition-colors"
          >
            Login
          </Link>
        </Typography>
      )}
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-30 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-[#FDCB58]">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <img src={logo} alt="Eatery Cafe Logo" className="h-12 w-auto" />
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">{navList}</div>
          <Badge content={cartItemCount} invisible={cartItemCount === 0}>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:ml-4"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartIcon className="h-6 w-6 text-[#5A3E36]" />
            </IconButton>
          </Badge>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        <Button
          variant="gradient"
          size="sm"
          className="mb-2 bg-[#FF9130]"
          onClick={() => navigate("/cart")}
        >
          <span>Go to Cart</span>
        </Button>
      </Collapse>
    </Navbar>
  );
};

export default StickyNavbar;
