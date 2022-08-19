import React from "react";
// import './Card.css'

import { Link } from 'react-router-dom';

export default function Card({ name, types, img, id  }) {
 
    return (
      <div >
        <h3>{name}</h3>
        <img  src={img} alt="img not found" width="200px" heigth="250px" />
        <h3> types: </h3>
        <h5> {types.join(', ')}</h5>    
       
          
     </div>
    );
  }