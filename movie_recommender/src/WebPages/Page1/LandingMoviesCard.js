import React,{useState} from 'react'
import style from '../Styles/style.module.css'
import { TiStarFullOutline } from "react-icons/ti";
import { RiArrowLeftWideLine } from "react-icons/ri";
import { RiArrowRightWideLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const LandingMoviesCard = ({ popularMovieCard,topRatedMovieCard}) => {
    const [currentPosition1,setCurrentPosition1]=useState(0);
    const [currentPosition2,setCurrentPosition2]=useState(0);
    const toDetails=useNavigate(); //used to navigate to details of the selected movie

    //Navigating to details page function declaration
    const goToDetails=(movie)=>{
        toDetails("/Details",{state:{movieTitle:movie}});
    }

    const slide=(setCurrentPosition,currentPosition,btn,slidingContainer)=>{
        if(btn=="btn2"){
            if(currentPosition<125){
                slidingContainer.style.right=`${currentPosition+60}vw`;
                setCurrentPosition(currentPosition+60);
            }
           
        }else if(btn=="btn1"){
            if(currentPosition!=0){
                slidingContainer.style.right=`${currentPosition-60}vw`;
                setCurrentPosition(currentPosition-60);
            }
        }
    }
    const slideController=(id,btn)=>{
        let slidingContainer=document.getElementById(`${id}`);
        if(id=="slidingContainer1"){
            slide(setCurrentPosition1,currentPosition1,btn,slidingContainer);
        }else if(id=="slidingContainer2"){
            slide(setCurrentPosition2,currentPosition2,btn,slidingContainer)
        }
    }
    return (
        <>
            {/* creating the container to hold moviecards */}
            <div  className={style.cardHolder}>

                {/* creating the text to suggest users */}
                <div className={style.text1}>Most Popular Movies</div>

                {/* creating the main container which helps to handle the containing of movie cards  */}
                <div>
                    
                </div>
                <div className={style.totalContainer}>
                <button id='btn1' onClick={()=>{slideController("slidingContainer1","btn1")}}><RiArrowLeftWideLine /></button>
                <div id='mostPopular' className={style.cardContainerBasic}>
                <div className={style.slidingContainer} id='slidingContainer1'>
                {
                        popularMovieCard.map((curMovie, index) => {
                            {/* creating movie cards */ }
                            return (
                                <div key={index} >
                                    <div style={{cursor:"pointer"}} onClick={()=>{goToDetails(curMovie.title)}}>
                                        <div className={style.cardDetailsContainer}>
                                            <div className={style.card}>
                                                <img className={style.cardImage} src={`https://image.tmdb.org/t/p/w500${curMovie.poster_path}`} alt="" />
                                                <div className={style.rating}><TiStarFullOutline style={{ color: "#0e0707" }} /> {curMovie.vote_average}</div>
                                            </div>
                                            <div className={style.cardName}>{curMovie.title.length > 30 ? curMovie.title.slice(0, 30) + "..." : curMovie.title}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                    
                </div>
                <button id='btn2' onClick={()=>{slideController("slidingContainer1","btn2")}} ><RiArrowRightWideLine /></button>
                </div>
                

                <div className={style.text1}>Top Rated Movies</div>

            {/* creating the main container which helps to handle the containing of top rated movie cards  */}
                <div className={style.totalContainer}>
                <button id='btn1' onClick={()=>{slideController("slidingContainer2","btn1")}}><RiArrowLeftWideLine /></button>

                <div id='topRated' className={style.cardContainerBasic}>
                <div className={style.slidingContainer} id='slidingContainer2'>
                {
                         topRatedMovieCard.map((curMovie, index) => {
                            {/* creating movie cards */ }
                            return (
                                <div key={index} >
                                    <div  style={{cursor:"pointer"}}  onClick={()=>{goToDetails(curMovie.title)}}>
                                        <div className={style.cardDetailsContainer}>
                                        <div className={style.card}>
                                        <img className={style.cardImage} src={`https://image.tmdb.org/t/p/w500${curMovie.poster_path}`} alt="" />
                                        <div className={style.rating}><TiStarFullOutline style={{ color: "#0e0707" }} /> {curMovie.vote_average}</div>
                                        </div>
                                        <div className={style.cardName}>{curMovie.title.length > 30 ? curMovie.title.slice(0, 30) + "..." : curMovie.title}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                   
                </div>
                <button id='btn2' onClick={()=>{slideController("slidingContainer2","btn2")}}><RiArrowRightWideLine /></button>

                </div>
                
            </div>

        </>
    )
}

export default LandingMoviesCard
