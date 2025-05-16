import React, { useEffect,useRef } from 'react'
import style from '../Styles/style.module.css'


const SearchResult = ({ resultList, showResultList, setShowResultList,userInput, setUserInput, inputRef,setSelectedIndex,selectedIndex,curValue }) => {
  //when a movie name is selected by the user  the resultlist it will take place in the search bar and then the enter button or the search button will search it
  const resultRefs = useRef([]);
  const readyToSearch = (movieName,event) => {
    event.preventDefault(); //preventing losing focus when clicked on a particular result in resultlist
    setShowResultList(false);
    inputRef.current.focus();
    setUserInput(movieName);
  }
  
  //handling keypress(arrowUp,arrowDown) events and changing the selected moviename
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prevIndex) => 
          prevIndex < resultList.length - 1 ? prevIndex + 1 : prevIndex
        ); 
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prevIndex) => 
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
       
      } else if(userInput!=curValue){
        setSelectedIndex(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
    window.removeEventListener('keydown', handleKeyDown);
    };
  }, [resultList.length]);

  //handling the selected div to show even if it is hidden due to overflow:hidden and showing selected moviename to the searchbar as well
  useEffect(() => {
    //shows the selected div (moviename) in the searchbar
    setUserInput(resultList[selectedIndex]);

    //helps to show the selected index moviname in visible part 
    if (selectedIndex >= 0 && resultRefs.current[selectedIndex]) {
      resultRefs.current[selectedIndex].scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'center', // Center the item vertically
        inline: 'nearest', // Align horizontally if needed
      });
    }
  }, [selectedIndex]);


  return (
    <>
      {
        showResultList && (
          <>
            {/* creating the resultshowing div that appears when user types in the searchbar */}
            <div  className={style.searchResultDiv}>
              {
                resultList.map((movies, index) => {
                  return (
                      <div ref={(items) => resultRefs.current[index] = items} key={index} className={`${index === selectedIndex ? style.selected : style.searchResults}`} onMouseDown={(event) => { readyToSearch(movies,event) }}>{movies}</div>
                      
                  )
                })
              }
            </div>
           
          </>
        )
      }


    </>
  )
}

export default SearchResult
