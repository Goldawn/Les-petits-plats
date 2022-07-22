async function search() {
    
    const searchInput = document.getElementById("recipe-search");
    let recipes = await getRecipes()

    // Fonction qui récupère la liste des tags sélectionnés
    const getToggledTags = () => {
        let toggledTags = {
            ingredientsTag: [],
            apparelsTag: [],
            utensilsTag: []
        };
        const tagList = document.querySelectorAll(".tag");
        tagList.forEach(tag => {
            if (tag.classList.contains("ingredient-tag")) {
                toggledTags.ingredientsTag.push(tag.innerText)
            }
            else if (tag.classList.contains("apparel-tag")) {
                toggledTags.apparelsTag.push(tag.innerText)
            }
            else if (tag.classList.contains("utensil-tag")) {
                toggledTags.utensilsTag.push(tag.innerText)
            }
        })
        return toggledTags;
    }

    // Fonction qui met à jour la liste des tags à afficher en supprimant ceux qui sont déjà sélectionnés
    const updateRecipeKeywords = (recipeKeywords, toggledTags) => {

        const { ingredientsTag, apparelsTag, utensilsTag } = toggledTags;
        if(ingredientsTag.length > 0) {
            ingredientsTag.forEach(ingredient => {
                const updatedIngredients = recipeKeywords.ingredients.filter(item => item !== ingredient)
                recipeKeywords.ingredients = updatedIngredients
            })
        }
        if (apparelsTag.length > 0) {
            apparelsTag.forEach(apparel => {
                const updatedApparels = recipeKeywords.apparels.filter(item => item !== apparel)
                recipeKeywords.apparels = updatedApparels
            })
        }
        if (utensilsTag.length > 0) {
            utensilsTag.forEach(utensil => {
                const updatedUtensils = recipeKeywords.utensils.filter(item => item !== utensil)
                recipeKeywords.utensils = updatedUtensils
            })
        }
    }

    const filterByTags = (filteredRecipes, toggledTags) => {

        console.log(filteredRecipes)
        console.log(toggledTags)

        const {apparelsTag, ingredientsTag, utensilsTag } = toggledTags
        if ( ingredientsTag.length > 0 ) {
                        
            let filteredByTagsRecipes = [];
            ingredientsTag.forEach( ingredientTag => {
                filteredByTagsRecipes = [];
                filteredRecipes.forEach(filteredRecipe => {
                    filteredRecipe.ingredients.forEach(ingredient => {
                        if(ingredientTag === ingredient.ingredient) {
                            filteredByTagsRecipes.push(filteredRecipe)
                            console.log(filteredByTagsRecipes)
                        }
                    })
                })
                filteredRecipes = filteredByTagsRecipes;
            })

            filteredRecipes = filteredByTagsRecipes;
        }
        if (apparelsTag.length > 0 ) {
            let filteredByTagsRecipes = [];

            filteredRecipes.forEach(recipe => {
                if(apparelsTag.includes(recipe.appliance)) {
                    filteredByTagsRecipes.push(recipe)
                    filteredRecipes = filteredByTagsRecipes;
                }
            })
        }
        if ( utensilsTag.length > 0 ) {
            let filteredByTagsRecipes = [];
            utensilsTag.forEach(utensilTag => {
                filteredByTagsRecipes = [];
                filteredRecipes.forEach(filteredRecipe => {
                    filteredRecipe.ustensils.forEach(ustensil => {
                        if(utensilTag === ustensil) {
                            filteredByTagsRecipes.push(filteredRecipe)
                            filteredRecipes = filteredByTagsRecipes;
                        }
                    })
                })
                filteredRecipes = filteredByTagsRecipes;
            })
        }
        return filteredRecipes;
    }
    
    async function filterRecipes() {
        const recipesContainer = document.getElementById("recipes-container")
        const ingredientListContainer = document.querySelector("#ingredient-list-container");
        const apparelListContainer = document.querySelector("#apparel-list-container");
        const utensilListContainer = document.querySelector("#utensil-list-container");
        const ingredientList = document.querySelector("#ingredient-list-container > ul")
        const apparelList = document.querySelector("#apparel-list-container > ul");
        const utensilList = document.querySelector("#utensil-list-container > ul");

        let filteredRecipes =[]

        if(searchInput.value.length > 2) {
            recipes.forEach(recipe => {
                if (recipe.name.toLowerCase().includes(searchInput.value.toLowerCase()) || recipe.description.toLowerCase().includes(searchInput.value.toLowerCase())) {
                    filteredRecipes.push(recipe)
                }
            })
            const toggledTags = getToggledTags();
            recipesContainer.innerHTML="";
            filteredRecipes = filterByTags(filteredRecipes, toggledTags);
            displayRecipes(filteredRecipes)
            const recipeKeywords = await getRecipeKeywords(filteredRecipes)
            updateRecipeKeywords(recipeKeywords, toggledTags);
            ingredientListContainer.removeChild(ingredientList)
            apparelListContainer.removeChild(apparelList)
            utensilListContainer.removeChild(utensilList)
            displayIngredients(recipeKeywords);
            displayApparels(recipeKeywords);
            displayUtensils(recipeKeywords);
        }
        else {
            const toggledTags = getToggledTags();
            recipesContainer.innerHTML="";
            recipes = filterByTags(recipes, toggledTags);
            displayRecipes(recipes)
            const recipeKeywords = await getRecipeKeywords(recipes)
            updateRecipeKeywords(recipeKeywords, toggledTags);
            ingredientListContainer.removeChild(ingredientList)
            apparelListContainer.removeChild(apparelList)
            utensilListContainer.removeChild(utensilList)
            displayIngredients(recipeKeywords);
            displayApparels(recipeKeywords);
            displayUtensils(recipeKeywords);
        }
    }
    
    filterRecipes()
    searchInput.addEventListener("input", filterRecipes)

}