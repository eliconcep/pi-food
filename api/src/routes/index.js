const { Router } = require('express');
const info = require('../../respuesta.json') 
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require('axios');
const {Recipe, Diet}= require('../db'); 


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const apiF= async() =>{
  // const info = await axios.get('https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=043f01d99a814bc8a9ac95c081197dc7&addRecipeInformation=true');
  const prueba = info
  // const foods = await info.data.results.map(e => {
    const foods = prueba.results.map(e => {
    const diets = e.diets;
      if (e.vegetarian === true) {
        e.diets.includes("vegetarian")
          ? e.diets
          : diets.push("vegetarian");
      }
    return {
      id: e.id,
      name: e.title,
      image: e.image,
      dishTypes:e.dishTypes.map(dt=> dt),
      summary: e.summary.replace(/(<([^>]+)>)/gi, ""),
      healthScore: e.healthScore,
      steps: e.analyzedInstructions[0]?.steps.map(d => {
        return {
          number:d.number, 
          step:d.step
        }}),
        diets: diets
      // diets: e.diets.map(d => {
      //   return {
      //     name: d
      //   }
      // })
    }
  })
  return foods;
}

// const getDbInfo = async () => {
//   const dbData = await Recipe.findAll({ include: Diet });
//   const dbRecipes = await dbData.map((recipe) => {
//     return {
//       id: recipe.id,
//       name: recipe.name,
//       image: recipe.image,
//       diets: recipe.diets.map((e) => e.name),
//       dishTypes: recipe.dishTypes,
//       healthScore: recipe.healthScore,
//       summary: recipe.summary,
//       instructions: recipe.instructions, //.map((e) => e),
//       // accedo a la tabla diets mediante recipe.diets, lo cual

const dbInfo= async ()=> {
  const dbData = await Recipe.findAll({ include: Diet });
  const dbRecipes = await dbData.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      diets: recipe.diets.map((e) => e.name),
      dishTypes: recipe.dishTypes,
      healthScore: recipe.healthScore,
      summary: recipe.summary,
      steps: recipe.steps //.map((e) => e),
      // accedo a la tabla diets mediante recipe.diets, lo cual
    }
  })

  return dbRecipes

    // return await Recipe.findAll({ //traigo la info de la bd
    //     include:{
    //         model: Diet, // me traigo el mdelo xq si no nunca me va a incluir los modelos en la creacion 
    //         atributes: ['name'],
    //         through:{ // trae los atributos que pide
    //             atributes:[]
    //         }
    //     }
    // })
}

const allFoods= async() =>{
    const infoAPI= await apiF();
    const infoDB= await dbInfo();
    const allInfo = infoAPI.concat(infoDB); // con el metodo concat concateno las dos informaciones 
    return allInfo;
}

const apiDiets= async () => {
    // const foods = await axios.get('https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=043f01d99a814bc8a9ac95c081197dc7&addRecipeInformation=true')
    const foods = info
    // const dietsA= await foods.data.results.map(e  => e.diets);
    const dietsA= foods.results.map(e  => e.diets);

    const dietsB = dietsA.flat()

    const types= [...new Set(dietsB), 'vegetarian']

  return types
}

router.get('/recipes', async(req, res, next) => {
    try {
        const {name}= req.query
        let recipeAll= await  allFoods(); // me traigo todos lo pokemones
        
        if(name){
            let foodName= await recipeAll.filter(e=> e.name.toLowerCase().includes(name.toLocaleLowerCase()))//le hago el metodo toloercase para no tener problema en como recibe el name o por como esta en mi info

            //con un ternario pregunto si hay algo en mi pokename 
            foodName.length ?
            res.status(200).send(foodName) :
            res.status(404).send('Food not found')
        }else{
            res.status(200).send(recipeAll)
        }
    } catch (error) {
        next(error)
    }
})

router.get('/recipes/:id', async(req, res)=>{
    const id = req.params.id
    const recipesALL= await allFoods();

    if(id){
      let foodId= await recipesALL.filter(e => e.id == id)

      foodId.length ?
      res.status(200).json(foodId): 
      res.status(404).send('Not found recipe by ID')
    }
})


router.post('/recipes', async(req, res, next)=> {
    const {name,diets, image, summary, dishTypes, healthScore, steps, createInBD} = req.body;
  
    try {
      //creo un nuevo pokemon en la base de datos con lo que mande por body
      const newFood = await Recipe.create({
        name,
        image,
        summary,
        healthScore,
        steps,
        createInBD
      });

      // me traigo todas las types pero me traera el type que coincida con lo que mando por body
    
      let dietDB= await Diet.findAll({
        where:{
          name: diets
        }
      })
    
      newFood.addType(dietDB); // me trae de la tablatype el que quiero agragar eñ nuevo pokemon

      console.log(newFood.toJSON())

      res.status(201).send('Recipe created')
    } catch (error) {
      next(error)
      res.status(404).send('Recipe not created')
    }
  })


  router.get('/diets', async(req, res)=>{
   try {
    const foodsA = await apiDiets()

    foodsA.forEach(e => {
      Diet.findOrCreate({
        where : {
          name: e 
        }
      })
    });

    const allDiets = await Diet.findAll()
    res.send(allDiets)
   } catch (error) {
    console.log(error)
    res.status(404)
   }
})




module.exports = router;
