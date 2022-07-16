import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clean } from "../actions";

export default function Card({name, diets, dishTypes, image}){
    // const  dispatch= useDispatch()
    // useEffect(() => {
    //     dispatch(clean())
    // }, [dispatch]
    // )
    return (
        <div className="card">
            <h3>{name}</h3>
            <img src={image} alt="image not found" width='200px' height='200px'/>
            <h5>DishTypes: {dishTypes}</h5>
            <h5>Diets: {diets}</h5>
        </div>
    )
}