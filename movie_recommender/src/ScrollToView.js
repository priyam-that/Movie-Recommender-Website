import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToView = () => {
    const location=useLocation();
    const scrolling=(element)=>{
        // Function to ensure scrolling happens after content is fully loaded
      const scrollToElement = () => {
        if (element && element.offsetHeight > 0) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // Retry after a short delay
          setTimeout(scrollToElement, 100);
        }
      };

      scrollToElement();
    }
    useEffect(() => {
      if(location.hash===""&&location.pathname==="/"){
        const element=document.getElementById('slider');
        scrolling(element);
      }
      else if (location.hash){
        const element = document.getElementById(location.hash.slice(1));
        scrolling(element);
      }
      else if(location.pathname==="/Blogs"){
        const element=document.getElementById("Blogs");
        scrolling(element);
      }
    }, [location]);
  
    return null;
}

export default ScrollToView
