import React, { useEffect, useState } from 'react'
import style from '../Styles/style.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Page6/Loader';
import { TiStarFullOutline } from "react-icons/ti"
const FilterCards = () => {
    const [filterCardData, setFilterCardData] = useState([]); //to store the card data after fetching 
    const [loading, setLoading] = useState(false);//used to show the loader or not
    const genresLocation = useLocation(); //for accessing the passed data from renderFilterInfo in filterResults.js when this page is rendered 
    const toDetails = useNavigate(); //to navigate to details page of the movie

    //function to go to details page 
    const goToDetails = (movie) => {
        toDetails("/Details", { state: { movieTitle: movie } });
    }
    // the tmdb api key
    const api_key = "1131ab6f7e96fcc1c729699cbf8b22cc";

    // fetching the data with the selected genres
    const fetchWithGenres = async () => {
        try {
            setLoading(true);
            const filterResuls = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genresLocation.state.genreIdsString} `)
            const filterData = await filterResuls.json();
            setFilterCardData(filterData.results);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchWithGenres();
    }, [genresLocation.state.selectedGenre])
    return (
        <>
            {loading && <Loader/>}
                {!loading && 
                <div className={style.filterBody}>
                    {/* creating the text to suggest users */}
                    <div className={style.text2}>Movies you may like</div>

                    {/* creating a div that shows which genres are selected */}
                    <div className={style.selectedGenreContainer}>
                        {
                            <>
                                {
                                    genresLocation.state.genreName.map((item, index) => {
                                        {/* mapping all the selected genre names  */ }
                                        return (
                                            <div key={index} className={style.selectedGenres}> {item}</div>
                                        )
                                    })
                                }
                            </>
                        }
                    </div>
                    {/* creating the main container which helps to handle the containing of movie cards  */}
                    <div className={style.filterCardContainer}>
                        {
                            filterCardData.map((movieWithGenres, index) => {
                                return (
                                    <div key={index} >
                                        <div style={{ cursor: "pointer" }} onClick={() => { goToDetails(movieWithGenres.title) }}>
                                            {/* the filtered movie cards  */}
                                            <div className={style.cardDetailsContainer}>
                                                {/* a container to contain the image and the ratings */}
                                                <div className={style.card}>
                                                    {/* movie poster */}
                                                    <img className={style.cardImage} src={`https://image.tmdb.org/t/p/w500${movieWithGenres.poster_path}`} alt="" />
                                                    {/* movie rating */}
                                                    <div className={style.rating}><TiStarFullOutline style={{ color: "#0e0707" }} />{movieWithGenres.vote_average}</div>
                                                </div>

                                                {/* movie name */}
                                                <div className={style.cardName}>{movieWithGenres.title.length > 25 ? movieWithGenres.title.slice(0, 25) + "..." : movieWithGenres.title}</div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            })
                        }
                    </div>
                </div>
                
                }

            </>
    )
}

export default FilterCards
