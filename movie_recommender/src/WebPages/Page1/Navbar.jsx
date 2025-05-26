import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Search from "../Page3/Search.jsx";
import { FaHome } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";
import { BiMovie } from "react-icons/bi";
import { FaBloggerB, FaHeart } from "react-icons/fa"; // Added FaHeart
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../../store/userSlice";
import { IoGridOutline } from "react-icons/io5";






// creating the navbar component
// this component is used to create the navbar for the website
// it contains the logo, search bar, and the links to the different pages of the website
// it also contains the login button and the logout button

const Navbar = () => {
  const location = useLocation();

  // getting the user details
  const user = useSelector((state) => state?.user?.user);
  // dispatching the user details
  const dispatch = useDispatch();

  // calling the logout api
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method, // specify the method
      credentials: "include", // include cookies in the request
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message); // show a success message
      dispatch(setUserDetails(null)); // dispatch the user details
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  return (
    <>
      {/* creating the navbar */}
      <div className="bg-gradient-to-r from-custom-purple to-black w-screen h-14 shadow-[0px_0px_5px_5px_rgba(47,44,44,1)] flex justify-evenly fixed z-10 lg:text-lg sm:flex-col sm:h-auto sm:py-2">
        {/* creating to parts of the navbar as subnav1 and subnav2 */}
        <div className="w-6/12 h-full flex justify-evenly items-center lg:w-7/12 sm:w-full sm:flex-col sm:py-2 sm:gap-2">
          <a href="/">
            <div
              className="inline-block ml-4 text-2xl h-8 w-20 flex justify-center items-center cursor-pointer hover:scale-110 transition-all ease-in-out duration-200 sm:text-xl sm:ml-0"
              style={{
                background: "url(./images/logo.png) no-repeat center / cover",
              }}
            ></div>
          </a>
          <Search />
        </div>
        <ul className="w-5/12 h-full text-xs flex justify-evenly items-center lg:w-5/12 sm:w-full sm:flex-wrap sm:justify-center sm:gap-1 sm:text-[0.7em] sm:flex-col sm:gap-0">
          <li className="inline-block sm:px-2 sm:py-1">
            {" "}
            <Link
              className={`relative no-underline shadow-text-custom z-0 transition-colors duration-300 ease-in-out ${
                location.pathname === "/Upgrade"
                  ? "text-fuchsia-500"
                  : "text-gray-100 hover:text-pink-600"
              }`}
              to="/Upgrade"
            >
              <IoGridOutline
                className="relative top-px text-[1.2em] -right-1"
              />
              Upgrade
            </Link>{" "}
          </li>

          <li className="inline-block sm:px-2 sm:py-1">
            {" "}
            <Link
              className={`relative no-underline shadow-text-custom z-0 transition-colors duration-300 ease-in-out ${
                location.pathname === "/" && location.hash === ""
                  ? "text-fuchsia-500"
                  : "text-gray-100 hover:text-pink-600"
              }`}
              to="/"
            >
              <FaHome
                className="relative top-px text-[1.3em] -right-1"
              />
              Home
            </Link>{" "}
          </li>

          <li className="inline-block sm:px-2 sm:py-1">
            {" "}
            <HashLink
              smooth
              to="/#mostPopular"
              className={`relative no-underline shadow-text-custom z-0 transition-colors duration-300 ease-in-out ${
                location.hash === "#mostPopular"
                  ? "text-fuchsia-500"
                  : "text-gray-100 hover:text-pink-600"
              }`}
            >
              <TbMovie
                className="relative top-px text-[1.3em] -right-1"
              />
              Most Popular
            </HashLink>{" "}
          </li>
          <li className="inline-block sm:px-2 sm:py-1">
            {" "}
            <HashLink
              smooth
              to="/#topRated"
              className={`relative no-underline shadow-text-custom z-0 transition-colors duration-300 ease-in-out ${
                location.hash === "#topRated"
                  ? "text-fuchsia-500"
                  : "text-gray-100 hover:text-pink-600"
              }`}
            >
              <BiMovie
                className="relative top-px text-[1.3em] -right-1"
              />
              Top Rated
            </HashLink>{" "}
          </li>
          <li className="inline-block sm:px-2 sm:py-1">
            {" "}
            <Link
              className={`relative no-underline shadow-text-custom z-0 transition-colors duration-300 ease-in-out ${
                location.pathname === "/Blogs"
                  ? "text-fuchsia-500"
                  : "text-gray-100 hover:text-pink-600"
              }`}
              to="/Blogs"
            >
              <FaBloggerB
                className="relative top-px text-[1.2em] -right-1"
              />
              Blogs
            </Link>{" "}
          </li>

          <li className="inline-block sm:px-2 sm:py-1">
            {
              // checking if the user is logged in
              user?._id ? (
                <div className="relative no-underline text-gray-100 shadow-text-custom z-0 transition-colors duration-300 ease-in-out hover:text-pink-600" onClick={handleLogout}>
                  <div className="flex justify-center items-center h-full">
                    <p style={{ cursor: "pointer", marginRight: "1em" }}>
                      Logout
                    </p>
                    {user?.profilePic ? (
                      <img
                        src={user?.profilePic}
                        className="rounded-full w-9 h-9 mr-4 sm:w-8 sm:h-8 sm:mr-2"
                        alt={user?.name}
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              ) : (
                // if the user is not logged in
                <Link
                  className={`relative no-underline shadow-text-custom z-0 transition-colors duration-300 ease-in-out ${
                    location.pathname === "/Login"
                      ? "text-fuchsia-500"
                      : "text-gray-100 hover:text-pink-600"
                  }`}
                  to="/Login"
                >
                  <div className="flex justify-center items-center h-full">
                    <FaCircleUser
                      className="relative top-[0.7px] text-[1.5em] -right-1 rounded-full"
                    />
                    <p>Login</p>
                  </div>
                </Link>
              )
            }
          </li>
          
          {/* Conditionally show Dashboard if user is logged in */}
          {user?._id && (
            <li className="inline-block sm:px-2 sm:py-1">
              <Link
                className={`relative no-underline shadow-text-custom z-0 transition-colors duration-300 ease-in-out ${
                  location.pathname === "/dashboard"
                    ? "text-fuchsia-500"
                    : "text-gray-100 hover:text-pink-600"
                }`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}
          {/* Conditionally show Wishlist if user is logged in */}
          {user?._id && (
            <li className="inline-block sm:px-2 sm:py-1">
              <Link
                className={`relative no-underline shadow-text-custom z-0 transition-colors duration-300 ease-in-out ${
                  location.pathname === "/wishlist"
                    ? "text-fuchsia-500"
                    : "text-gray-100 hover:text-pink-600"
                }`}
                to="/wishlist"
              >
                <FaHeart
                  className="relative top-px text-[1.2em] -right-1"
                />
                Wishlist
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;