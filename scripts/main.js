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
    const ingredientitem = document.createElement("li");
    const ingredientname =document.createElement("li")
    ingredientname.textContent = nutritionArray.name;
    ingredientitem.appendChild(ingredientname);
    console.log(ingredientname)
    console.log(nutritionArray.name)
    const recipeResultsUL = document.getElementById("recipe-results");
    console.log(recipeResultsUL)

    //nutritionArray.forEach(elm=>nutritonResultsElem.appendChild(elm))
    //getNutritionDropdown(nutritionArray)

  })
};


const bookObj2DOMObj = (bookObj) => {
  // {"id":70252,"title":"Threads gathered up : $b A sequel to \"Virgie's Inheritance\"","authors":[{"name":"Sheldon, Georgie, Mrs.","birth_year":1843,"death_year":1926}],"translators":[],"subjects":["American fiction -- 19th century"],"bookshelves":[],"languages":["en"],"copyright":false,"media_type":"Text","formats":{"image/jpeg":"https://www.gutenberg.org/cache/epub/70252/pg70252.cover.medium.jpg","application/rdf+xml":"https://www.gutenberg.org/ebooks/70252.rdf","text/plain":"https://www.gutenberg.org/ebooks/70252.txt.utf-8","application/x-mobipocket-ebook":"https://www.gutenberg.org/ebooks/70252.kf8.images","application/epub+zip":"https://www.gutenberg.org/ebooks/70252.epub3.images","text/html":"https://www.gutenberg.org/ebooks/70252.html.images","application/octet-stream":"https://www.gutenberg.org/files/70252/70252-0.zip","text/plain; charset=us-ascii":"https://www.gutenberg.org/files/70252/70252-0.txt"},"download_count":745},

  // make a dom element
  // add bookObj.title to the element
  // return element

  const bookCardDiv = document.createElement("div");
  bookCardDiv.classList.add("card");

  const bookCardBody = document.createElement("div");
  bookCardBody.classList.add("card-body");

  const titleElem = document.createElement("h5");
  titleElem.textContent = bookObj.title;
  bookCardBody.appendChild(titleElem);
  const cardText = document.createElement("p");
  cardText.textContent =
    "Some quick example text to build on the card title and make up the bulk of the card's content.";
  bookCardBody.appendChild(cardText);
  if (bookObj?.formats?.["image/jpeg"]) {
    const bookCardImg = document.createElement("img");
    bookCardImg.classList.add("card-img-top");
    bookCardImg.src = bookObj?.formats?.["image/jpeg"];
    bookCardBody.appendChild(bookCardImg)
  }
  if (bookObj?.formats?.["text/plain"]) {
    const bookTextLink = document.createElement("a");
    bookTextLink.href = bookObj?.formats?.["text/plain"];
    bookTextLink.classList.add("btn");
    bookTextLink.classList.add("btn-primary");
    bookTextLink.textContent = "Read It!";
    bookCardBody.appendChild(bookTextLink);
  }
  bookCardDiv.appendChild(bookCardBody)
  return bookCardDiv
  
};