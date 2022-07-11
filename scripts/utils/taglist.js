const searchInputs = document.querySelectorAll('.selector-search');
const inputContainers = document.querySelectorAll('.input-container')

const test = () => {
    console.log("test")
}

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

const updateRecipeKeywords = (recipeKeywordsArray, element, type) => {
    let updatedRecipeKeywords;
    if (type === "++") {
        console.log("++")
    }
    else {
        console.log(recipeKeywordsArray, element, type)
        updatedRecipeKeywords = recipeKeywordsArray.filter(item => item !== element);
    }
    return updatedRecipeKeywords
}

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
                const updatedArray = updateRecipeKeywords( recipeKeywords.utensils, element.innerText , "--")
                recipeKeywords.utensils = updatedArray;
                element.remove();
                tagContainer.appendChild(tagDOM)
                removeTag(tagDOM, recipeKeywords);
            }
            else if(element.classList.contains("apparel-element")) {
                const tagDOM = tagModel.getTagElementDOM("apparel-tag", element.innerText)
                const updatedArray = updateRecipeKeywords( recipeKeywords.apparels, element.innerText , "--")
                recipeKeywords.apparels = updatedArray;
                element.remove();
                tagContainer.appendChild(tagDOM)
                removeTag(tagDOM, recipeKeywords);
            }
            else {
                const tagDOM = tagModel.getTagElementDOM("ingredient-tag", element.innerText)
                const updatedArray = updateRecipeKeywords( recipeKeywords.ingredients, element.innerText , "--")
                recipeKeywords.ingredients = updatedArray;
                element.remove();
                tagContainer.appendChild(tagDOM)
                removeTag(tagDOM, recipeKeywords);
            }            
        })
    })
}

const removeTag = (element, recipeKeywords) => {
    element.addEventListener("click", () => {
        if (element.classList.contains("utensil-tag")) {
            let array = recipeKeywords.utensils;
            array.push(element.innerText)
            element.remove();
            displayUtensils(recipeKeywords);
        }
        else if (element.classList.contains("apparel-tag")) {
            let array = recipeKeywords.apparels;
            array.push(element.innerText)
            element.remove();
            displayApparels(recipeKeywords);
        }
        else {
            let array = recipeKeywords.ingredients;
            array.push(element.innerText)
            element.remove();
            displayIngredients(recipeKeywords);
        }
    })
    
}