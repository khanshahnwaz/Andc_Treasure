import React from 'react'
import { Circles } from 'react-loader-spinner'
;

const Loader = (props) => {
    if(props.loader){
  return (
    <div className='absolute top-1/2 left-1/2 '>
    <Circles
    height="50"
    width="50"
    radius="9"
    color="#5c1e7e"
    ariaLabel="loading"
    wrapperStyle
    wrapperClass
  />
  </div>
  )} else return null;
}

export default Loader