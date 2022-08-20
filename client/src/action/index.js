import axios from  'axios';

export function getPoke(){
    return async function(dispatch){
        var PK = await axios ('http://localhost:3001/pokemons')
        return dispatch({
            type: 'GET_POKEMONS',
            payload: PK.data
        })
    }
}

export function fulterPokemonsByTypes(payload){
    return {
        type: 'FILTER_TYPES',
        payload
    }
}

export function filterDB(payload){
    return{
        type: 'FILTER_DB',
        payload
    }
}