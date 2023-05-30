import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const ComboBox = (props) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChangeSuggest = async (event) => {
    const inputValue = event.target.value;

    try {
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/suggest.json?apikey=V3Yjd5F8oKpJCar0lf1ZJAAzj4qBZNVD&keyword=${inputValue}`
      );
      const suggestions = response.data._embedded?.attractions || [];
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions', error);
    }
  };

  return (
    <Autocomplete
      options={suggestions}
      getOptionLabel={(option) => option.name || ''}
      renderInput={(params) => (
        <TextField
          {...params}
          name='keyword'
          required
          value={props.formData.keyword}
          variant="outlined"
          onChange={event=>{props.handleInputChange(event);handleInputChangeSuggest(event)}}
          sx={{
   width: {  md: 500 },
   backgroundColor:"#ffffff",
   borderRadius:"5px",
   height:"43px",
  }}
        />
      )}
    />
  );
};

export default ComboBox;
