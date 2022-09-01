import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPoke,
  fulterPokemonsByTypes,
  filterDB,
  orderByName,
  orderByAttack,
} from "../action";
import Card from "./Card";
import { Link } from "react-router-dom";
import Paginado from "./Paginado";
import SearchPoke from "./SearchPoke";
import "./Home.css";
import Loading from "./Loading";

export default function Home() {
  const dispatch = useDispatch();
  const allPoke = useSelector((state) => state.pokemons);

  const [currentPage, setCurrentPage] = useState(1); //estado local con primer pag que renderiza
  const [pokesPerPage] = useState(12); //en la primer pag trae 9 recetas
  const indexOfLastPokes = currentPage * pokesPerPage; //numero del ultimo indice multiplicado pag, ej recetas 9 pag nro3 = 27
  const indexOfFirstPokes = indexOfLastPokes - pokesPerPage; //indice de ultima receta - recetas por pag igual a indice de primer receta
  const currentPokes = allPoke.slice(indexOfFirstPokes, indexOfLastPokes); //slice toma una porcion de lo que yo le paso por parametro
  const [Ordenado, setOrder] = useState("");
  const [loading, setLoading] = useState(false);

  const paginado = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  }; // ayuda renderizado

  useEffect(() => {
    setLoading(true);
    dispatch(getPoke());
    setLoading(false);
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPoke());
  }

  function handleFilterByType(e) {
    dispatch(fulterPokemonsByTypes(e.target.value));
    setCurrentPage(1);
  }

  function hadleFilterDB(e) {
    dispatch(filterDB(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleByAttack(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <div className="back1">
      {loading && <Loading />}
      <h1 className="title">POKLEJO</h1>
      <div>
        <Link to="/poke">
          <button id="button">CREATE NEW POKEMON</button>
        </Link>

        <button
          id="button"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          LOAD POKEMONS
        </button>
      </div>

      <h5></h5>

      <select onChange={(e) => handleSort(e)}>
        <option disabled selected defaultValue>
          Alphabetical order
        </option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>

      <select onChange={(e) => handleByAttack(e)}>
        <option disabled selected defaultValue>
          Attack order
        </option>
        <option value="max">MAX</option>
        <option value="min">MIN</option>
      </select>

      <select onChange={(e) => hadleFilterDB(e)}>
        <option disabled selected defaultValue>
          Filter new/existing{" "}
        </option>
        <option value="all">All</option>
        <option value="created">Created</option>
        <option value="ex">Existing</option>
      </select>

      <select onChange={(e) => handleFilterByType(e)}>
        <option disabled selected defaultValue>
          Filter by types
        </option>
        <option value="normal">Normal</option>
        <option value="fighting">Fighting</option>
        <option value="flying">Flying</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="rock">Rock</option>
        <option value="bug">Bug</option>
        <option value="ghost">Ghost</option>
        <option value="steel">Steel</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="psychic">Psychic</option>
        <option value="ice">Ice</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="fairy">Fairy</option>
        <option value="unknown">Unknown</option>
        <option value="shadow">Shadow</option>
      </select>

      <div>
        {" "}
        <SearchPoke />{" "}
      </div>

      <div className="cards">
        {currentPokes?.map((c) => {
          return (
            <div key={c.id}>
              <div>
                <Link className="subrayado" to={"/detail/" + c.id}>
                  <Card
                    id={c.id}
                    key={c.id}
                    name={c.name}
                    types={c.types}
                    img={c.img}
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <Paginado
          pokesPerPage={pokesPerPage}
          allPoke={allPoke.length - 1}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
