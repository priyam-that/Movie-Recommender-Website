import React from 'react';
import BlogObj from './BlogObject';
import style from '../Styles/blogsStyle.module.css';


const Blogs = () => {
  return (
    <div className={style.container} id="Blogs">
      <div className={style.heading}>
        <h1 className={style.title}>Movie Blogs</h1>
      </div>
      
      {/* Creating Blog-Cards */}

      <div className={style.cardDeck}>
        {BlogObj.map((item, index) => (
          <div key={index} className={style.card}> 
            <img className={style.cardImgTop} src={item.img} alt="Card image cap" />
            <div className={style.cardBody}>
              <h5 className={style.cardTitle}>{item.title}</h5>
              <p className={style.cardText}>{item.description}</p>
              <div className={style.cardLink}>
              <a href={item.link} className={style.cardLink} target='_blank'>Read More</a> 
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
