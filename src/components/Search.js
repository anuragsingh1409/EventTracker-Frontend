import React, { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Geocode from "react-geocode";
import axios from "axios";
import CenteredTabs from './CenteredTabs';
import ComboBox from "./ComboBox";

  

function Search(){
  const [eventData , setEventData] = useState([]);
  const [hash , setHash] = useState();
  const [showCard , setShowCard] = useState(true);
  const [cardData, setCardData] = useState({});

  const [formData, setFormData] = useState({
    keyword: '',
    distance: '',
    category: '',
    location: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
function geocode() {
    if(document.getElementById("autoloc").checked){
    fetch('https://ipinfo.io/json?token=289146fd52a448')
    .then(response => response.json())
    .then(data => {
      const loc = data.loc;
      const [latitude, longitude] = loc.split(',');
      const geohash = require('ngeohash');
      var hashed = geohash.encode(latitude, longitude);
      setHash(hashed);
    })
    .catch(error => console.error(error));
  }
  } 
  function geocodeAPI() {
    const location = document.getElementById('location');
    Geocode.setApiKey("AIzaSyCcW_UZqctzXOT-8KUqeTNBqNhX3Lg5kNw");
    Geocode.setLanguage("en");
    Geocode.enableDebug();
    Geocode.fromAddress(location.value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const geohash = require('ngeohash');
        var hashed= geohash.encode(lat, lng);
        setHash(hashed);
        console.log(hashed);
      },
      (error) => {
        console.error(error);
      }
    );
  }
 const handleSubmit = (event) => {
    formData.location=hash;
    console.log(formData)
    event.preventDefault();
    axios({
      method: 'post',
      // headers: { 'Content-Type': 'application/json' },
      url: 'http://127.0.0.1:8000/ticket-master/event/',
      data: formData
    }).then(function (response) {
      setEventData(response.data._embedded.events);
    });
  };
  const [isChecked, setIsChecked] = useState(false)
    return(
        <>
     <div className='nav'>
      <Link to="/" className="nav1"> <span className='npage'>Search</span></Link>
      <Link to="/favourites" className="nav2"> <span className='npage'>Favourites</span></Link>
    </div>
 <div className="main">
<div className="bg-text">
  <p className="title">Events Search</p>
  <hr className="line"></hr>
  <form style={{height:"100%",width:"100%"}} method="POST"  onSubmit={handleSubmit}>
  <p className="heading-1">Keyword<span className='required'>*</span></p>
  <ComboBox
    handleInputChange = {handleInputChange}
    formData = {formData}
  />
  <div className="heading-2">
  <div>
  <p style={{textAlign:"left",fontWeight:"normal",fontSize:"17px",marginLeft:"3px",color:"#90ddfc"}}>Distance(miles)</p>
  <input className="distbox" type="text" id="distance" name="distance" value={formData.distance} onChange={handleInputChange}></input>
  </div> 
  <div style={{marginLeft:"60px"}}>
  <p style={{textAlign:"left",fontWeight:"normal",fontSize:"17px",marginLeft:"3px",color:"#90ddfc"}}>Category<span className='required'>*</span></p>
  <select id="category" name="category" className="catbox" required   value={formData.category} onChange={handleInputChange}>
        <option value="default">Default</option>
        <option value="KZFzniwnSyZfZ7v7nJ">Music</option>
        <option value="KZFzniwnSyZfZ7v7nE">Sports</option>
        <option value="KZFzniwnSyZfZ7v7na">Art & Theatre</option>
        <option value="KZFzniwnSyZfZ7v7nn">Film</option>
        <option value="KZFzniwnSyZfZ7v7n1">Miscellaneous</option>
      </select>
  </div>
  </div>
  <p className="heading-1">Location<span className='required'>*</span></p>
  <input className="keybox" id="location" name="location" value={formData.location} type="text" required disabled={isChecked} onChange={handleInputChange} ></input>
  <div style={{marginRight:"60%",marginTop:"15px",marginLeft:"13px"}}>
  <input id="autoloc" type="checkbox" onClick={geocode} onChange={(e) => setIsChecked(e.target.checked)} ></input>
   <label  style={{fontWeight:"normal",color:"#90ddfc"}}> Auto-detect your location</label>
   </div>
   
   <div className="btn">

    <button type="submit" className="btn1" onClick={geocodeAPI} >SUBMIT</button>

    <button className="btn2">CLEAR</button>
    
   </div>
   </form>
   <div className="tablecard">
    {
      showCard ? (
        <div className="table">
   <table>
      <thead>
        <tr>
          <th>Date/Time</th>
          <th>Icon</th>
          <th>Event</th>
          <th>Genre</th>
          <th>Venue</th>
        </tr>
      </thead>
      <tbody>
   {eventData.map(events =>{
    
    return(   <tr onClick={()=>{setShowCard(false);setCardData(events)}}>
          <td>{events.dates.start.dateTime}</td>
          <td><img style={{height:"50px",width:"50px"}} src={events.images[0].url}></img></td>
          <td>{events.name}</td>
          <td>{events.classifications[0].genre.name}</td>
          {/* <td>{events._embedded.venues[0].name}</td> */}
        </tr>
      )})}
      </tbody>
    </table>
</div>
      ):(
         <div className="carddiv">
        <CenteredTabs
        cardData = {
          cardData
        }
         />
        </div>
)}
   </div>
   </div>
 
</div>
        </>
    );
}
export default Search;