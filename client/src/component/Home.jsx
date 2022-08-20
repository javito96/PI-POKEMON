import React from "react";
import { useState, useEffect  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPoke, fulterPokemonsByTypes, filterDB } from "../action";
import Card from './Card'
import { Link } from "react-router-dom";
import Paginado from "./Paginado";

export default function Home(){
    const dispatch = useDispatch();
    const allPoke = useSelector((state) => state.pokemons)


    const [currentPage, setCurrentPage ] = useState(1)//estado local con primer pag que renderiza
    const [pokesPerPage] = useState(12)//en la primer pag trae 9 recetas
    const indexOfLastPokes = currentPage * pokesPerPage//numero del ultimo indice multiplicado pag, ej recetas 9 pag nro3 = 27
    const indexOfFirstPokes = indexOfLastPokes - pokesPerPage//indice de ultima receta - recetas por pag igual a indice de primer receta
    const currentPokes = allPoke.slice(indexOfFirstPokes, indexOfLastPokes) //slice toma una porcion de lo que yo le paso por parametro
    // const [Ordenado, setOrder] = useState('')

    const paginado = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }// ayuda renderizado
    
    useEffect(() => {
        dispatch(getPoke())
},[dispatch])


function handleClick(e){
    e.preventDefault();
    dispatch(getPoke())
}



function handleFilterByType(e){
    dispatch(fulterPokemonsByTypes(e.target.value))
    setCurrentPage(1)
}

function hadleFilterDB(e){
    dispatch(filterDB(e.target.value))
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


         <select onChange={(e) => hadleFilterDB(e)}>
         <option disabled selected defaultValue>
                    Filter new </option>
              <option value="all">All</option>
              <option value="created">Created</option>
              <option value="ex">Existing</option>
            </select>



         <select onChange={(e)=>handleFilterByType(e)}>
                <option>Filter by types</option>
                <option value="normal">Normal</option>
                <option value="fighting">Fighting</option>
                <option value="flying">Flying</option>
                <option value="poison">Poison</option>
                <option value="ground">Ground</option>
                <option value="rock">Rock</option>
                <option value="bug">Bug</option>
                <option value="ghost">Ghost</option>
                <option value="steel">Steel</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="grass">Grass</option>
                <option value="electric">Electric</option>
                <option value="psychic">Psychic</option>
                <option value="ice">Ice</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Dark</option>
                <option value="fairy">Fairy</option>
                <option value="unknown">Unknown</option>
                <option value="shadow">Shadow</option>
            </select>




        <select>
                 <option disabled selected defaultValue>
                    Filter by weight
                 </option>
                 <option value="max_weight">Max</option>
                 <option value="min_weight">Min</option>
        </select>
{
    currentPokes?.map((c) => {
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

<div>
    <Paginado
    pokesPerPage={pokesPerPage}
    allPoke={allPoke.length}
    paginado={paginado}    
    />
</div>


    </div>
)

}