// Fonction qui récupère les recettes du fichier json
const getRecipes = async () => {
    const result = await fetch("data/recipes.json");
    return(result.json());
}

// fonction qui utilise les données récupérées par le json et retourne un objet qui contient la liste des ingrédients, appareils et ustensiles de toutes les recettes
const getRecipeKeywords = async (recipes) => {

    const recipeKeywords = {
        ingredients : [],
        apparels : [],
        utensils : []
    }

    recipes.forEach((recipe) => {

        recipe.ingredients.forEach(( ingredient => {
            const alreadyExist = recipeKeywords.ingredients.find(elem => {
                return elem.toLowerCase() === ingredient.ingredient.toLowerCase();
            })
            if (!alreadyExist) {
                recipeKeywords.ingredients.push(ingredient.ingredient)
            }
        }))

        const alreadyExist = recipeKeywords.apparels.find(elem => {
            return elem.toLowerCase() === recipe.appliance.toLowerCase();
        })
        if (!alreadyExist) {
            recipeKeywords.apparels.push(recipe.appliance)
        }

        recipe.ustensils.forEach(( ustensil => {
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
const displayRecipes = async (recipes) => {
    const recipesContainer = document.getElementById("recipes-container");

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeDOM = recipeModel.getRecipeDOM();
        recipesContainer.appendChild(recipeDOM);
    });
}

// Fonction qui récupère la liste des ingrédients générés du DOM et les affiche sur la page
const displayIngredients = async (recipeKeywords) => {
    const ingredientListContainer = document.querySelector("#ingredient-list-container");
    const ingredientList = document.querySelector("#ingredient-list-container > ul");
    const ingredientModel = recipeFactory();
    const ingredientDOM = ingredientModel.getIngredientListDOM(recipeKeywords);
    if(ingredientList) {
        ingredientListContainer.removeChild(ingredientList)
    }
    ingredientListContainer.appendChild(ingredientDOM);
    addTag("ingredient")
}

// Fonction qui récupère la liste des appareils générés du DOM et les affiche sur la page
const displayApparels = async (recipeKeywords) => {
    const apparelListContainer = document.querySelector("#apparel-list-container");
    const apparelList = document.querySelector("#apparel-list-container > ul");
    const apparelModel = recipeFactory();
    const ingredientDOM = apparelModel.getApparelListDOM(recipeKeywords);
    if(apparelList) {
        apparelListContainer.removeChild(apparelList)
    }
    apparelListContainer.appendChild(ingredientDOM);
    addTag("apparel")
}

// Fonction qui récupère la liste des ustensiles générés du DOM et les affiche sur la page
const displayUtensils = async (recipeKeywords) => {
    const utensilListContainer = document.querySelector("#utensil-list-container");
    const utensilList = document.querySelector("#utensil-list-container > ul");
    const utensilModel = recipeFactory();
    const ingredientDOM = utensilModel.getUtensilListDOM(recipeKeywords);
    if(utensilList) {
        utensilListContainer.removeChild(utensilList)
    }
    utensilListContainer.appendChild(ingredientDOM);
    addTag("utensil")
}

// Procédure de lancement à l'initialisation
    const init = () => {

        // const recipes = await getRecipes();
        // const recipeKeywords = await getRecipeKeywords(recipes);
        // displayRecipes(recipes);
        // displayIngredients(recipeKeywords);
        // displayApparels(recipeKeywords);
        // displayUtensils(recipeKeywords);
        search();
    }


init();
