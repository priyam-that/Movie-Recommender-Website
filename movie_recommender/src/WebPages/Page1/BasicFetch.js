import React, { useEffect, useState } from 'react'
import LandingMoviesCard from './LandingMoviesCard';
const BasicFetch = () => {
  //fetching some movies by tmdb api to show in the landing page
  const [popularMovieCard, setPopularMovieCard] = useState([]);
  const [topRatedMovieCard,setTopRatedMovieCard]=useState([]);

  const api_key = "1131ab6f7e96fcc1c729699cbf8b22cc";

  //fetching popular movies
  const getPopularMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`);
      const data = await response.json();
      const movies = data.results;
      setPopularMovieCard(movies);
    } catch (err) {
      console.log(err);
    }
  }

  //fetching top rated movies
  const getTopRatedMovies=async ()=>{
    try{
      const response=await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${api_key}`);
      const data=await response.json();
      setTopRatedMovieCard(data.results);
      
    }catch(err){
      console.log(err);
      
    }
  }
  useEffect(() => {
    getPopularMovies();
    getTopRatedMovies();
  }, [])

  return (
    <>
      {/* showing movies in landing page */}
      <LandingMoviesCard popularMovieCard={popularMovieCard} topRatedMovieCard={topRatedMovieCard} />
  
    </>
  )
}

export default BasicFetch
