const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {Pokemon, Type} = require('../db');



const router = Router();



const getApiInfo= async ()=>{
    try {
        let pokeArreglo=[];
        const pokeApi = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=30')
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




router.post("/pokemons", async (req, res) => {
    const { name, hp, attack, defense, speed, height, weight, strength, img } = req.body

    
    const newPoke = await Pokemon.create({        
        name,
        hp,
        img,
        attack,
        defense,
        speed,
        height,     
        weight,  
        strength,
        img,  
    })
    const typeOfPoke = await Type.findAll({
        where : {name : req.body.types}
    })
     await newPoke.addType(typeOfPoke)
    return res.status(200).send(`Pokemon ${name} created successfully!`)


})


router.get("/pokemons/:id", async (req, res) => {
    const id = req.params.id
    const pokeTotal = await getAllPokemons  ()
        if(id) {
            let pokeID = await pokeTotal.filter(e => e.id == id) 
            pokeID.length ?
            res.status(200).json(pokeID) :
            res.status(404).send("Poke id not found!")
        }
        }); 


module.exports = router; 