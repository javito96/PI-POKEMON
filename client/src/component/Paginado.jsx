import React from 'react';
import './Paginado.css'

export default function Paginado({pokesPerPage, allPoke, paginado}){
    const pageNumbers = []


    for (let i=0; i<=Math.ceil(allPoke/pokesPerPage); i++){
        pageNumbers.push(i+1)
    }//tomo el nro redondo(metodo ceil) de dividir los personajes en las paginas 


        return ( 
            <nav>
            <div className='paginado'>

            <ul  className='paginadoContainer'>
                {pageNumbers && 
                pageNumbers.map(number=>(
                    <li  className='li' key={number}>
                        <a>

                    <button  className='button' id='button' onClick={() =>paginado(number)}>{number}</button>
                </a>
                    </li>
                ))}
            </ul>
                </div>
        </nav>
        )

}




