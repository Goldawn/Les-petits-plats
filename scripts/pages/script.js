console.log("yop")

// Fonction qui récupère les recettes du fichier json
async function getRecipes () {
    const result = await fetch("data/recipes.json")
    const recipes = await result.json()
    return(recipes)
}

// Fonction qui récupère les éléments générés du DOM et les affiche sur la page
async function displayRecipes(recipes) {
    const recipesContainer = document.querySelector("#recipes-container");
    console.log(recipes)

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeDOM = recipeModel.getRecipeDOM();
        recipesContainer.appendChild(recipeDOM);
    });
}

// Procédure de lancement à l'initialisation
async function init() {
    const recipes = await getRecipes()
    displayRecipes(recipes);
}

init();