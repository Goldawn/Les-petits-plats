const searchInputs = document.querySelectorAll('.selector-search');
const inputContainers = document.querySelectorAll('.input-container')

const handleChevron = (event) => {
    if(event.target.classList.contains('chevron-down')) {
        event.target.classList.replace('chevron-down', 'chevron-up')
        event.target.setAttribute("src", "assets/arrow-up.svg")
        console.log(event.target)
    }
    else {
        event.target.classList.replace('chevron-up', 'chevron-down')
        event.target.setAttribute("src", "assets/arrow-down.svg")
        console.log(event.target)
    }
}

// Fonction qui ajoute ou enlève un élément de la liste des tags, puis la retourne
const updateKeywordsArray = (recipeKeywordsArray, element, type) => {
    let updatedKeywordsArray = [];
    if (type === "++") {
        updatedKeywordsArray = recipeKeywordsArray
        updatedKeywordsArray.push(element)
    }
    else if (type === "--"){
        updatedKeywordsArray = recipeKeywordsArray.filter(item => item !== element);
    }
    else { console.log("erreur de type d'opération")}

    return updatedKeywordsArray
}

// Fonction qui ajoute un Event au clic sur les tags pour les afficher dans la bar des tags sélectionnés
const addTag = (recipeKeywords, tagCategory) => {
    const tagContainer = document.getElementById("tag-container")
    let listElements;
    const ingredientElements = document.querySelectorAll("#ingredient-list-container .list-element")
    const apparelElements = document.querySelectorAll("#apparel-list-container .list-element")
    const utensilElements = document.querySelectorAll("#utensil-list-container .list-element")
    if(tagCategory === "ingredient") {
        listElements = ingredientElements;
    }
    else if(tagCategory === "apparel") {
        listElements = apparelElements;
    }
    else {
        listElements = utensilElements;
    }
    listElements.forEach(element => {
        element.addEventListener("click", () => {
            const tagModel = recipeFactory()
            if(element.classList.contains("utensil-element")) {
                const tagDOM = tagModel.getTagElementDOM("utensil-tag", element.innerText)
                const updatedArray = updateKeywordsArray( recipeKeywords.utensils, element.innerText , "--")
                recipeKeywords.utensils = updatedArray;
                element.remove();
                tagContainer.appendChild(tagDOM)
                removeTag(tagDOM, recipeKeywords);
            }
            else if(element.classList.contains("apparel-element")) {
                const tagDOM = tagModel.getTagElementDOM("apparel-tag", element.innerText)
                const updatedArray = updateKeywordsArray( recipeKeywords.apparels, element.innerText , "--")
                recipeKeywords.apparels = updatedArray;
                element.remove();
                tagContainer.appendChild(tagDOM)
                removeTag(tagDOM, recipeKeywords);
            }
            else {
                const tagDOM = tagModel.getTagElementDOM("ingredient-tag", element.innerText)
                const updatedArray = updateKeywordsArray( recipeKeywords.ingredients, element.innerText , "--")
                recipeKeywords.ingredients = updatedArray;
                element.remove();
                tagContainer.appendChild(tagDOM)
                removeTag(tagDOM, recipeKeywords);
            }            
        })
    })
}

// Fonction qui supprime un élément de la liste des tags sélectionnés et le rajoute dans les listes de tags
const removeTag = (element, recipeKeywords) => {
    element.addEventListener("click", () => {
        if (element.classList.contains("utensil-tag")) {
            const updatedArray = updateKeywordsArray( recipeKeywords.utensils, element.innerText , "++")
            recipeKeywords.utensils = updatedArray;
            element.remove();
            displayUtensils(recipeKeywords);
        }
        else if (element.classList.contains("apparel-tag")) {
            console.log(recipeKeywords)
            const updatedArray = updateKeywordsArray( recipeKeywords.apparels, element.innerText , "++")
            recipeKeywords.apparels = updatedArray;
            element.remove();
            displayApparels(recipeKeywords);
        }
        else {
            const updatedArray = updateKeywordsArray( recipeKeywords.ingredients, element.innerText , "++")
            recipeKeywords.ingredients = updatedArray;
            element.remove();
            displayIngredients(recipeKeywords);
        }
    })
    
}