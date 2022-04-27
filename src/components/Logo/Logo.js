import React from "react";
import "./Logo.css";
import Tilty from 'react-tilty';
import Brain from "./Brain.png";




const Logo = () =>{
 return(
     <div className="logo">
    <Tilty className="tilty" glare scale={1} maxGlare={0.5} max={45} >
  <div className="inner"><img src={Brain} alt="Brain Logo" /></div>
    </Tilty>
        </div>
 )
}

export default Logo;