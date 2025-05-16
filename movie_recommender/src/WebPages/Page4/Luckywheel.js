import React,{useState} from 'react'
import style from "../Styles/wheelStyle.module.css"
import SpinWheel from './SpinWheel';
import { ImCross } from "react-icons/im";

const Luckywheel = ({ userId, updateUserTokens ,setShowSpinner }) => {
 
  const [rotation, setRotation] = useState(0);
  const [reward, setReward] = useState(null);
  const [rotating,setRotating]=useState(false);
  const rewards = ["1000", "2000", "5000", "3000", "6000", "9999","2500","4000"];
  const numSegments = rewards.length;
  const segmentAngle = 360 / numSegments;

  const spinWheel = () => {
    if(rotating)
      return;

    const today = new Date().toISOString().split("T")[0];
    const storageKey = `spinCount_${userId}`;
    const data = JSON.parse(localStorage.getItem(storageKey) || "{}");
  
    if (data.date !== today) {
      // New day, reset count
      localStorage.setItem(storageKey, JSON.stringify({ date: today, count: 1 }));
    } else if (data.count >= 1000) {
      alert("You have already used all 3 spins for today.");
      return;
    } else {
      // Increment spin count
      localStorage.setItem(storageKey, JSON.stringify({ date: today, count: data.count + 1 }));
    }



    setRotating(true);
    const randomRotation = Math.floor(Math.random() * 360) + 2880; // 5 full spins + random angle
    const newRotation = rotation + randomRotation;
    setRotation(newRotation);

    // Wait for the spin to complete, then calculate the reward
    setTimeout(() => {
      const finalRotation = newRotation % 360;
      const winningIndex = Math.floor((360 - finalRotation) / segmentAngle) % numSegments;
      setReward(Number(rewards[winningIndex]));
      setRotating(false);
    }, 5000); // Match CSS transition duration
  };

  const closeWheel=()=>{
    setShowSpinner(false);
  }

  return (
    <>
    <div className={style.bodyDoub} onClick={()=>{closeWheel()}}></div>
    <div style={{background:`url("./images/WheelBg.jpg") no-repeat center / cover`}} className={style.container}>
      <div className={style.wheelContainer}>
        {/* Pointer at the top */}
        <div className={style.pointer}></div>
        
        {/* Wheel */}
        <div className={style.wheel} style={{ transform: `rotate(${rotation-90}deg)` }}>
          {rewards.map((prize, index) => {
          return(
            <>
               <div
              key={index}
              className={style.segment}
              style={{
                background:["goldenRod", "linear-gradient(60deg,rgb(0, 47, 255), rgb(73, 55, 233), rgb(7, 5, 60))", "linear-gradient(60deg,rgb(69, 244, 0), rgb(38, 218, 68), rgb(8, 72, 11))", "linear-gradient(60deg,rgb(255, 0, 230), rgb(233, 45, 208), rgb(88, 10, 70))", "linear-gradient(60deg,rgb(200, 255, 0), rgb(225, 241, 44), rgb(72, 61, 7))", "linear-gradient(60deg,rgb(0, 247, 255), rgb(40, 203, 228), rgb(8, 56, 56))","linear-gradient(60deg,rgb(255, 0, 136),rgb(246, 43, 161), rgb(93, 4, 55))","linear-gradient(60deg,rgb(252, 252, 252), rgb(240, 239, 233), rgb(0, 0, 0))"][index],
                transform: `rotate(${index * segmentAngle}deg)`,
              }}
            ><div className={style.text}>{prize}</div></div>
            </>
           
            
          )
          })}
        </div>
      </div>

      {/* Spin Button */}
      <button onClick={spinWheel} className={style.spinButton}>
        Spin
      </button>

      {/* Reward Display */}
      <div className={style.reward}>{reward && `Congratulation ! You Won: ${reward} tokens`}</div>
      <SpinWheel userId={userId}  updateUserTokens={updateUserTokens} reward={reward} setReward={setReward} />
      <div onClick={()=>{closeWheel()}} className={style.backButton}><ImCross /></div>
    </div>
    </>
    

  );
}

export default Luckywheel
