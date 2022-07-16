import React from "react";
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, filterRecipesCraeted, orderByHealthScore, orderByName, filterRecipesByDiets, getDiets, clean} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Filter from "./Filter";


export default function Home(){

    const dispatch= useDispatch(); //para despachar mis acciones
    const allRecipes= useSelector((state) => state.recipes);
    const diets= useSelector((state) => state.diets)

     //estados locales
     const [currentPage, setCurrentPag] = useState(1);// pag actual y setee la pagina actual(numero)
     const [recipesPerPage, setRecipesPerPage]= useState(9); //los pokemons por pagina
 
     const indexOfLastRecipes = currentPage * recipesPerPage; //indice del ultimo personaje
     const indexOfFirstRecipes=  indexOfLastRecipes- recipesPerPage; // indece del primer personaje
     const currentRecipes =  allRecipes.slice(indexOfFirstRecipes , indexOfLastRecipes)//guarda todos los personajes por pagina actual que se seleciones
 
     function paginado(pageNumber){
         setCurrentPag(pageNumber)
     }
 
 
     const [orden , setOrden] = useState('')
     const [orden2, setOrden1] = useState(0)

    useEffect(()=> {
        dispatch(getRecipes());
        dispatch(getDiets());
        dispatch(clean())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes())
    }

    function handleFilterDiets(e){
        dispatch(filterRecipesByDiets(e.target.value))
        setCurrentPag(1)
    }
    
    function handleFilterCreated(e){
        dispatch(filterRecipesCraeted(e.target.value))
        setCurrentPag(1)
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPag(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSort2(e){
        e.preventDefault();
        dispatch(orderByHealthScore(e.target.value))
        setCurrentPag(1);
        setOrden1(`Ordenado ${e.target.value}`)
    }
    


    return (
        <div>
            <div>
                <h3>API FOOD</h3>
                <SearchBar></SearchBar>
                <Link to= '/recipes'>
                    <button>CREATE RECIPE</button>
                </Link>
            </div>
            <button onClick={e => handleClick(e)}>Volver a cargar Recetas</button>

            

            {/* <Filter setCurrentPag={setCurrentPag}></Filter> */}

            <div>
                <label>Orden by name: </label>
                <select onChange={e=> handleSort(e)}>
                    <option value='asc'>A-Z</option>
                    <option value='des'>Z-A</option>
                </select>
                <label>Orden by Health Score: </label>
                <select onChange={e => handleSort2(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='des'>Desendente</option>
                </select>
                <label>Filter by origin: </label>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value="all">Todos</option>
                    <option value="crea">Creados</option>
                    <option value="exis">Existentes</option>
                </select>
                <label>Filter by diets: </label>
                <select onChange={e => handleFilterDiets(e)}>
                    <option value="all">Todos</option>
                    {diets.map(t => {
                        return <option value={t.name}>{t.name.toUpperCase()}</option>
                    })}
                </select>
            </div>

            <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}></Paginado>

            
            {
                //estoy renderizando todos los pokemons y solo tomo los poke x pagina
                currentRecipes.map(e => {
                    return (
                        <Link to={'/home/' + e.id}>
                        <div>
                            <Card name={e.name} diets={e.diets.map(t=> t.toUpperCase())} dishTypes={e.dishTypes.map(dt=> dt.toUpperCase())} image={e.image}  key={e.id}></Card>
                        </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

