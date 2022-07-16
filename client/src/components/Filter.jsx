import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { useState, useEffect } from "react";
import { getDiets, orderByName, orderByHealthScore, filterRecipesByDiets, filterRecipesCraeted } from "../actions";

export default function Filter({setCurrentPag}){

    const dispatch= useDispatch();
    const diets= useSelector((state) => state.diets);

    const [orden , setOrden] = useState('')
    const [orden2, setOrden1] = useState(0)

    useEffect(()=>{
        dispatch(getDiets())
    }, [dispatch])

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
    )

}
