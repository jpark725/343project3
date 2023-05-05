const searchForm = document.getElementById("top-search");
searchForm.onsubmit = (ev) => {
  console.log("submitted top-search with", ev);
  ev.preventDefault();
  // https://stackoverflow.com/a/26892365/1449799
  const formData = new FormData(ev.target);
  // console.log(formData)
  // for (const pair of formData.entries()) {
  //   console.log(`${pair[0]}, ${pair[1]}`);
  // }
  const queryText = formData.get("query");
  console.log("queryText", queryText);

  const recipeResultsPromise = getRecipe(queryText);
  recipeResultsPromise.then((recipeResults) => {
    const recipeListItemsArray = recipeResults.map(recipeObj2DOMObj);
    console.log("recipeListItemsArray", recipeListItemsArray);
    const recipeResultsUL = document.getElementById("recipe-results");
    recipeListItemsArray.forEach((recipeLi) => {
      recipeResultsUL.appendChild(recipeLi);
    });

  
    //const IngredientsResultsPromise = getIngredients(queryText)

  });
};


// given a word (string), search for recipes
// https://api.api-ninjas.com/v1/recipe?query=

const getRecipe = (word) => {
  console.log("attempting to get recipe for", word);
  return fetch(`https://api.api-ninjas.com/v1/recipe?query=${word}`, {
    method: 'GET',
    headers: {
        "X-Api-Key": "dvZ11IGyVBnq5fWovX768Q==2T9j5boIqQXzPNit",
        'Content-Type': 'application/json'
    }
  }).then((resp) => resp.json())
    .then(function(data) {
      console.log(data);
      return data
    })
};

const recipeObj2DOMObj = (recipeObj) => {
   //this should be an array where each element has a structure like
  //
  // "word": "no",
  // "frequency": 28,
  // "score": "300",
  // "flags": "bc",
  // "syllables": "1"
  const recipeListItem = document.createElement("li");
  const recipeButton = document.createElement("button");
  recipeButton.classList.add('btn')
  recipeButton.classList.add('btn-info')
  recipeButton.textContent = recipeObj.title;
  //recipeButton.onclick = getIngredientDropdown(recipeObj);
  recipeButton.onclick = searchNutrition;
  recipeListItem.appendChild(recipeButton);
  return recipeListItem;
};

//https://api-ninjas.com/api/nutrition
const searchNutrition = (ev) => {
  const word = ev.target.textContent;
  console.log("search for", word);
  return fetch(`https://api.api-ninjas.com/v1/nutrition?query=${word}`, {
    method: 'GET',
    headers: {
        "X-Api-Key": "dvZ11IGyVBnq5fWovX768Q==2T9j5boIqQXzPNit",
        'Content-Type': 'application/json'
    }
  }).then((r) =>
    r.json()
  ).then((nutritionResultsObj)=> {
    // console.log(bookResultsObj.hasOwnProperty('results'))
    const nutritionArray = nutritionResultsObj.map(console.log);
    //console.log(nutritionArray)
    //console.log("nutritionArray", nutritionArray);
    const nutritonResultsElem = document.getElementById("nutrition-results");
    nutritionResultsJSON=  JSON.stringify(nutritionResultsObj);
    const obj = JSON.parse(nutritionResultsJSON);
    let str = "";
        for (const [key, value] of Object.entries(obj[0])) {
          str += `${key}: ${value}\n`;
        }
    
    document.getElementById("output").value = str;

    

    //const ingredientitem = document.createElement("li");
    //const ingredientname =document.createElement("li")
    //ingredientname.textContent = nutritionArray.name;
    //ingredientitem.appendChild(ingredientname);
    //console.log(ingredientname)
    //console.log(nutritionArray.name)
    //const recipeResultsUL = document.getElementById("recipe-results");
    //console.log(recipeResultsUL)

    //nutritionArray.forEach(elm=>nutritonResultsElem.appendChild(elm))
    //getNutritionDropdown(nutritionArray)

  })
};

/*
const getIngredient = (recipeObj) => {
  const ingredientList = document.createElement('ul');
  recipe.ingredients.forEach(ingredient => {
    const ingredient = document.createElement('li');
    ingredient.textContent = recipeObj.ingredient;
    ingredientList.appendChild(ingredient)
  });
  return ingredientList
};
"""
*/

const nutritionObj2DOMObj = (nutritionObj) => {

};