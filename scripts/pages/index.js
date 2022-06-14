// Fonction qui récupère les recettes du fichier json
async function getRecipes () {
    const result = await fetch("data/recipes.json")
    const recipes = await result.json()
    return(recipes)
}

// Fonction qui récupère les éléments générés du DOM et les affiche sur la page
async function displayRecipes(recipes) {
    const recipesContainer = document.querySelector("#recipes-container");
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeDOM = recipeModel.getRecipeDOM();
        recipesContainer.appendChild(recipeDOM);
    });
}

async function getRecipeKeywords(recipes) {

    const recipeKeywords = {
        ingredients : [],
        apparels : [],
        utensils : []
    }

    recipes.forEach((recipe) => {

        recipe.ingredients.forEach(( ingredient => {
            if ( !recipeKeywords.ingredients.includes(ingredient.ingredient.toLowerCase())) {
                recipeKeywords.ingredients.push(ingredient.ingredient.toLowerCase()) 
            }
        }))
        
        if ( !recipeKeywords.apparels.includes(recipe.appliance.toLowerCase())) {
            recipeKeywords.apparels.push(recipe.appliance.toLowerCase()) 
        }

        recipe.ustensils.forEach(( ustensil => {
            if ( !recipeKeywords.utensils.includes(ustensil.toLowerCase())) {
                recipeKeywords.utensils.push(ustensil.toLowerCase()) 
            }
        }))
    });

    return(recipeKeywords)
}

// Procédure de lancement à l'initialisation
async function init() {
    const recipes = await getRecipes()
    const recipeKeywords = await getRecipeKeywords(recipes)
    console.log(recipeKeywords)
    displayRecipes(recipes);
}

init();