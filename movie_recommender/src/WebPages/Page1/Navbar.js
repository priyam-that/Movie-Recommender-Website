import React from "react";
import style from "../Styles/style.module.css";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Search from "../Page3/Search";
import { FaHome } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";
import { BiMovie } from "react-icons/bi";
import { FaBloggerB } from "react-icons/fa";
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
      <div className={style.navbar}>
        {/* creating to parts of the navbar as subnav1 and subnav2 */}
        <div className={style.subNav1}>
          <a href="/">
            <div
              className={`${style.navItems} ${style.logo}`}
              style={{
                background: "url(./images/logo.png) no-repeat center / cover",
              }}
            ></div>
          </a>
          <Search />
        </div>
        <ul className={style.subNav2}>
          <li className={style.navItems}>
            {" "}
            <Link
              className={
                location.pathname === "/Upgrade"
                  ? style.activeNav
                  : style.navAnchor
              }
              to="/Upgrade"
            >
              <IoGridOutline
                style={{
                  position: "relative",
                  top: "2px",
                  fontSize: "1.2em",
                  right: "5px",
                }}
              />
              Upgrade
            </Link>{" "}
          </li>

          <li className={style.navItems}>
            {" "}
            <Link
              className={
                location.pathname === "/" && location.hash === ""
                  ? style.activeNav
                  : style.navAnchor
              }
              to="/"
            >
              <FaHome
                style={{
                  position: "relative",
                  top: "2px",
                  fontSize: "1.3em",
                  right: "5px",
                }}
              />
              Home
            </Link>{" "}
          </li>

          <li className={style.navItems}>
            {" "}
            <HashLink
              smooth
              to="/#mostPopular"
              className={
                location.hash === "#mostPopular"
                  ? style.activeNav
                  : style.navAnchor
              }
            >
              <TbMovie
                style={{
                  position: "relative",
                  top: "2px",
                  fontSize: "1.3em",
                  right: "5px",
                }}
              />
              Most Popular
            </HashLink>{" "}
          </li>
          <li className={style.navItems}>
            {" "}
            <HashLink
              smooth
              to="/#topRated"
              className={
                location.hash === "#topRated"
                  ? style.activeNav
                  : style.navAnchor
              }
            >
              <BiMovie
                style={{
                  position: "relative",
                  top: "2px",
                  fontSize: "1.3em",
                  right: "5px",
                }}
              />
              Top Rated
            </HashLink>{" "}
          </li>
          <li className={style.navItems}>
            {" "}
            <Link
              className={
                location.pathname === "/Blogs"
                  ? style.activeNav
                  : style.navAnchor
              }
              to="/Blogs"
            >
              <FaBloggerB
                style={{
                  position: "relative",
                  top: "2px",
                  fontSize: "1.2em",
                  right: "5px",
                }}
              />
              Blogs
            </Link>{" "}
          </li>

          <li className={style.navItems}>
            {
              // checking if the user is logged in
              user?._id ? (
                <div className={style.navAnchor} onClick={handleLogout}>
                  <div className={style.userDiv}>
                    <p style={{ cursor: "pointer", marginRight: "1em" }}>
                      Logout
                    </p>
                    {user?.profilePic ? (
                      <img
                        src={user?.profilePic}
                        className={style.NavbarProfilePic}
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
                  className={
                    location.pathname === "/Login"
                      ? style.activeNav
                      : style.navAnchor
                  }
                  to="/Login"
                >
                  <div className={style.userDiv}>
                    <FaCircleUser
                      style={{
                        position: "relative",
                        top: "0.7px",
                        fontSize: "1.5em",
                        right: "5px",
                        borderRadius: "50%",
                      }}
                    />
                    <p>Login</p>
                  </div>
                </Link>
              )
            }
          </li>
          
          {/* Conditionally show Dashboard if user is logged in */}
          {user?._id && (
            <li className={style.navItems}>
              <Link
                className={
                  location.pathname === "/dashboard"
                    ? style.activeNav
                    : style.navAnchor
                }
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;