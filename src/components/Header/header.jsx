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

  const [openLogout, setOpenLogout] = useState(false);

  const handleLogoutDialog = () => setOpenLogout(!openLogout);

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

              <Button color="red" onClick={handleLogoutDialog}>
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


      <Dialog
        open={openProfile}
        handler={handleProfile}
        size="xs"
        className="bg-white rounded-[2rem] shadow-2xl overflow-hidden font-sans border-0"
      >
        {/* We use padding-0 on the body to allow the header banner to stretch edge-to-edge */}
        <DialogBody className="p-0">

          {/* Decorative Header Banner */}
          <div className="relative h-32 w-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 overflow-hidden">
            {/* Abstract Background pattern for the banner */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent blur-md"></div>

            {/* Close Button at top right */}
            <button
              onClick={handleProfile}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-md transition-all duration-200 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center px-8 pb-8">

            {/* Overlapping Avatar with Shadow Glow */}
            <div className="-mt-16 mb-4 relative z-10">
              {/* Soft shadow glow behind the avatar */}
              <div className="absolute inset-0 bg-indigo-500 rounded-full blur-md opacity-40 translate-y-2"></div>
              <Avatar
                size="xxl"
                src={user?.photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="Employee Profile"
                className="relative border-4 border-white shadow-xl bg-white w-28 h-28 object-cover"
              />
            </div>

            {/* Name & Designation */}
            <h2 className="text-2xl font-black text-slate-800 text-center mb-1 tracking-tight">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-indigo-500 font-bold text-xs tracking-widest uppercase mb-6 text-center">
              {user?.designation || "Team Member"}
            </p>

            {/* Structured Details Card */}
            <div className="w-full bg-slate-50/80 border border-slate-100 rounded-2xl p-5 space-y-4 shadow-inner">

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Staff ID</span>
                <span className="text-sm font-extrabold text-slate-800">{user?.staffId || "N/A"}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Department</span>
                <span className="text-sm font-bold text-slate-700">{user?.department || "N/A"}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email</span>
                <span className="text-sm font-bold text-slate-700 truncate max-w-[150px]">{user?.email || "N/A"}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Mobile</span>
                <span className="text-sm font-bold text-slate-700">{user?.mobile || "N/A"}</span>
              </div>

              {/* Role Badge - Visually separated from the rest */}
              <div className="flex items-center justify-between pt-3 mt-1 border-t border-slate-200/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">System Role</span>
                <span className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest">
                  {user?.role || "User"}
                </span>
              </div>

            </div>

            {/* Bottom Close Button */}
            <Button
              variant="text"
              color="blue-gray"
              className="mt-6 w-full rounded-xl font-bold tracking-wide hover:bg-slate-100 transition-colors"
              onClick={handleProfile}
            >
              Dismiss
            </Button>

          </div>
        </DialogBody>
      </Dialog>


      <Dialog
        open={openLogout}
        handler={handleLogoutDialog}
        size="xs"
        className="rounded-2xl"
      >
        <DialogHeader className="flex flex-col items-center gap-3 pb-2">

          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H9m4 8H7a2 2 0 01-2-2V6a2 2 0 012-2h6"
              />
            </svg>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">
              Logout
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Are you sure you want to logout from
              <br />
              <span className="font-semibold text-black">
                DEENOVA DIGITAL
              </span>
              ?
            </p>
          </div>

        </DialogHeader>

        <DialogFooter className="flex justify-center gap-3">

          <Button
            variant="outlined"
            color="blue-gray"
            onClick={handleLogoutDialog}
            className="rounded-lg px-6"
          >
            Cancel
          </Button>

          <Button
            color="red"
            className="rounded-lg px-6 shadow-lg"
            onClick={() => {
              handleLogoutDialog();
              handleLogout();
            }}
          >
            Yes, Logout
          </Button>

        </DialogFooter>
      </Dialog>
    </header>
  );
}