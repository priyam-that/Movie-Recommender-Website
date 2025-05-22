import React, { useEffect, useRef, useState } from "react";
import style from "../Styles/detailsStyle.module.css";
import ReactPlayer from "react-player";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import { FaCalendarDays } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Recommendations from "./Recommendations";
import Loader from "./Loader";
import Comment from "./Comment";
import Watchmovie from "./Watchmovie";
import { addToWishlistAPI } from "../../helpers/apiHelper.js";

const Details = () => {
  const getTitle = useLocation(); //used to get the passed propswhen redirected
  const [movieName, setMovieName] = useState(""); //used to get the movie name that is selected to watch the details

  //setting the movie name which is selected
  useEffect(() => {
    setMovieName(getTitle.state.movieTitle);
  });

  const [content, setContent] = useState({}); //used to store the details of the movie
  const [showPlayer, setShowPlayer] = useState(false); //used to handle the trailer need to show or not
  const [showPoster, setShowPoster] = useState(true); //used to show poster or not
  const [btnClicked, setBtnClicked] = useState(false); //used to set the classname of the poster or trailer
  const [trailer, setTrailer] = useState(""); //used to store the trailer link
  const [directors, setDirectors] = useState([]); //used to store the directors
  const [cast, setCast] = useState([]); //used to store the casts
  const [showMoreBtn, setShowMoreBtn] = useState(true); //used to show more casts
  const [showLessBtn, setShowLessBtn] = useState(false); //used to show less number of casts
  const [recommendedMovies, setRecommendedMovies] = useState([]); //used to store recommended movie names
  const [loading, setLoading] = useState(false); //used to show the loader or not
  const [isWishlisted, setIsWishlisted] = useState(false);
  const borderRef = useRef(); //used to get the reference of outline of the poster
  const [user, setUser] = useState(null);
  const api_key = "1131ab6f7e96fcc1c729699cbf8b22cc";

  //function to manage the transition from poster to player
  const manage = () => {
    setBtnClicked(true);
    borderRef.current.style.animation = "none";
    borderRef.current.style.background = "none";
    setTimeout(() => {
      setShowPlayer(true);
      setShowPoster(false);
    }, 2000);
  };

  //function to close the trailer
  const closeTrailer = () => {
    setBtnClicked(false);
    setShowPlayer(false);
    setShowPoster(true);
  };

  //fetching all about the movie
  const fetchDetails = async () => {
    try {
      // showing the loader till full details is loaded
      setLoading(true);

      //fetching by the moviename to get the id of the movie
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movieName}`
      );
      const data = await res.json();
      const movieId = data.results[0].id;

      //fetching by the movie id that is got to get all details about the movie
      const detailsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&append_to_response=videos`
      );
      const detailsData = await detailsRes.json();
      setContent(detailsData); //storing the data of the details in the dedicated state variable

      //fetching the cast and crew
      const castRes = await fetch(
        ` https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}`
      );
      const castData = await castRes.json();

      setCast(castData.cast); //storing the cast in the dedicated state variable
      setShowMoreBtn(true);
      setShowLessBtn(false);

      setDirectors(
        castData.crew.filter((e) => {
          return e.job == "Director" && e.department == "Directing";
        })
      ); //storing the directors in the dedicated state variable

      //separating the trailer from the received object
      const trailers = detailsData.videos.results.filter((vid) => {
        return vid.type == "Trailer";
      });
      if (trailers[0]) {
        setTrailer(`https://www.youtube.com/watch?v=${trailers[0].key}`); //storing the trailer link in the dedicated state variable
      }

      //fetching the recommendations of the movie using the flask api
      const recommendationResponse = await fetch(
        `/api/similarity/${movieName}`
      );
      const recommendationData = await recommendationResponse.json();
      const recomMovies = recommendationData.movies;
      const recomMovieArr = [];
      for (const movie of recomMovies) {
        //fetching details of each recommended movies
        const recommendedMovieIdRes = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movie}`
        );
        const recommendedMovieIdData = await recommendedMovieIdRes.json();

        recomMovieArr.push(recommendedMovieIdData.results[0]);
      }
      setRecommendedMovies(recomMovieArr); //storing the recommended movies with their details in the dedicated state variable

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //fetching details and all about the movie as new movie name is searched
  useEffect(() => {
    if (movieName) {
      fetchDetails();
    }
  }, [movieName]);

  //function to show more casts
  const appearMore = () => {
    const container = document.getElementById("castContainer");

    container.style.minHeight = "42rem";
    container.style.maxHeight = "50vw";

    setShowLessBtn(true);
    setShowMoreBtn(false);
  };

  //function to show less casts
  const appearLess = () => {
    const container = document.getElementById("castContainer");
    container.style.minHeight = "";
    container.style.maxHeight = "";
    setShowLessBtn(false);
    setShowMoreBtn(true);
  };


  const fetchUpdatedUser = async () => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "GET",
        credentials: "include", // important to send cookie
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // update user state with the new data
       
        setUser(data); 
      } else {
        console.error("Failed to fetch user:", data.message);
      }
    } catch (error) {
      console.error("Error fetching updated user:", error);
    }
  };
  

  const handleDeductToken = async () => {
    try {
      const response = await fetch("http://localhost:7070/api/deduct/token", {
        method: 'POST',
        credentials: "include", // send cookie to backend
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(" token deducted successfully!");
        // Optionally fetch user data again to update UI
        fetchUpdatedUser(); // or update token count manually if needed
      } else {
        alert(data.message); 
      }
    } catch (error) {
      console.error("Token deduction failed:", error);
      alert("Something went wrong!");
    }
  };
  
  const handleAddToWishlist = async () => {
    if (!content || !content.id || !content.title || !content.poster_path) {
      console.error("Movie data is incomplete for wishlist action.");
      alert("Cannot add to wishlist: movie data is incomplete.");
      return;
    }

    const movieData = {
      id: content.id,
      title: content.title,
      poster_path: content.poster_path,
      // Assuming release_date and vote_average might be useful for the wishlist item display
      release_date: content.release_date,
      vote_average: content.vote_average,
    };

    try {
      const response = await addToWishlistAPI(movieData);
      if (response.success) { // Assuming 'success' is the key indicating success from your API
        setIsWishlisted(true);
        alert(response.message || "Movie added to wishlist!");
      } else {
        // Handle cases like "already in wishlist" or other specific messages from API
        alert(response.message || "Failed to add movie to wishlist.");
      }
    } catch (error) {
      console.error("Error calling addToWishlistAPI:", error);
      alert("An error occurred while trying to add the movie to your wishlist.");
    }
  };

  return (
    <>
      {/* showing the loader till all the details is loaded */}
      {loading && <Loader />}
      {
        /* if loading is completed then show all details */
        !loading && (
          <>
            {/* creating the background div */}
            <div
              className={style.detailsBody}
              style={{
                background: `url(https://image.tmdb.org/t/p/w500${content.backdrop_path}) no-repeat center / cover`,
              }}
            >
              {/* creating a div that will contain all the details and trailer/poster */}
              <div className={style.infoAndTrailer}>
                {/* creating a section that contains the details of the movie */}
                <section className={style.detailsPrimarySection1}>
                  <div className={style.detailsHolder}>
                    <div className={style.title}>{`${content.title}`}</div>
                    <div className={style.genres}>
                      {content.genres &&
                        content.genres.map((genre, index) => {
                          return (
                            <div
                              style={{
                                marginRight:
                                  index < content.genres.length - 1
                                    ? "8px"
                                    : "0",
                              }}
                              key={index}
                            >
                              {`${genre.name}`}
                              {index < content.genres.length - 1 ? (
                                <span> | </span>
                              ) : (
                                <span></span>
                              )}
                            </div>
                          );
                        })}
                    </div>

                    <div className={style.intro}>{`${content.overview}`}</div>

                    {/* creating a div contains the informations */}
                    <div className={style.info}>
                      {/* part 1 of the info */}
                      <div className={style.infoParts}>
                        <div>
                          <FaCalendarDays
                            style={{ color: "rgb(238, 1, 255)" }}
                          />
                          <p style={{ color: "rgb(238, 1, 255)" }}>
                            Release Date :
                          </p>
                          {` ${content.release_date}`}
                        </div>

                        <div>
                          <FaStar style={{ color: "rgb(238, 1, 255)" }} />
                          <p style={{ color: "rgb(238, 1, 255)" }}>
                            Rating :
                          </p>{" "}
                          {` ${content.vote_average} / 10`}
                        </div>

                        <div>
                          <FaClock style={{ color: "rgb(238, 1, 255)" }} />
                          <p style={{ color: "rgb(238, 1, 255)" }}>
                            Duration :
                          </p>{" "}
                          {` ${Math.floor(content.runtime / 60)}h ${
                            content.runtime % 60
                          }m`}
                        </div>
                      </div>

                      {/* part 2 of the info */}
                      <div
                        className={style.infoParts}
                        style={{ marginLeft: "1.5em" }}
                      >
                        <div>
                          <p style={{ color: "rgb(238, 1, 255)" }}>Budget :</p>
                          {`${
                            Math.floor(content.budget / 10 ** 9) > 0
                              ? `$ ${parseFloat(
                                  (content.budget / 10 ** 9).toFixed(2)
                                )} Billion`
                              : Math.floor(content.budget / 10 ** 6) > 0
                              ? `$ ${parseFloat(
                                  (content.budget / 10 ** 6).toFixed(2)
                                )} Million`
                              : "Unavailable"
                          }`}
                        </div>
                        <div>
                          <p style={{ color: "rgb(238, 1, 255)" }}>
                            Box-Office :
                          </p>
                          {`${
                            Math.floor(content.revenue / 10 ** 9) > 0
                              ? `$ ${parseFloat(
                                  (content.revenue / 10 ** 9).toFixed(2)
                                )} Billion`
                              : Math.floor(content.revenue / 10 ** 6) > 0
                              ? `$ ${parseFloat(
                                  (content.revenue / 10 ** 6).toFixed(2)
                                )} Million`
                              : "Unavailable"
                          }`}
                        </div>
                        <div>
                          <p style={{ color: "rgb(238, 1, 255)" }}>
                            Directed By :
                          </p>
                          {directors.map((e, index) => {
                            return (
                              e.name +
                              (index < directors.length - 1 ? " , " : " ")
                            );
                          })}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* creating another section that contains the poster/trailer of the movie */}
                <section className={style.detailsPrimarySection2}>
                  {/* creating the poster */}
                  {showPoster && (
                    <div
                      className={
                        btnClicked
                          ? style.posterHolderAnime
                          : style.posterHolder
                      }
                      onClick={() => {
                        manage();
                      }}
                    >
                      <div className={style.border} ref={borderRef}></div>
                      <div className={style.poster}>
                        <img
                          loading="lazy"
                          style={{ height: "100%", width: "100%" }}
                          src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                          alt={content.title || "Movie Poster"}
                        />
                      </div>
                    </div>
                  )}

                  {/* creating the trailer */}
                  {showPlayer && (
                    <div className={style.player}>
                      {trailer ? (
                        <ReactPlayer
                          style={{ background: "black" }}
                          height="100%"
                          width="100%"
                          playing
                          light
                          controls
                          url={`${trailer}`}
                        />
                      ) : (
                        <div
                          style={{
                            fontSize: "1em",
                            width: "100%",
                            color: "aliceblue",
                            position: "relative",
                            top: "45%",
                            paddingLeft: "3.5em",
                          }}
                        >
                          {" "}
                          Trailer is currently unavailable for this movie{" "}
                        </div>
                      )}
                      {/* creating close button as cross */}
                      <RxCross2
                        className={style.closeBtn}
                        onClick={() => {
                          closeTrailer();
                        }}
                      />
                    </div>
                  )}
                </section>
              </div>
            </div>
    {/* Add MovieWatch component here */}
                    <div style={{display :"flex",justifyContent:"center",alignItems:"center"}}>
                    <div className={style.watchMovieSection}>
              <Watchmovie movieTitle={content.title} />
            </div>
                    <button onClick={handleDeductToken}>
                        Watch Movie (10000 Token)
                    </button>
                    <button onClick={handleAddToWishlist} style={{marginLeft: '10px'}}>
                        Add to Wishlist
                    </button>
                    </div>
             
            {/* creating a div that holds the cast container and text the casts */}
            <div className={style.castsHolder}>
              {/* title text for casts */}
              <div
                style={{
                  fontSize: "1.3em",
                  color: "rgb(238, 1, 255)",
                  marginLeft: "3.5em",
                  marginTop: "0.5em",
                  width: "90%",
                }}
              >
                Casts :
              </div>

              {/* creating the cast container that contains the casts */}
              <div className={style.castsContainer} id="castContainer">
                {cast.map((castImg, index) => {
                  return (
                    castImg.name &&
                    castImg.profile_path != null &&
                    castImg.character && (
                      <div key={index}>
                        {
                          <a
                            style={{ textDecoration: "none" }}
                            href={`https://en.wikipedia.org/wiki/${castImg.name}`}
                            target="_blank"
                          >
                            {
                              <div className={style.castDetails} key={index}>
                                <div
                                  style={{
                                    height: "90%",
                                    width: "90%",
                                    background: `url(${`https://image.tmdb.org/t/p/w500${castImg.profile_path}`}) no-repeat center / cover`,
                                  }}
                                >
                                  <div
                                    className={style.castName}
                                    style={{
                                      fontSize: "0.7em",
                                      color: "aliceBlue",
                                    }}
                                  >{`${castImg.name}`}</div>
                                  <div
                                    className={style.castName}
                                    style={{
                                      fontSize: "0.7em",
                                      color: "rgb(238, 1, 255)",
                                    }}
                                  >{`${castImg.character}`}</div>
                                </div>
                              </div>
                            }
                          </a>
                        }
                      </div>
                    )
                  );
                })}
              </div>

              {/* creating the show more casts button */}
              {showMoreBtn && (
                <button
                  onClick={() => {
                    appearMore();
                  }}
                  className={style.showCasts}
                >
                  <p>Show More</p>{" "}
                  <p style={{ marginTop: "0.3em" }}>
                    <IoIosArrowDown />
                  </p>
                </button>
              )}

              {/* creating the show less casts button */}
              {showLessBtn && (
                <button
                  onClick={() => {
                    appearLess();
                  }}
                  className={style.showCasts}
                >
                  <p>Show Less</p>{" "}
                  <p style={{ marginTop: "0.3em" }}>
                    <IoIosArrowUp />
                  </p>
                </button>
              )}
            </div>

            {/* showing the recommendations of the movie */}
            <Recommendations
              recommendedMovies={recommendedMovies}
              setLoading={setLoading}
            />
            {/* Add MovieWatch component here
            <div className={style.watchMovieSection}>
              <Watchmovie movieTitle={content.title} />
            </div> */}

            {/* Custom Comments Section */}
            {content.id && (
              <Comment movieId={content.id} movieTitle={content.title} />
            )}
            
          </>
        )
      }
    </>
  );
};

export default Details;
