import React from "react";
import './App.css';
import { Link } from "react-router-dom";

function favourites(){
    return(
        <>
    <div className='nav'>
      <Link to="/" className="nav1"> <span className='npage'>Search</span></Link>
      <Link to="/favourites" className="nav2"> <span className='npage'>Favourites</span></Link>
    </div>
     <div className="nofav">
        <p className="txt">No favourite events to show</p>
     </div>
        </>
    );
}

export default favourites;