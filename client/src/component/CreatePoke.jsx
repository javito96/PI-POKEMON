import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemons, getTypes } from "../action/index";
import { useDispatch, useSelector } from "react-redux";
import "./CreatePoke.css";

function validate(input) {
  const imgValidate = /(https?:\/\/.*\.(?:png|jpg))/;
  let testName = /^[A-Z][a-z][^$()!¡@#/=¿{}?*%&|<>#]*$/;
  let errors = {};

  if (!input.name) {
    errors.name = "Name is Required";
  }
  if (!testName.test(input.name)) {
    errors.name =
      'Start the title with capital letter. Only characters "":.,_- are accepted';
  }
  if (!input.hp) {
    errors.hp = "Please range of motion";
  }
  if (!input.attack) {
    errors.attack = "Please range of motion";
  }
  if (!input.defense) {
    errors.defense = "Please range of motion";
  }
  if (!input.speed) {
    errors.speed = "Please range of motion";
  }
  if (!input.height) {
    errors.height = "Please range of motion";
  }
  if (!input.weight) {
    errors.weight = "Please range of motion";
  }

  if (!input.img || !imgValidate.test(input.img)) {
    errors.img = "Please insert an image type URL";
  }
  //   if (!input.type) {
  //     errors.type = "Please select Type";
  //   }
  return errors;
}

export default function PokeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
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
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }
  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault(); // evitamos volver a cargar la pagina evento por default
    console.log(input);
    if (Object.values(errors).length > 0) {
      alert("Please fill in all the fields");
      console.log("handleSubmit ", { errors });
      // console.log('handleSubmit ', post.lifeMin);
      // console.log('handleSubmit ', post.lifeMax);
    } else {
      dispatch(postPokemons(input));
      alert(`Pokemon created successfully!`);
      setInput({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
      });
      history.push("/home");
    }
  }
  function handleDelete(el) {
    setInput({
      ...input,
      types: input.types.filter((di) => di !== el),
    });
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className="fondo">
      <div className="contaitner">
        <div>
          <Link to="/home">
            <button className="button" id="button">
              Back home
            </button>
          </Link>
        </div>

        <div>
          <h1 className="title">Create your Poke</h1>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>

          <div>
            <label>Life</label>
            <input
              type="range"
              value={input.hp}
              name="hp"
              min="0"
              max="100"
              onChange={(e) => handleChange(e)}
            />
            {errors.hp && <p>{errors.hp}</p>}
          </div>

          <div>
            <label>Attack:</label>
            <input
              type="range"
              value={input.attack}
              name="attack"
              min="0"
              max="100"
              onChange={(e) => handleChange(e)}
            />
            {errors.attack && <p>{errors.attack}</p>}
          </div>

          <div>
            <label>Defense</label>
            <input
              type="range"
              value={input.defense}
              name="defense"
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
              type="range"
              value={input.height}
              name="height"
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

          <div>
            <label>Image(URL)</label>
            <input
              type="text"
              value={input.img}
              name="img"
              onChange={(e) => handleChange(e)}
            />
            {errors.img && <p>{errors.img}</p>}
          </div>

          <div>
            <select onChange={(e) => handleSelect(e)}>
              {types.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <ul>
            <li className="li">{input.types.map((el) => el + ", ")} </li>
          </ul>

          <div>
            <button
              className="button"
              id="button"
              type="submit"
              disabled={!input.name}
            >
              Create Pokemon
            </button>
          </div>
        </form>

        {input.types.map((el) => (
          <div className="types1">
            <p>{el}</p>
            <button className="buttonx" onClick={() => handleDelete(el)}>
              {" "}
              x{" "}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
