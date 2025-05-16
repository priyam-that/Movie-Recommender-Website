import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Luckywheel from "./Luckywheel";
import style from '../Styles/userDashboard.module.css';
import imageTobase64 from "../../helpers/imageTobase64";

const Dashboard = ({setShowDash}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSpinner,setShowSpinner]=useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:7070/api/user-details", {
          withCredentials: true, // Ensures cookies are sent
        });
        setUser(response.data.data); // Store user details
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/Login"); // Redirect to login if not authenticated
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle profile picture upload
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64Image = await imageTobase64(file);
    setNewProfilePic(base64Image);
  };

  // Update profile picture in the database
  const handleUpdateProfilePic = async () => {
    if (!newProfilePic) return;

    try {
      const response = await axios.put(
        "http://localhost:7070/api/update-profile-pic",
        { profilePic: newProfilePic },
        { withCredentials: true }
      );

      if (response.data.success) {
        setUser((prev) => ({ ...prev, profilePic: newProfilePic }));
        setNewProfilePic(null);
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:7070/api/userLogout", { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
 const showWheel=()=>{
  if(showSpinner){
    setShowSpinner(false);
  }else{
    setShowSpinner(true);
  }
 }
 const closeDashboard=()=>{
  setShowDash(false);
 }
  return (
    <>
    { user &&
    <>
  <div style={{position:"fixed",top:"3.5em",bottom:"0",left:"0",right:"0",zIndex:"11"}} onClick={()=>{closeDashboard()}}></div>
      <div className={style.userDashboard}>
        
          <div className={style.dashboardContent}>
            {/* Profile Picture */}
            <div className={style.profileSection}>
              <img src={user.profilePic || "./images/default-profile.png"} alt="Profile" className={style.profilePic} />
              <label className={style.uploadBtn}>
                Upload New Photo
                <input type="file" onChange={handleUploadPic} />
              </label>
              {newProfilePic && <button onClick={handleUpdateProfilePic}>Update Profile Picture</button>}
            </div>

            {/* User Info */}
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Tokens:</strong> {user.tokens}</p>
            <div style={{cursor:"pointer" , backgroundColor:"grey"}} onClick={()=>{showWheel()}}>Lucky Wheel</div>
            

            {/* Logout Button */}
            <button onClick={handleLogout} className={style.logoutBtn}>Logout</button>
          </div>
        
      </div>
      </>
    }
      {/* Spin Wheel */}
      {user? showSpinner&&<Luckywheel setShowSpinner={setShowSpinner} userId={user._id} updateUserTokens={(tokens) => setUser({ ...user, tokens })}/>:<div></div>}
    </>
  );
};

export default Dashboard;
