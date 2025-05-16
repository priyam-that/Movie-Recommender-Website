import React, { useEffect, useState } from 'react'
import style from '../Styles/style.module.css'
import { TiStarFullOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
const Recommendations = ({ recommendedMovies }) => {

  const [recommendationSuccess, setRecommendationSuccess] = useState(false);//used to know the recommendation for the movie is available or not

  const toDetails = useNavigate();//used to navigate to details page
  //function to go to details page
  const goToDetails = (movie) => {
    toDetails("/Details", { state: { movieTitle: movie } });
  }

  //setting the recommended success if recommendation available
  useEffect(() => {
    if (recommendedMovies[0] !== undefined) {
      setRecommendationSuccess(true);
    }
  }, [recommendedMovies])

  return (
    <>
    {/* creating the container that contains the suggesting text and the cards */}
      <div className={style.recommendedCardContainer}>
        <div className={style.text1} >Recommended Movies</div>

        {/* creating the main container which helps to handle the containing of recommended movie cards  */}
        <div className={style.cardContainer}>
          {!recommendationSuccess && <>
            <div style={{ fontSize: "1em", color: "aliceblue", justifyContent: "center", margin: "2em 0em" }}>Sorry, The Recommendations for this Movie is currently unavailable.</div>
          </>}
          {
            recommendationSuccess &&
            recommendedMovies.map((curMovie, index) => {
              {/* creating movie cards */ }
              return (
                curMovie != undefined && curMovie && curMovie.title && curMovie.poster_path!=null && curMovie.vote_average >= 0 && <div key={index} >
                  {
                     <>
                      <div style={{ cursor: "pointer" }} onClick={() => { goToDetails(curMovie.title) }}>
                        <div className={style.cardDetailsContainer}>
                          <div className={style.card}>

                            <img className={style.cardImage} src={`https://image.tmdb.org/t/p/w500${curMovie.poster_path}`} alt="..." />
                            <div className={style.rating}><TiStarFullOutline style={{ color: "#0e0707" }} /> {curMovie.vote_average}</div>
                          </div>
                          <div className={style.cardName}>{curMovie.title.length > 25 ? curMovie.title.slice(0, 25) + "..." : curMovie.title}</div>
                        </div>
                      </div>
                    </>
                  }

                </div>
              )
            })
          }
        </div>
      </div>


    </>
  )
}

export default Recommendations
