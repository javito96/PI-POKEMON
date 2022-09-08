import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePoke } from "../action";
import "./SearchPoke.css";

export default function SearchPoke() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputPoke(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNamePoke(name));
  }

  return (
    <div className="div">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInputPoke(e)}
      />

      <button
        className="buttonBusqueda"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
