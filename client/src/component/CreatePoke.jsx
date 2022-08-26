import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postPokemons, getTypes } from '../action/index'
import { useDispatch, useSelector } from "react-redux";
import './CreatePoke.jsx'

function validate(input) {
    const imgValidate = /(https?:\/\/.*\.(?:png|jpg))/;
        let testName = /^[A-Z][a-z][^$()!¡@#/=¿{}?*%&|<>#]*$/;
    let errors = {};

    if(!input.name) {
      errors.name = "Name is Required";
    }
    else if (!testName.test(input.title)) {
        errors.name = 'Start the title with capital letter. Only characters "":.,_- are accepted'
    }
      else if (input.life < 0 || input.life > 100) {
        errors.life = 'Please enter a number between 0 and 100'
      }
      else if (input.strength < 0 || input.strength > 100) {
        errors.strength = 'Please enter a number between 0 and 100'
      }
      else if (input.defense < 0 || input.defense > 100) {
        errors.defense = 'Please enter a number between 0 and 100'
      }
      else if (input.speed < 0 || input.speed > 100) {
        errors.speed = 'Please enter a number between 0 and 100'
      }
      else if (input.height < 0 || input.height > 100) {
        errors.height = 'Please enter a number between 0 and 100'
      }
      else if (input.weight < 0 || input.weight > 100) {
        errors.weight = 'Please enter a number between 0 and 100'
      }
      else if (!input.type) {
        errors.type = 'Please select Type'
      }
      else if (!input.image || !imgValidate.test(input.image)) {
        errors.image = 'Please insert an image type URL'
    }  
    return errors;
  }


export default function PokeCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        life: "",
        strength: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        types: [],
    });

    

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }
    function handleSelect(e) {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault(); // evitamos volver a cargar la pagina evento por default
        console.log(input)
        dispatch(postPokemons(input));
        alert(`Pokemon created successfully!`);
        setInput({
            name: "",
            life: "",
            strength: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            image: "",
            types: []
        });
        history.push("/home");
    }

    function handleDelete(el){
    setInput({
        ...input,
        types: input.types.filter(di => di !== el)
    })
    }


    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

    return (
        <div >
            <div>
                <div>
                <button><Link  to='/home'>Back home</Link></button>
                </div>
                
                <div>
                    
            <h1 className="title">Create your Poke</h1>

                </div>
            <form className={errors && 'danger'} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.name && <p>{errors.name}</p>}
                </div>

                <div>
                    <label>Life</label>
                    <input
                        type='range'
                        value={input.life}
                        name='life'
                        min="0"
                        max="200"
                        onChange={(e) => handleChange(e)}
                        />
                         {errors.life && <p>{errors.life}</p>}
                </div>

                <div>
                    <label>Image(URL)</label>
                    <input
                        type='text'
                        value={input.image}
                        name='image'
                        onChange={(e) => handleChange(e)}
                        />
                         {errors.image && <p>{errors.image}</p>}
                </div>

                <div>
                    <label>Strength:</label>
                     <input
                       type="range"
                       value={input.strength}
                       name="strength"
                       min="0"
                       max="100"
                       onChange={(e) => handleChange(e)}
                     />
                      {errors.strength && <p>{errors.strength}</p>}
                    
                 </div>

            

                <div>
                    <label>Defense</label>
                    <input
                        type='range'
                        value={input.defense}
                        name='defense'
                        min="0"
                        max="100"
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.defense && <p>{errors.defense}</p>}
                </div>

                <div>
                    <label>Speed :</label>
                    <input
                        type="range"
                        value={input.speed}
                        name="speed"
                        min="0"
                        max="100"
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.speed && <p>{errors.speed}</p>}
                </div>

                <div>
                    <label>Heigth</label>
                    <input
                        type='range'
                        value={input.height}
                        name='height'
                        onChange={(e) => handleChange(e)}
                        />
                         {errors.height && <p>{errors.height}</p>}
                </div>

                <div>
                      <label>Weight:</label>
                      <input
                        type="range"
                        value={input.weight}
                        name="weight"
                        onChange={(e) => handleChange(e)}
                      />
                        {errors.weight && <p>{errors.weight}</p>}                      
                    
                 </div>




                    
                              
                <select onChange={(e) => handleSelect(e)}>
                    {types.map((type, t ) => (
                        <option  key={t} value={type.name}>{type.name}</option>
                        ))}
                </select>




                <ul><li
                className="li"
                >{input.types.map(el => el + ', ')} </li></ul>

                <div>
            <button className="button" id="button" type="submit" disabled={!input.name} >Create Pokemon</button>

                </div>
                      





            
            </form>
            
            {input.types.map(el=>
            <div>
                <p>{el}</p>
                <button className="button" id="button" onClick={() => handleDelete(el)}> x </button>
            </div>              
                        
                        )}
            </div>
        </div>
    )


}
