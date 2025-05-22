import React, { useState, useEffect } from 'react';
import style from '../Styles/style.module.css';
import { TiStarFullOutline } from "react-icons/ti";
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icons
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector
import { toast } from 'react-toastify'; // Import toast
import SummaryApi from '../../common'; // Import SummaryApi

const LandingMoviesCard = ({ popularMovieCard, topRatedMovieCard }) => {
    const [currentPosition1, setCurrentPosition1] = useState(0); // Stores translateX in vw for slider 1
    const [currentPosition2, setCurrentPosition2] = useState(0); // Stores translateX in vw for slider 2
    const [addedMovies, setAddedMovies] = useState({}); // To track added movies
    const userDetails = useSelector(state => state.user.user); // Get user details from Redux
    const toDetails = useNavigate(); //used to navigate to details of the selected movie

    // Function to handle adding movie to wishlist
    const handleAddToWishlist = async (movie) => {
        if (!userDetails || !userDetails._id) {
            toast.error("Please login to add movies to your wishlist.");
            return;
        }

        const payload = {
            movie: {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
            }
        };

        try {
            const response = await fetch(SummaryApi.wishlistAdd.url, {
                method: SummaryApi.wishlistAdd.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include"
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || "Movie added to wishlist!");
                setAddedMovies(prev => ({ ...prev, [movie.id]: true }));
            } else {
                toast.error(data.message || "Failed to add to wishlist.");
                if (data.message && data.message.toLowerCase().includes("already in wishlist")) {
                    setAddedMovies(prev => ({ ...prev, [movie.id]: true }));
                }
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error("Error adding to wishlist:", error);
        }
    };

    //Navigating to details page function declaration
    const goToDetails=(movie)=>{
        toDetails("/Details",{state:{movieTitle:movie}});
    }

    const slide = (setCurrentPosition, currentPosition, btn, slidingContainerElement, sliderId) => {
        const step = 60; // vw step
        const maxSlide = -120; // Max negative translateX in vw (equivalent to old 120 limit)

        if (btn === "btn2") { // Slide Right (translateX becomes more negative)
            if (currentPosition > maxSlide) { // Allow sliding if not at the limit
                const newPosition = Math.max(currentPosition - step, maxSlide);
                slidingContainerElement.style.setProperty(`--slide-translate-x-${sliderId === 'slidingContainer1' ? '1' : '2'}`, `${newPosition}vw`);
                setCurrentPosition(newPosition);
            }
        } else if (btn === "btn1") { // Slide Left (translateX becomes less negative, towards 0)
            if (currentPosition < 0) { // Allow sliding if not at the start
                const newPosition = Math.min(currentPosition + step, 0);
                slidingContainerElement.style.setProperty(`--slide-translate-x-${sliderId === 'slidingContainer1' ? '1' : '2'}`, `${newPosition}vw`);
                setCurrentPosition(newPosition);
            }
        }
    };

    const slideController = (sliderId, btn) => {
        const slidingContainerElement = document.getElementById(sliderId);
        if (!slidingContainerElement) return;

        if (sliderId === "slidingContainer1") {
            slide(setCurrentPosition1, currentPosition1, btn, slidingContainerElement, sliderId);
        } else if (sliderId === "slidingContainer2") {
            slide(setCurrentPosition2, currentPosition2, btn, slidingContainerElement, sliderId);
        }
    };

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
                                <div key={index} className={style.movieCardWrapper}> {/* Added a wrapper for positioning */}
                                    <div className={style.clickableCardArea} onClick={() => { goToDetails(curMovie.title) }}>
                                        <div className={style.cardDetailsContainer}>
                                            <div className={style.card}>
                                                <img loading="lazy" className={style.cardImage} src={`https://image.tmdb.org/t/p/w500${curMovie.poster_path}`} alt={curMovie.title} />
                                                <div className={style.rating}><TiStarFullOutline style={{ color: "#0e0707" }} /> {curMovie.vote_average}</div>
                                            </div>
                                            <div className={style.cardName}>{curMovie.title.length > 30 ? curMovie.title.slice(0, 30) + "..." : curMovie.title}</div>
                                        </div>
                                    </div>
                                    <button
                                        className={style.wishlistButton}
                                        onClick={() => handleAddToWishlist(curMovie)}
                                        aria-label={addedMovies[curMovie.id] ? "Remove from Wishlist" : "Add to Wishlist"}
                                    >
                                        {addedMovies[curMovie.id] ? <FaHeart color="red" /> : <FaRegHeart />}
                                    </button>
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
                                <div key={index} className={style.movieCardWrapper}> {/* Added a wrapper for positioning */}
                                    <div className={style.clickableCardArea} onClick={() => { goToDetails(curMovie.title) }}>
                                        <div className={style.cardDetailsContainer}>
                                            <div className={style.card}>
                                                <img className={style.cardImage} src={`https://image.tmdb.org/t/p/w500${curMovie.poster_path}`} alt={curMovie.title} />
                                                <div className={style.rating}><TiStarFullOutline style={{ color: "#0e0707" }} /> {curMovie.vote_average}</div>
                                            </div>
                                            <div className={style.cardName}>{curMovie.title.length > 30 ? curMovie.title.slice(0, 30) + "..." : curMovie.title}</div>
                                        </div>
                                    </div>
                                    <button
                                        className={style.wishlistButton}
                                        onClick={() => handleAddToWishlist(curMovie)}
                                        aria-label={addedMovies[curMovie.id] ? "Remove from Wishlist" : "Add to Wishlist"}
                                    >
                                        {addedMovies[curMovie.id] ? <FaHeart color="red" /> : <FaRegHeart />}
                                    </button>
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
