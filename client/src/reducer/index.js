const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: [],
    cargando: false,
    detail:[]
    
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_POKEMONS':
        return{
            ...state,
            pokemons: action.payload,
            allPokemons: action.payload           
        }
        case 'FILTER_TYPES':
            const allPokemons= state.allPokemons
            const typesFiltered = action.payload === 'all' ? allPokemons : 
                allPokemons.filter(el=>el.types.includes(action.payload) || 
                el.types.map((el) => el.name).includes(action.payload))

                return {
                    ...state,
                    pokemons: typesFiltered,
                }


                case 'FILTER_DB':
                    const allPokemones= state.allPokemons
                    const createdFilter = action.payload === 'created' ? allPokemones.filter(e=> e.createdInDb) :
                    allPokemones.filter(e=> !e.createdInDb)
                    return{
                        ...state,
                        pokemons: action.payload === 'all' ? state.allPokemons : createdFilter
                    }


                case 'ORDER_NAME':
                    const sortArr = action.payload === 'asc' ?
                state.pokemons.sort(function (a, b){
                    if(a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name){
                        return -1;
                    }    
                    return 0;                
                }) :
                state.pokemons.sort(function(a, b) {  //de forma descendente
                    if(a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name){
                        return 1
                    }
                    return 0;
                })
                return{
                    ...state,
                    pokemons: sortArr
                };


                case 'ORDER_ATTACK':

                    const sortArr1 = action.payload === 'max' ?
                    state.pokemons.sort(function (a, b){
                        if(a.attack > b.attack) {
                            return 1;
                        }
                        if (b.attack > a.attack){
                            return -1;
                        }    
                        return 0;                
                    }) :
                    state.pokemons.sort(function(a, b) {  //de forma descendente
                        if(a.attack > b.attack) {
                            return -1;
                        }
                        if (b.attack > a.attack){
                            return 1
                        }
                        return 0;
                    })
                    return{
                        ...state,
                        pokemons: sortArr1
                    };

                 case  'GET_NAMEPOKE':
                        return {
                            ...state,
                            pokemons: action.payload
                        }

                case 'GET_TYPES':
                    return {
                        ...state,
                        types: action.payload
                    }


                 case 'POST_POKEMONS':
                       return {
                 ...state,
              }

              case 'GET_DETAIL':
                return{
                    ...state,
                    detail: action.payload,
                    cargando: false,
                }

                
                case 'CLEAR_DETAIL':
                    return {
                      ...state,
                      detail: []
                    }

                
                
            

        default:
             return state
    }
}

export default rootReducer;