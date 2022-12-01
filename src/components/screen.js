import React from 'react';
import '../stylesheet/screen.css'

const Screen = ({ display, id }) => (
  <p
    className='input user-select-none'
    id={id}>
    {display}
  </p>
);

export default Screen;