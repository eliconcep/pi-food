import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../actions";

export default function SearchBar(){
    const dispatch =useDispatch();

    const [name, setName] = useState('')//estado local  guarda lo que optiene al buscar

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }//toma el valor y setea el nombre                            

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameRecipes(name))
    }
    return (
        <div>
            <input type='text' placeholder="Search Recipe..." onChange={e=> handleInputChange(e)}></input>
            <button type="submit" onClick={e=> handleSubmit(e)}>Search</button>
        </div>
    )
}