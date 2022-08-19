import React from "react";
import { useState, useEffect  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPoke, allPokemons } from "../action";
import Card from './Card'
import { Link } from "react-router-dom";

export default function Home(){
    const dispatch = useDispatch();
    const allPoke = useSelector((state) => state.pokemons)
    
    useEffect(() => {
        dispatch(getPoke())
},[dispatch])


function handleClick(e){
    e.preventDefault();
    dispatch(getPoke())
}

return (
    <div>
        <h1>POKLEJO</h1>
         <Link to='/poke'>CREATE NEW POKEMON</Link>
         <button onClick={e=> {handleClick(e)}}>LOAD POKEMONS</button>

         <select>
                 <option disabled selected defaultValue>
                     Alphabetical order
                 </option>
                 <option value="A-Z">A-Z</option>
                 <option value="Z-A">Z-A</option>
         </select>




        <select>
                 <option disabled selected defaultValue>
                    Filter by weight
                 </option>
                 <option value="max_weight">Max</option>
                 <option value="min_weight">Min</option>
        </select>
{
    allPoke?.map((c) => {
            return(
                <div key={c.id}> 
                <div>
                    <Link to={'/home' + c.id}>
                        <Card 
                        id={c.id}
                        key={c.id}  
                        name={c.name} 
                        types={c.types} 
                        img={c.img} />
                    </Link>
                </div>
                </div>
            )
        })

}

    </div>
)

}