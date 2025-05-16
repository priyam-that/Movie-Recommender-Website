import React, { useEffect, useState } from "react";
import axios from "axios";

const SpinWheel = ({ userId, updateUserTokens, reward,setReward}) => {
  const [spinning, setSpinning] = useState(false);

  const spinWheel = async (reward) => {
    if (spinning) return; // Prevent multiple spins
    setSpinning(true);

    // Select a random reward from tokenRewards array
    const tokensWon = reward;
    
    try {
      console.log("Spinning the wheel... Winning tokens:", tokensWon); // Debugging log

      const response = await axios.post(
        "http://localhost:7070/api/update-tokens",
        { userId, tokensWon },
        { withCredentials: true }
      );

      console.log("API Response:", response.data); // Debugging log

      // Update user's tokens in the dashboard
      updateUserTokens(response.data.tokens);
    } catch (error) {
      console.error("Error updating tokens:", error);
    }

    setTimeout(() => {
      setSpinning(false); // Allow another spin after animation
      if (typeof setReward === "function") {
        setReward(null);
      }
    }, 5000); // Simulate spin duration
  };

useEffect(()=>{
  if (reward !== null && typeof setReward === "function") {
    spinWheel(reward);
  }
},[reward])

};




export default SpinWheel;
