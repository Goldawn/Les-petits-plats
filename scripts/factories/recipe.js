function recipeFactory(data) {
    
    // Création du DOM de la liste des recettes
    const getRecipeDOM = () => {

        const { appliance, description, id, ingredients, name, servings, time, ustensils } = data;

       const recipe = document.createElement( 'article' );
       recipe.setAttribute('class', "recipe")

       const picture = document.createElement('picture')
       const img = document.createElement('img')
       img.setAttribute( 'src', "./assets/recette-default.webp")

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
    
    // Création du DOM de la liste des ingrédients
    const getIngredientListDOM = (recipeKeywords) => {
        const ingredientList = document.createElement("ul");

        const slicedIngredientsList = recipeKeywords.ingredients.slice(0, 30);

        slicedIngredientsList.forEach(ingredient => {
            const li = document.createElement('li')
            li.setAttribute("class", "list-element ingredient-element")
            li.innerHTML = ingredient;
            ingredientList.appendChild(li)
        })
 
        return ingredientList;
    }

    // Création du DOM de la liste des appareils
    const getApparelListDOM = (recipeKeywords) => {
        const apparelList = document.createElement("ul");

        const slicedApparelList = recipeKeywords.apparels.slice(0, 30);

        slicedApparelList.forEach(apparel => {
            const li = document.createElement('li')
            li.setAttribute("class", "list-element apparel-element")
            li.innerHTML = apparel;
            apparelList.appendChild(li)
        })
  
        return apparelList;
    }

    // Création du DOM de la liste des ustensiles
    const getUtensilListDOM = (recipeKeywords) => {
        const utensilList = document.createElement("ul");

        const slicedUtensilList = recipeKeywords.utensils.slice(0, 30);

        slicedUtensilList.forEach(utensil => {
            const li = document.createElement('li')
            li.setAttribute("class", "list-element utensil-element")
            li.innerHTML = utensil;
            utensilList.appendChild(li)
        })
  
        return utensilList;
    }

    // Création du DOM des tags
    const getTagElementDOM = (tagClass, tagName) => {
        const tag = document.createElement("div");
        tag.setAttribute("class", `tag ${tagClass}`)
        const p = document.createElement("p")
        p.innerHTML=tagName
        tag.appendChild(p)

        return tag;
    }

    return { name, getRecipeDOM, getIngredientListDOM, getApparelListDOM, getUtensilListDOM, getTagElementDOM }
}