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
const addTag = (tagCategory) => {
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
                search();
                tagContainer.appendChild(tagDOM)
                removeTag(tagDOM);
            }
            else if(element.classList.contains("apparel-element")) {
                const tagDOM = tagModel.getTagElementDOM("apparel-tag", element.innerText)
                search();
                tagContainer.appendChild(tagDOM)
                removeTag(tagDOM);
            }
            else {
                const tagDOM = tagModel.getTagElementDOM("ingredient-tag", element.innerText)
                search();
                tagContainer.appendChild(tagDOM)
                removeTag(tagDOM);
            }            
        })
    })
}

// Fonction qui supprime un élément de la liste des tags sélectionnés et le rajoute dans les listes de tags
const removeTag = (element) => {
    element.addEventListener("click", () => {
        if (element.classList.contains("utensil-tag")) {
            search()
            element.remove();
        }
        else if (element.classList.contains("apparel-tag")) {
            search()
            element.remove();
        }
        else {
            search();
            element.remove();
        }
    })
}