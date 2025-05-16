import React, { useEffect, useState } from 'react'
import style from '../Styles/style.module.css'
import FilterResults from './FilterResults'
import { TbFilterSearch } from "react-icons/tb";

const Filter = () => {

  const [showFilterResult, setShowFilterResult] = useState(false);//to handle states of the container where genres will be shown
  const [filterClick, setFilterClick] = useState(true);//to handle the filterIcon button if it is clicked
  const [genreData, setGenreData] = useState([]);//to store the genrelist after fetching

  //handling different events for better UI/UX in filterIcon button
  const filterBy = () => {
    if (filterClick == false) {
      setShowFilterResult(false);
      setFilterClick(true);
    } else if (filterClick == true) {
      setShowFilterResult(true);
      setFilterClick(false);
    }
  }

  //fetching the genres
  const api_key = "1131ab6f7e96fcc1c729699cbf8b22cc";
  const getGenres = async () => {
    const genreData = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`);
    const responseGenre = await genreData.json();
    setGenreData(responseGenre.genres);
  }
  useEffect(() => {
    getGenres();
  }, [])
  return (
    <>
      {/* filter button */}
      <button onClick={() => { filterBy() }} className={filterClick ? style.filterIcon : style.activeFilterIcon}><TbFilterSearch /></button>
      
      {/* filterResults or GenreList */}
      <FilterResults  setShowFilterResult={setShowFilterResult} showFilterResult={showFilterResult} setFilterClick={setFilterClick} genreData={genreData} />
    </>

  )
}

export default Filter
