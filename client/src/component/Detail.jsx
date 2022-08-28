import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { getDetail } from '../action/index';
import './Detail.css'
import Loading from './Loading'
 
export default function Detail(){
    const dispatch = useDispatch();
    const { id } = useParams();
    const myPokemon = useSelector((state) => state.detail);
    console.log(myPokemon);
    useEffect(()=>{
        dispatch(getDetail(id));
        },[dispatch, id]);


        
        return(

            <div className='back'>
           <Link  id='button' to="/home">
             Return home
           </Link>
            {
              myPokemon.length > 0 ?

                <div className='detail'>



                  <div className='title'>
                    <h1>{myPokemon[0].name[0].toUpperCase() + myPokemon[0].name.slice(1)}</h1>
                    <img src={myPokemon[0].img} alt="image not found" width="400px" height="400px" />
                  </div>



                  <div className='lista' >
                 
                      
                    <h3>Type: {myPokemon[0].types ? myPokemon[0].types + ' ' : myPokemon[0].types.map(t => t.name + (',  '))} </h3>
                    <h5>Life: {myPokemon[0].hp}</h5>
                    <h5>Defense: {myPokemon[0].defense}</h5>
                    <h5>Speed: {myPokemon[0].speed}</h5>
                    <h5>Height: {myPokemon[0].height}</h5>
                    <h5>Weight: {myPokemon[0].weight}</h5>
                    {/* <h6>Id: {myPokemon[0].id}</h6> */}
                    <h5>attack: {myPokemon[0].attack}</h5>
                   
                  </div>
                </div> :
                <div>
             <Loading/>
                </div>
            }      
            
           
          </div>                        
        )
}