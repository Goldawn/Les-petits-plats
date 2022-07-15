async function search(currentKeywordsList) {
    
    const searchInput = document.getElementById("recipe-search");
    const recipes = await getRecipes()
    
    async function filterRecipes() {
        const recipesContainer = document.getElementById("recipes-container")
        const ingredientListContainer = document.querySelector("#ingredient-list-container");
        const apparelListContainer = document.querySelector("#apparel-list-container");
        const utensilListContainer = document.querySelector("#utensil-list-container");
        const ingredientList = document.querySelector("#ingredient-list-container > ul");
        const apparelList = document.querySelector("#apparel-list-container > ul");
        const utensilList = document.querySelector("#utensil-list-container > ul");

        let filteredRecipes =[]
        if(searchInput.value.length > 2) {
            recipes.forEach(recipe => {
                if (recipe.name.toLowerCase().includes(searchInput.value.toLowerCase()) || recipe.description.toLowerCase().includes(searchInput.value.toLowerCase())) {
                    filteredRecipes.push(recipe)
                }
            })
            console.log(filteredRecipes)
            console.log(currentKeywordsList)
            recipesContainer.innerHTML="";
            displayRecipes(filteredRecipes)
            const recipeKeywords = await getRecipeKeywords(filteredRecipes)
            ingredientListContainer.removeChild(ingredientList)
            apparelListContainer.removeChild(apparelList)
            utensilListContainer.removeChild(utensilList)
            displayIngredients(recipeKeywords);
            displayApparels(recipeKeywords);
            displayUtensils(recipeKeywords);
        }
        else {
            console.log(currentKeywordsList)
            recipesContainer.innerHTML="";
            displayRecipes(recipes)
            const recipeKeywords = await getRecipeKeywords(recipes)
            ingredientListContainer.removeChild(ingredientList)
            apparelListContainer.removeChild(apparelList)
            utensilListContainer.removeChild(utensilList)
            displayIngredients(recipeKeywords);
            displayApparels(recipeKeywords);
            displayUtensils(recipeKeywords);
        }
    }
    
    
    searchInput.addEventListener("input", filterRecipes)

}