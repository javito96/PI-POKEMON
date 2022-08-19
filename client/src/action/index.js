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