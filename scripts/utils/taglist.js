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
        search()
        element.remove();
    })
}

// Fonction qui affiche ou non la liste des tags au clic sur le chevro
const chevrons = document.querySelectorAll('.chevron')
const inputContainers = document.querySelectorAll('.input-container')

// Fonction qui remplace le placeholder des conteneur d'input à l'agrandissement et la retractation
const toggleTagPlaceholder = (index, boolean) => {
    if(boolean) {
        if (index === 0) {
            inputContainers[index].children[0].placeholder="Ingrédients"
        }
        else if (index === 1) {
            inputContainers[index].children[0].placeholder="Appareils"
        }
        else if (index === 2) {
            inputContainers[index].children[0].placeholder="Ustensiles"
        }
    }
    else {
        if (index === 0) {
            inputContainers[index].children[0].placeholder="Rechercher un ingrédient"
        }
        else if (index === 1) {
            inputContainers[index].children[0].placeholder="Rechercher un appareil"
        }
        else if (index === 2) {
            inputContainers[index].children[0].placeholder="Rechercher un ustensile"
        }
    }
}

// Fonction qui gère l'affichage des conteneur de tags au clic du chevron
const handleTagContainer = () => {
    chevrons.forEach( (chevron, index) => {
        chevron.addEventListener("mouseup", () => {
            
            if(chevron.classList.contains('chevron-down')) {
                chevron.classList.replace('chevron-down', 'chevron-up')
                chevron.setAttribute("src", "assets/arrow-up.svg")
                inputContainers[index].classList.toggle("collapsed-box")
                toggleTagPlaceholder(index, true)
            }
            else {
                chevron.classList.replace('chevron-up', 'chevron-down')
                chevron.setAttribute("src", "assets/arrow-down.svg")
                inputContainers[index].classList.toggle("collapsed-box")
                toggleTagPlaceholder(index, false)
            }
        })
    })
}

// Fonction qui réduit les div qui contiennent les tags au clic d'un autre élément de la page
const collapseTagContainer = () => {
    document.addEventListener("mouseup", (event) => {
        inputContainers.forEach((container, index) => {
            if(!container.contains(event.target)) {
                container.classList.add("collapsed-box")
                toggleTagPlaceholder(index, true)
                chevrons.forEach((chevron, i )=> {
                   if (i === index) {
                       chevron.classList.replace('chevron-down', 'chevron-up')
                       chevron.setAttribute("src", "assets/arrow-up.svg")
                   } 
                })
            }
            
        })
        
    })
}