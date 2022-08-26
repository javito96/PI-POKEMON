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
            <div>
            {
              myPokemon.length > 0 ?

                <div className='detail'>

            <button>
           <Link className="button" id='button' to="/home">
             Return
           </Link>
            </button>


                  <div>
                    <h1>{myPokemon[0].name[0].toUpperCase() + myPokemon[0].name.slice(1)}</h1>
                    <img src={myPokemon[0].image} alt="" width="400px" height="400px" />
                  </div>



                  <div style={{fontSize: '1.3em',}}>
                    <h3>Type: {myPokemon[0].type ? myPokemon[0].type + ' ' : myPokemon[0].types.map(t => t.name + (' '))} </h3>
                    <h5 style={{marginTop: '100px',}}>Life: {myPokemon[0].life}</h5>
                    <h5>Strength: {myPokemon[0].strength}</h5>
                    <h5>Defense: {myPokemon[0].defense}</h5>
                    <h5>Speed: {myPokemon[0].speed}</h5>
                    <h5>Height: {myPokemon[0].height}</h5>
                    <h5>Weight: {myPokemon[0].weight}</h5>
                    <h6>Id: {myPokemon[0].id}</h6>
                  </div>
                </div> :
                <div>
             <Loading/>
                </div>
            }      
          </div>                        
        )
}