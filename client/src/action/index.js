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
            alert('pokemon no encontrado')
        }
    }
}

export function getTypes() {
    return async function (dispatch) {
        const info = await axios("http://localhost:3001/types", {

        })
        return dispatch({type: 'GET_TYPES', payload: info.data})
    }
}

export function postPokemons(payload){
    return async function(){
        const response = await axios.post('http://localhost:3001/pokemons', payload)
        console.log(response)
        return response;
    }
}

export function getDetail(id) {
    return async function (dispatch){
        dispatch({type: 'CARGANDO'});
        let json = await axios.get('http://localhost:3001/pokemons/'+id)
        return dispatch({
            type: 'GET_DETAIL',
            payload:json.data
        })
    }
}

export function clearDetail(payload) {
    return {
      type: 'CLEAR_DETAIL',
      payload
    }
  }