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

export function orderByName(payload){
    return{
        type: 'ORDER_NAME',
        payload
    }
}

export function orderByAttack(payload){
    return{
        type: 'ORDER_ATTACK',
        payload
    }
}

export function getNamePoke(name){
    return async function (dispatch){
        try{
            var json = await axios.get('http://localhost:3001/pokemons?name='+name);
            return dispatch({
                type: 'GET_NAMEPOKE',
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}