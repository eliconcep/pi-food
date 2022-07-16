import axios from 'axios';

//traigo todos los personajes 
export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/recipes")
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function filterRecipesCraeted(payload){
    return {
        type: 'FILTER_BY_CREATED',
        payload
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByHealthScore(payload){
    return {
        type: 'ORDER_BY_HEALTHSCORE',
        payload
    }
}

export function filterRecipesByDiets(payload){
    return {
        type: 'FILTER_BY_DIETS',
        payload
    }
}

export function getNameRecipes(name){
    return async function(dispatch){
        try {
            var json= await axios.get('http://localhost:3001/recipes?name=' + name)
            return dispatch({
                type: 'GET_NAME_RECIPES',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export function getDetails(id){
    return async function(dispatch){
        try {
            const json = await axios.get('http://localhost:3001/recipes/' + id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function clean(){
    return {
        type: 'CLEAN',
        payload:[]
    }
}

export function getDiets(){
    return async function(dispatch){
        var info= await axios.get('http://localhost:3001/diets')
        return dispatch({
            type:'GET_DIETS',
            payload: info.data
        })
    }
}

export function postRecipes(payload){
    return async function(dispatch){
        const res= await axios.post('http://localhost:3001/recipes', payload)
        return dispatch({
            type: 'POST_RECIPES',
            payload: res.data,
        })
    }
}
