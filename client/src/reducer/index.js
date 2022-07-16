const initialState= {
    recipes : [],
    details:[], 
    allrecipes:[],
    diets: []
}

export default function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allrecipes: action.payload
            }
        case 'FILTER_BY_DIETS':
            const recipesAll = state.allrecipes;
            const typeFilter = action.payload === 'all' ? recipesAll : recipesAll.filter(e => e.diets.includes(action.payload));
    
            return {
                ...state,
                recipes: typeFilter
            }
        case 'FILTER_BY_CREATED':
            const todos = state.allrecipes;
            const createdFilter= action.payload === 'crea' ? todos.filter(e => e.createInBD) : todos.filter(e => !e.createInBD)
                return{
                    ...state,
                    recipes: action.payload === 'all' ? todos : createdFilter
                }
        case 'ORDER_BY_NAME':
            let sortArr = action.payload ==='asc' ?
            state.recipes.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.recipes.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                recipes: sortArr
            }
        case 'ORDER_BY_HEALTHSCORE':
            let sort2 = action.payload ==='asc' ?
            state.recipes.sort(function(a,b){
                if(a.healthScore > b.healthScore){
                    return 1;
                }
                if(b.healthScore > a.healthScore){
                    return -1;
                }
                return 0;
            }) :
            state.recipes.sort(function(a,b){
                if(a.healthScore > b.healthScore){
                    return -1;
                }
                if(b.healthScore > a.healthScore){
                    return 1;
                }
                return 0;
            })
                
            return{
                ...state,
                recipes: sort2
            }
        case 'GET_NAME_RECIPES':
            return {
                ...state,
                recipes:action.payload
            }
        case 'GET_DETAILS':
            return{
                ...state,
                details:action.payload
            }
        case 'CLEAN':
            return{
                ...state,
                details: action.payload,
                recipes: action.payload,
                diets: action.payload
            }
        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
            }
        case 'POST_RECIPES':
            return{
                ...state
            }
        default:
            return state;
    }
}