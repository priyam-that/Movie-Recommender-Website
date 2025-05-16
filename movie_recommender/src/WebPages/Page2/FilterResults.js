import React, { useEffect, useState } from 'react'
import style from '../Styles/style.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
const FilterResults = ({ setShowFilterResult, showFilterResult, setFilterClick, genreData }) => {

  const [selectedGenre, setSelectedGenre] = useState([]);//to handle the state of selection of multiple or a single genre
  const renderFilterInfo = useNavigate();//to navigate to another pagewhile clicked on the filter button
  const location=useLocation();

  // function to handle selected genres
  const selectingGenre = (index) => {
    if (selectedGenre.includes(index)) {
      setSelectedGenre(selectedGenre.filter((gen) => { return (gen !== index) }));
    } else {
      setSelectedGenre([...selectedGenre, index]);
    }
  }

  //getting an array of the genre ids 
  let genreIds = [];
  selectedGenre.map((selected) => {
    genreIds.push(genreData[selected].id)
  })

  // setting the array of genre ids in a string format to help in api call
  let genreIdsString = genreIds.join(',');

  //getting the array of names of the genre
  let genreName = [];
  selectedGenre.map((selected) => {
    genreName.push(genreData[selected].name);
  })

  // handling events when filter button is clicked
  const handleFiltering = () => {
    setShowFilterResult(false);
    setFilterClick(true);
    if (selectedGenre.length !== 0) {
      renderFilterInfo('/FilterCards', { state: { genreIdsString: genreIdsString, selectedGenre: selectedGenre, genreName: genreName } });
    } else {
      renderFilterInfo('/');
    }
  }

  //unselecting all the genres while clicking on home 
  useEffect(()=>{
    if(location.pathname==="/"){
      setSelectedGenre([]);
    }
  },[location])

  return (
    <>
      {
        //if user clicks on the filterIcon button then only the genreList container will appear
        showFilterResult && <div className={style.filterResultsContainer}>
          {/* creating a div containing the text "Genres" and two buttons */}
          <div className={style.genreDisplay}>
            {/* the text */}
            <div className={style.genreTitle}>Genres</div>
            {/* creating a div that contains the two buttons */}
            <div className={style.filterButtons}>
              {/* clear all button to clear all selected genres */}
              <button onClick={() => { setSelectedGenre([]) }} className={style.clearFilter}>Clear All</button>
              {/* filter button */}
              <button onClick={() => { handleFiltering() }} className={style.activateFilter}>Filter</button>
            </div>
          </div>

          {/* creating a container div that contains the genrelist */}
          <div className={style.genreHolder}>
            {
              genreData.map((genreName, index) => {
                  {/* getting each genre names and if its selected then changing the background color*/}
                return (
                  <div key={index} onClick={() => { selectingGenre(index) }} style={{ backgroundColor: selectedGenre.includes(index) ? "crimson" : "rgb(56, 3, 39)" }} className={style.genreTypes}>{genreName.name}</div>
                )

              })
            }
          </div>
        </div>
      }
    </>
  )
}

export default FilterResults
