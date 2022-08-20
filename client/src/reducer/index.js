const initialState = {
    pokemons: [],
    allPokemons: [],
    
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

        default:
             return state
    }
}

export default rootReducer;