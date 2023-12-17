import React from 'react'
import { MdSmsFailed } from "react-icons/md";

function NotFound() {
  return (
    <span style={{display:"flex"}}><MdSmsFailed style={{color:"blueviolet",fontSize:"20px"}}/><p style={{fontSize:"12px",marginLeft:"12px",opacity:"0.7"}}>Sorry,we couldnt find any rooms for you!</p></span>
  )
}

export default NotFound