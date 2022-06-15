// Fonction qui récupère les recettes du fichier json
async function getRecipes () {
    const result = await fetch("data/recipes.json")
    const recipes = await result.json()
    return(recipes)
}

// fonction qui utilise les données récupérées par le json et retourne un objet qui contient la liste des ingrédients, appareils et ustensiles de toutes les recettes
async function getRecipeKeywords(recipes) {

    const recipeKeywords = {
        ingredients : [],
        apparels : [],
        utensils : []
    }

    recipes.forEach((recipe) => {

        recipe.ingredients.forEach(( ingredient => {
            // if ( !recipeKeywords.ingredients.includes(ingredient.ingredient.toLowerCase())) {
            //     recipeKeywords.ingredients.push(ingredient.ingredient.toLowerCase()) 
            // }
            const alreadyExist = recipeKeywords.ingredients.find(elem => {
                return elem.toLowerCase() === ingredient.ingredient.toLowerCase();
            })
            if (!alreadyExist) {
                recipeKeywords.ingredients.push(ingredient.ingredient)
            }
        }))
        
        // if ( !recipeKeywords.apparels.includes(recipe.appliance.toLowerCase())) {
        //     recipeKeywords.apparels.push(recipe.appliance.toLowerCase()) 
        // }
        const alreadyExist = recipeKeywords.apparels.find(elem => {
            return elem.toLowerCase() === recipe.appliance.toLowerCase();
        })
        if (!alreadyExist) {
            recipeKeywords.apparels.push(recipe.appliance)
        }

        recipe.ustensils.forEach(( ustensil => {
            // if ( !recipeKeywords.utensils.includes(ustensil.toLowerCase())) {
            //     recipeKeywords.utensils.push(ustensil.toLowerCase()) 
            // }
            const alreadyExist = recipeKeywords.utensils.find(elem => {
                return elem.toLowerCase() === ustensil.toLowerCase();
            })
            if (!alreadyExist) {
                recipeKeywords.utensils.push(ustensil)
            }
        }))
    });

    return(recipeKeywords)
}

// Fonction qui récupère les recettes générés du DOM et les affiche sur la page
async function displayRecipes(recipes) {
    const recipesContainer = document.querySelector("#recipes-container");
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeDOM = recipeModel.getRecipeDOM();
        recipesContainer.appendChild(recipeDOM);
    });
}

// Fonction qui récupère la liste des ingrédients générés du DOM et les affiche sur la page
async function displayIngredients(recipeKeywords) {
    const ingredientListContainer = document.querySelector("#ingredient-list-container");
    const ingredientModel = recipeFactory();
    const ingredientDOM = ingredientModel.getIngredientListDOM(recipeKeywords);
    ingredientListContainer.appendChild(ingredientDOM);
}

// Procédure de lancement à l'initialisation
async function init() {
    const recipes = await getRecipes()
    const recipeKeywords = await getRecipeKeywords(recipes)
    console.log(recipeKeywords)
    displayRecipes(recipes);
    displayIngredients(recipeKeywords);
}

init();