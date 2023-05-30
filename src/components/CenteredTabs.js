import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useState } from 'react';
import './Card.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';


export default function CenteredTabs(props) {
  console.log(props.cardData)
  const [activeTab, setActiveTab] = useState(0); 
  const [showMore, setShowMore] = useState(false);
  const [showMoreOne, setShowMoreOne] = useState(false);
  const [showMoreTwo, setShowMoreTwo] = useState(false);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const text  = props.cardData._embedded.venues[0];
  const text1= props.cardData._embedded.venues[0];
  const text2 = props.cardData._embedded.venues[0];

  return (
 
    <>    
     <div className="card-detail">            
            <p className="back">Back</p>
            <p className="evename">{props.cardData.name}</p>
    <Box sx={{ width: '100%', bgcolor: '#479485' }}>
      <Tabs value={activeTab} onChange={handleChange} centered>
        <Tab label={<span style={{ color: 'white' }}>Events</span>} />
        <Tab label={<span style={{ color: 'white' }}>Venue</span>} />
      </Tabs>
      </Box>
      {activeTab === 0 && (
        <>
        <div className='eventtab'>
        <div className='eventdata-tab'>
        <p className='text'>Date</p>
            <p className='textdata' >{props.cardData.dates.start.dateTime}</p>
            <p className='text'>Artists/Team</p>
            <p className='textdata'>{props.cardData._embedded.venues[0].markets[0].name}</p>
            <p className='text'>Venue</p>
            <p className='textdata'>{props.cardData._embedded.venues[0].name}</p>
            <p className='text'>Genre</p>
            <p className='textdata'>{props.cardData.classifications[0].subGenre.name}</p>
            <p className='text'>Price Ranges</p>
            <p className='textdata'>{props.cardData.priceRanges ? `${props.cardData.priceRanges[0].min} - ${props.cardData.priceRanges[0].max}` : 'N/A'}</p>
            <p className='text'>Ticket Status</p>
            <p className='text'><button style={{padding:"10px" ,backgroundColor:"Green",color:"white",borderRadius:"10px",border:"0px"  }}>{props.cardData.dates.status.code}</button></p>
            <p className='text'>Buy Ticket At:</p>
            <p className='text'><a className="li" href={props.cardData.url}>Ticket URL</a></p>
            </div>
        <div className='eventimgtab'>
        {props.cardData.seatmap?.staticUrl? (
        <img  className='eventimg' src={props.cardData.seatmap.staticUrl}></img>
        ):(
          <p>NA</p>
        )}
        </div>
        </div>
        <p className='share'>Share On:<TwitterIcon href={`https://twitter.com/Pink`} style={{color:"#00acee",marginLeft:"10px"}}></TwitterIcon><FacebookIcon style={{color:"0000ff",marginLeft:"10px"}}></FacebookIcon></p>

        </>
      )}

      {activeTab === 1 && (
        <>
        <div className='venuetab'>
        <div className='venuename'>
          <p>Name</p>
          <p className='textdata'>{props.cardData._embedded.venues[0].name}</p>
          <p>Address</p>
          <p className='textdata'>{props.cardData._embedded.venues[0].address.line1},{props.cardData._embedded.venues[0].city.name},{props.cardData._embedded.venues[0].country.name}</p>
          <p></p>
        </div>
        <div className='venuedetails'>
          <p>Open Hours</p>
          {
            text.boxOfficeInfo ?.openHoursDetail? (
          <p className='textdata'>{showMore ? text.boxOfficeInfo.openHoursDetail : `${text.boxOfficeInfo.openHoursDetail.toString().slice(0, 100)}`}
          <button className="btn" onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</button></p>
            ):(
              <p>NA</p>
            )}
            <p>General Info</p>
          {
            text1.generalInfo ?.generalRule? (
          <p className='textdata'>{showMoreOne ? text1.generalInfo.generalRule : `${text1.generalInfo.generalRule.toString().slice(0, 100)}`}
          <button className="btn" onClick={() => setShowMoreOne(!showMoreOne)}>{showMoreOne ? "Show less" : "Show more"}</button></p>
            ):(
              <p>NA</p>
            )}
          <p>Child Rule</p>
          {
            text2.generalInfo ?.childRule? (
          <p className='textdata'>{showMoreTwo ? text2.generalInfo.childRule : `${text2.generalInfo.childRule.toString().slice(0, 100)}`}
          <button className="btn" onClick={() => setShowMoreTwo(!showMoreTwo)}>{showMoreTwo ? "Show less" : "Show more"}</button></p>
            ):(
              <p>NA</p>
            )}
        </div>
        </div>
        </>
      )}
   
    </div>
    </>
  );
}