import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { getDiets, postRecipes } from '../actions';
import { useDispatch, useSelector } from 'react-redux';


export default function CreateFood(){
    const dispatch = useDispatch();
    const history=useHistory()
    const diets= useSelector((state) => state.diets)

    //estados locales para los errores

    const [errors, setErrors]= useState({})

    //estado local donde voy a guardar mis valores mandados del formulario

    const [input, setInput]= useState({
        name: '',
        image:'',
        summary:'',
        healthScore:'',
        steps:'',
        diets:[]
    })

    useEffect(()=>{
        dispatch(getDiets())
    }, [dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
        // setErrors(validate({
        //     ...input,
        //     [e.target.name] : e.target.value
        // }))
    }


    function handleSelect(e){
        if(!input.types.includes(e.target.value)){
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })

        }
        
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postRecipes(input));
        alert('¡POKEMON CREADO!');
        setInput({
            name: '',
            image:'',
            summary:'',
            healthScore:'',
            steps:'',
            diets:[]
        })
        history.push('/home')
    }

    // function validate(){
    //     let errors={};
    
    //     if(!input.name){
    //         errors.name= 'Se requiere un nombre'
    //     }else if(typeof input.hp === 'number'){
    //         errors.hp= 'Se requiere un numero entero'
    //     }else if(typeof input.attack === 'number'){
    //         errors.attack= 'Se requiere un numero entero'
    //     }else if(typeof input.defense === 'number'){
    //         errors.defense= 'Se requiere un numero entero'
    //     }else if(typeof input.speed === 'number'){
    //         errors.speed= 'Se requiere un numero entero'
    //     }else if(typeof input.height === 'number'){
    //         errors.height= 'Se requiere un numero entero'
    //     }else if(typeof input.weight === 'number'){
    //         errors.weight= 'Se requiere un numero entero'
    //     }else if(diets.length>0){

    //         errors.type= 'Solo puede elegir dos'
    //     }
        
    
    //     return errors
    // }
    
    function handleDelete(el){
        setInput({
            ...input,
            types: input.types.filter(t => t !== el)
        })
    }

    return(
        <div>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            <div>
            <h1>CREATE YOUR RECIPE</h1>
            <form onSubmit={e => handleSubmit(e)} className='formu'>
                <div>
                    <label>Name: </label>
                    <input type="text" name='name' value={input.name} onChange= {e => handleChange(e)}/>
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                <div>
                    <label>Image: </label>
                    <input type="text" name="image" value={input.image} onChange= {e => handleChange(e)}/>
                    {errors.image && (<p>{errors.image}</p>)}
                </div>
                <div>
                    <label>Summary: </label>
                    <input type="text" name="summary" value={input.summary} onChange= {e => handleChange(e)}/>
                    {errors.summary && (<p>{errors.summary}</p>)}
                </div>
                <div>
                    <label>HealthScore: </label>
                    <input type="number" name="healthScore" value={input.healthScore} onChange= {e => handleChange(e)}/>
                    {errors.healthScore && (<p>{errors.healthScore}</p>)}
                </div>
                <div>
                    <label>Steps: </label>
                    <input type="text" name="steps" value={input.steps} onChange= {e => handleChange(e)}/>
                    {errors.steps && (<p>{errors.steps}</p>)}
                </div>
               
                <select onChange={e => handleSelect(e)}>
                    {diets.map(t => {
                        return <option value={t.name}>{t.name.toUpperCase()}</option>
                    })}
                </select>
                <button type='submit'>Create Recipe</button>

            </form>

            {
                input.diets.map(el => {
                    return (
                        <div>
                            <button onClick={()=> handleDelete(el)}>x</button>
                            <p>{el.toUpperCase()}</p>
                        </div>
                    )
                })
            }
            </div>

            
        </div>
    )
}
