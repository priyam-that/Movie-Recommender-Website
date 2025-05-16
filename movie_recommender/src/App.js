import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Main from "./WebPages/Page1/Main";
import Navbar from "./WebPages/Page1/Navbar";
import FilterCards from "./WebPages/Page2/FilterCards";
import Login from "./WebPages/Page4/Login";
import ForgotPass from "./WebPages/Page4/ForgotPass";
import SignUp from "./WebPages/Page4/SignUp";
import Details from "./WebPages/Page6/Details";
import Blogs from "./WebPages/Page7/Blogs";
import Footer from "./WebPages/Page8/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToView from "./ScrollToView";
import SummaryApi from "./common";
import Context from "./context";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import Dashboard from "./WebPages/Page4/Dashboard";
import Upgrade from "./WebPages/Page9/Upgrade.jsx";
const App = () => {
  const [showFooter, setShowFooter] = useState(false);
  const dispatch = useDispatch();

  // fetching user details
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include", // include cookies in the request
    });
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data)); //dispatches the setUserDetails action to update the Redux store with user information
    }
  };
  const location = useLocation();

  useEffect(() => {
    // userDetails
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (location.pathname === "/Login" || location.pathname === "/Signup") {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [location.pathname]);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, //user details fetch
        }}
      >
        <ToastContainer />
        <>
          <Navbar />
          <ScrollToView />
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route exact path="/FilterCards" element={<FilterCards />}></Route>
            <Route exact path="/Login" element={<Login />}></Route>
            <Route exact path="/SignUp" element={<SignUp />}></Route>
            <Route exact path="/ForgotPass" element={<ForgotPass />}></Route>
            <Route exact path="/Details" element={<Details />}></Route>
            <Route exact path="/Blogs" element={<Blogs />}></Route>
            <Route exact path="/Dashboard" element={<Dashboard />}></Route>
            <Route exact path="/Upgrade" element={<Upgrade />}></Route>

            {/* <Route exact path='/' element={<Main/>}></Route> */}
          </Routes>
          {showFooter && <Footer />}
        </>
      </Context.Provider>
    </>
  );
};

export default App;
