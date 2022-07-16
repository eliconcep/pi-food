import React from "react";


export default function Paginado({recipesPerPage, allRecipes, paginado}){
    const pageNumbers= []//arreglo de numeros

    for(let i= 0; i < Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i+1)
    }

    return (
        <nav>
            <ul>
                {
                    pageNumbers && pageNumbers.map(number =>{
                        return (
                            <button onClick={() => paginado(number)} key={number}>{number}</button>
                        )
                    })
                }
            </ul>
        </nav>
    )
}