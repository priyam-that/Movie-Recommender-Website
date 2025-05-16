import React, { useEffect, useRef, useState } from 'react'
import style from '../Styles/style.module.css'
import SearchResult from './SearchResult'
import { useLocation, useNavigate } from 'react-router-dom'
import Filter from '../Page2/Filter'
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const [userInput, setUserInput] = useState(""); //to handle states of user given input
  useEffect(() => {
    setUserInput("");
  }, []);
  const [resultList, setResultList] = useState([]); //handle the states of resultlist during search 
  const [showResultList, setShowResultList] = useState(false); //used to handle when the resultlist will be shown to the user and when not
  const [selectedIndex, setSelectedIndex] = useState(-1);//used to handle the updown navigation by keypress
  const [curValue, setCurValue] = useState("");//used to handle the selected div index whenever the userInput value changes
  const renderInfo = useNavigate(); //to navigate to the details page when necessary
  const inputRef = useRef(); //to take the reference of the input field
  const location = useLocation();

  //fetching the results for the resultlist during search from our own flask part
  const fetchSearchResults = async (value) => {
    try {
      //fetching start
      const responseResult = await fetch("/api/movies");
      const searchResults = await responseResult.json();
      const actualResults = searchResults.arr;
      //fetching end by getting the array of names

      //filtering the results as it changes as user gives input

      const normalizedValue = value.toLowerCase();

      const startsWithValue = actualResults.filter((movieName) => { return movieName.toLowerCase().startsWith(normalizedValue) });

      const containsValue = actualResults.filter((movieName) => { return movieName.toLowerCase().includes(normalizedValue) && !movieName.toLowerCase().startsWith(normalizedValue) });

      startsWithValue.sort((a, b) => a.localeCompare(b));
      containsValue.sort((a, b) => a.localeCompare(b));

      const showResults = [...startsWithValue, ...containsValue];
      console.log(showResults);

      // const showResults = actualResults.filter((movieName) => {
      //   return movieName && (movieName.includes(value) || movieName.toUpperCase().includes(value) || movieName.toLowerCase().includes(value));
      // })
      setResultList(showResults);
    } catch (error) {
      console.log(error);
    }
  }

  //handling the changes as user inputs each letter by setting the state variables and fetching the data by calling the previous fetchSearchResult function
  const handleChange = (value) => {
    if (value == "") {
      setUserInput(value);
      setResultList([]);
      setShowResultList(false);
    } else {
      setUserInput(value);
      fetchSearchResults(value);
      if (curValue != userInput) {
        setCurValue(userInput);
      }
    }
  }

  // to show the resultlist again as the searchbar gets focus 
  const reShow = () => {
    if (userInput != "") {
      setShowResultList(true);
    }
  }

  //handling different dependecies especially keypress events 
  const showDependencyAndRender = (e) => {
    //if user presses backspace then the resultlist will become hidden
    //if user presses enter then the search of the moviename will be searched
    //if user presses arrowdown then the resultlist will become traversed
    if (e.key === "Backspace") {
      setShowResultList(false);
    } else if (e.key === "Enter" && userInput != "") {
      renderInfo("/Details", { state: { movieTitle: userInput } });
      setShowResultList(false);
    } else {
      setShowResultList(true);
    }
  }

  //if the user presses the search button without inputting any moviename or anything then it will not redirect the page 
  const renderOrNot = () => {
    if (userInput != "") {
      renderInfo("/Details", { state: { movieTitle: userInput } });
      setShowResultList(false);
    }
  }

  useEffect(() => {
    if (location.pathname === "/") {
      setUserInput("");
    }
  }, [location])

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "55%", height: "60%", marginLeft: "4em", marginRight: "1em" }}>
        {/* search engine consists of searchbar and search button */}
        <div className={style.searchEngine}>
          {/* search bar */}
          <input onBlur={() => { setShowResultList(false) }} ref={inputRef} autoFocus onKeyDown={(e) => { showDependencyAndRender(e) }} onClick={() => { reShow() }} type="search" placeholder='Search Here...' className={`${style.navItems} ${style.inputSearch}`} value={userInput} onChange={(e) => { handleChange(e.target.value) }} />

          {/* search button */}
          <div onClick={() => { renderOrNot() }} className={`${style.searchBtn} ${style.linkToDetails}`}><IoSearch style={{ fontSize: "1.2em" }} /></div>
        </div>
          {/* search results */}
          <SearchResult showResultList={showResultList} resultList={resultList} setShowResultList={setShowResultList} userInput={userInput} setUserInput={setUserInput} inputRef={inputRef} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} curValue={curValue} />
      </div>

      {/* filter button */}
      <Filter />



    </>
  )
}

export default Search
