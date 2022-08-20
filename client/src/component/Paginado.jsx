import React from 'react';


export default function Paginado({pokesPerPage, allPoke, paginado}){
    const pageNumbers = []


    for (let i=0; i<=Math.ceil(allPoke/pokesPerPage); i++){
        pageNumbers.push(i+1)
    }//tomo el nro redondo(metodo ceil) de dividir los personajes en las paginas 


        return ( 
            <nav>
            <div>

            <ul>
                {pageNumbers && 
                pageNumbers.map(number=>(
                    <li  key={number}>
                        <a>

                    <button   onClick={() =>paginado(number)}>{number}</button>
                </a>
                    </li>
                ))}
            </ul>
                </div>
        </nav>
        )

}




