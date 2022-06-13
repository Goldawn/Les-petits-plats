function recipeFactory(data) {
    const { appliance, description, id, ingredients, name, servings, time, ustensils } = data;

    // Création du DOM de la liste des photographes
    function getRecipeDOM() {
       const recipe = document.createElement( 'article' );

       const picture = document.createElement('picture')
       const img = document.createElement('img')

       picture.appendChild(img)

       const articleDesc = document.createElement("div");
       articleDesc.setAttribute("class", "article-desc")

       const articleHeader = document.createElement('div')
       articleHeader.setAttribute("class", "article-header")
       
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const recipeTime = document.createElement('div')
        recipeTime.setAttribute("class", "recipe-time bold")

        const clockImg = document.createElement('img')
        clockImg.setAttribute("src", "assets/clock.svg")
        clockImg.setAttribute("alt", "icone d'une horloge")

        const timeText = document.createElement('p')
        timeText.textContent = `${time} min`

        recipeTime.appendChild(clockImg)
        recipeTime.appendChild(timeText)
        articleHeader.appendChild(h2)
        articleHeader.appendChild(recipeTime)


        const articleContent = document.createElement('div')
        articleContent.setAttribute("class", "article-content")

        const ingredientsList = document.createElement('ul')
        ingredientsList.setAttribute("class", "ingredients-list")

        ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="bold">${ingredient.quantity ? ingredient.ingredient+" : " : ingredient.ingredient}</span>${ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</li>`
            ingredientsList.appendChild(li)
        })


        const recipeDesc = document.createElement('p')
        recipeDesc.setAttribute("class", "recipe-desc")
        recipeDesc.textContent = description

        articleContent.appendChild(ingredientsList)
        articleContent.appendChild(recipeDesc)

        articleDesc.appendChild(articleHeader)
        articleDesc.appendChild(articleContent)

        recipe.appendChild(picture)
        recipe.appendChild(articleDesc)

        return (recipe);
    }
    return { name, getRecipeDOM }
}