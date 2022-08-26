import React from "react";
import './Card.css'



export default function Card({ name, types, img, id  }) {
 
    return (
      <div className="Card" >
        <h3>{name}</h3>
        <div>
        <img src={img} alt="img not found" width="200px" heigth="250px" />
        <div className="types">
        <h5> Types: {types.join(', ')} </h5>               
        </div>
        </div>
     </div>
    );
  }