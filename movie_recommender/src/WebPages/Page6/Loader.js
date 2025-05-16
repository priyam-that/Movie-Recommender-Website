import React from 'react'
import style from '../Styles/detailsStyle.module.css'
const Loader = () => {
  return (
    <>
    {/* constructing the loader */}
       <div className={style.bodyDoub}>
        <div className={style.loaderOuterLayer}>
          <div className={style.loader}></div>
          <div className={style.loaderInnerLayer}></div>
        </div>
      </div>
    </>
  )
}

export default Loader
