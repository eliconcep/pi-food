import React from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, clean } from "../actions/index";
import { useEffect} from "react";

export default function Details(props){

    console.log(props);

    const dispatch= useDispatch();
    const recipeId = useSelector((state) => state.details)
    console.log(recipeId)

    useEffect(() =>{
        dispatch(getDetails(props.match.params.id))
        dispatch(clean())
    }, [dispatch])

    
    

    return(
        <div>
            {
                recipeId.length>0 ?
                <div>
                    <h2>ID: {recipeId[0].id}</h2>
                    <h1>{recipeId[0].name.toUpperCase()}</h1>
                    <img src={recipeId[0].image}></img>
                    <p><h3>Summary: </h3>{recipeId[0].summary}</p>
                    <h3>HealthScore: {recipeId[0].healthScore}</h3>
                    <ul>
                        <h3>Steps:</h3>
                    {recipeId[0].steps.map(e => <li>{e.step}</li>)}
                    </ul>
                    <h3>Diets: {recipeId[0].diets.map(el => el.toUpperCase() + ('/'))}</h3>
                </div> : <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}