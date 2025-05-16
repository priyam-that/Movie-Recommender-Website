import React from 'react'
import ReactPlayer from 'react-player'
import style from '../Styles/style.module.css'
const Trailer = ({setShowTrailer,imageTrailerUrl}) => {

//closing the trailer on clicking the close button 
const trailerClose=()=>{
  setShowTrailer(false);
}

  return (
    <>
    {/* blurring the background when trailer is shown */}
    <div onClick={()=>{setShowTrailer(false)}} className={style.bodyMask} ></div>

    {/* creating the trailer box  */}
    <div className={style.videoPlayer}>

        {/* showing the trailer */}
        <ReactPlayer style={{background:"black"}} url={`${imageTrailerUrl}`} height="30vw" width="50vw" controls playing loop light/>

        {/* creating the close button */}
        <button className={style.closeBtn} onClick={()=>{trailerClose()}}>Close</button>
    </div>
  
    </>
  )
}

export default Trailer
