import React from 'react';
import '../stylesheet/mainButton.css'

function MainButton({ text, btnClass, color, clickFunction, id }) {
  return (
    <>
      <button
        id={id}
        className={`mainButton ${btnClass} 
      ${color === "light" ? 'colorBtn-light'
            : color === "dark" ? 'colorBtn-dark'
              : 'colorBtn'} `}
        onClick={() => clickFunction(text)}>
        {text}
      </button>
    </>
  )
}

export default MainButton;