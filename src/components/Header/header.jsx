import React, { useState, useEffect } from "react";
import { Avatar, Button, Collapse, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '/Users/alfaj/Documents/My Web-Sites/deenovaSoftware/src/assets/images/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Login/loginSlice";

export function Header() {

  const [openProfile, setOpenProfile] = useState(false);

  const handleProfile = () => setOpenProfile(!openProfile);
  const user = useSelector((state) => state.auth.user);

  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (state) => state.auth.success
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Automatically close mobile menu if screen sizes scale up past mobile breakpoints
  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 1024 && setOpenNav(false));
  }, []);

  // Helper to visually flag the current page link
  const isActive = (path) => location.pathname === path;

  // Shared Nav Links Array for consistency
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Staff", path: "/staff" },
    { title: "Products", path: "/product" },
    { title: "Payments", path: "/payments" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className=" mx-auto flex items-center justify-between h-20 px-4 md:px-6">

        {/* Logo Configuration */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br  flex items-center justify-center shadow-md shadow-blue-200 transition-transform group-hover:scale-105">
            <span className="text-white text-xl font-black tracking-tighter">
              <img src={logo} alt="" />
            </span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 leading-none mb-0.5">
              DEENOVA DIGITAL
            </h1>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none">
              Software Solutions
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.path} className="relative py-1">
                <Link
                  to={link.path}
                  className={`text-sm font-semibold transition-colors duration-200 ${isActive(link.path) ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                    }`}
                >
                  {link.title}
                </Link>
                {/* Underline indicators for active states */}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleProfile}
                className="rounded-full hover:bg-gray-100 p-1 transition"
              >
                <Avatar
                  size="md"
                  src={
                    user?.photo ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profile"
                />
              </button>

              <Button color="red" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/">
              <Button variant="outlined">Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Action Trigger Icon */}
        <IconButton
          variant="text"
          className="ml-auto h-9 w-9 text-gray-800 hover:bg-gray-100 lg:hidden rounded-lg"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </IconButton>

      </div>

      {/* Mobile Collapse Navigation Menu Drawer */}
      <Collapse open={openNav} className="bg-white border-t border-gray-100 px-6 lg:hidden">
        <div className="container mx-auto py-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setOpenNav(false)}
                  className={`block py-2 text-sm font-bold rounded-lg px-3 transition-colors ${isActive(link.path) ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="border-gray-100 my-1" />

          {/* Action Mobile Drawer Buttons */}
          <div className="flex flex-col gap-2 pb-2">
            <Link to="/login" onClick={() => setOpenNav(false)} className="w-full">
              <Button variant="outlined" size="sm" color="blue-gray" className="w-full capitalize font-bold rounded-xl">
                Login
              </Button>
            </Link>
            <Link to="/quote" onClick={() => setOpenNav(false)} className="w-full">
              <Button color="blue" size="sm" className="w-full capitalize font-bold rounded-xl shadow-md">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      </Collapse>
            

      <Dialog open={openProfile} handler={handleProfile} size="sm">
        <DialogHeader className="justify-center">
          Employee Profile
        </DialogHeader>

        <DialogBody divider>
          <div className="flex flex-col items-center">

            <Avatar
              size="xxl"
              src={
                user?.photo ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
            />

            <h2 className="mt-4 text-xl font-bold">
              {user?.firstName} {user?.lastName}
            </h2>

            <p className="text-gray-500">
              {user?.designation}
            </p>

            <div className="w-full mt-6 space-y-3">

              <div className="flex justify-between">
                <span className="font-semibold">Staff ID</span>
                <span>{user?.staffId}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Department</span>
                <span>{user?.department}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Email</span>
                <span>{user?.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Mobile</span>
                <span>{user?.mobile}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Role</span>
                <span>{user?.role}</span>
              </div>

            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleProfile}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </header>
  );
}