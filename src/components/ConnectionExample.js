import axios from "axios";
import {React, useState, useEffect} from "react";


export default function ConnectionExample() {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get('http://127.0.0.1:8000/ticket-master/event/?keyword=Los+Angeles&distance=10&category=KZFzniwnSyZfZ7v7nE&location=9q5cs')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  
    return (
      console.log(data)
    );
}

