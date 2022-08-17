const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {Pokemon, Type} = require('../db');



const router = Router();



const getApiInfo= async ()=>{
    try {
        let pokeArreglo=[];
        const pokeApi = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')
        let pokeInfo = pokeApi.data.results.map( p => axios.get(p.url))
        
        let pokeResults = axios.all(pokeInfo).then( poke => {
            poke.map( p => {
                pokeArreglo.push({
                    id: p.data.id,
                    name: p.data.name,
                    hp: p.data.stats[0].base_stat,
                    attack: p.data.stats[1].base_stat,
                    defense: p.data.stats[2].base_stat,
                    speed: p.data.stats[5].base_stat,
                    height: p.data.height,
                    weight: p.data.weight,
                    types: p.data.types.map(t=>t.type.name),
                    img: p.data.sprites.other.home.front_default,

                    // img:"official-artwork": {
                    // "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                })
            })
            return pokeArreglo;
        })
        return pokeResults
    } catch (error) {
        console.log(error)
    }
};



const getDBInfo = async ()=>{
    return await Pokemon.findAll ({
        include:{
            model: Type,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        }
    })
}


const getAllPokemons= async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}





router.get('/pokemons', async (req, res) =>{
    const name = req.query.name
    let pokemonsTotal = await getAllPokemons();
    if(name){
        let pokemonName = await pokemonsTotal.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
        pokemonName.length ?//!http://localhost:3001/recipe?title=brown+rice 
        res.status(200).send(pokemonName):
        res.status(404).send(`pokemon ${name} no incluido!!`);

    }else {
        res.status(200).send(pokemonsTotal)
    }
})




router.get('/types', async (req, res, next) => {
    try{
    const typesApi = (await axios.get('https://pokeapi.co/api/v2/type')).data.results.map(e=>({
        name: e.name
    }));
    await Type.bulkCreate(typesApi)
    console.log('types cargados en BD')
    res.status(200).send(typesApi)
}catch(error){
    next.error
}

  
})




// router.post("/recipe", async (req, res) => {
//     const { title, summary, image, healthScore, spoonacularScore, steps, createInDb, diets, } = req.body

    
//     const recipeCreated = await Recipe.create({
        
//         title,
//         summary,
//         image,
//         healthScore,
//         spoonacularScore,
//         steps,
//         createInDb,        
//     })
//     const typeOfDiet = await Diet.findAll({
//         where : {title : diets}
//     })
//      await recipeCreated.addDiet(typeOfDiet)
//     return res.status(200).send("recipe created successfully!")


// })


// router.get("/recipe/:id", async (req, res) => {
//     const id = req.params.id
//     const recipesTotal = await getAllRecipe()
//         if(id) {
//             let recipeId = await recipesTotal.filter(e => e.id == id) 
//             recipeId.length ?
//             res.status(200).json(recipeId) :
//             res.status(404).send("recipe not found!")
//         }
//         }); 


module.exports = router; 