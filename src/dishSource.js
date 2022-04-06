import {BASE_URL, API_KEY} from "./apiConfig.js";


function treatHTTPResponseACB(response){
    if(!response.ok){
        throw ("API problem");
    }
    else{return response.json()}
}

function getBookDetails() {

    return fetch(
      "https://openlibrary.org/subjects/love.json"
    ) // change to isbn + base_url later
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
  
  //https://openlibrary.org/api/books?bibkeys=ISBN:" +
  // "9780385533225" +
  // "&jscmd=data&format=json"

function getDishDetails(id){
    return fetch(BASE_URL + "recipes/"+id+"/information",
        {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                'X-Mashape-Key': API_KEY,
            }
        }
    ).then(treatHTTPResponseACB);
}

function searchDishes(params){
    return fetch(BASE_URL + "recipes/search?" + new URLSearchParams(params),
    {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            'X-Mashape-Key': API_KEY,
        }
    }
    ).then(treatHTTPResponseACB).then(
        function transformResultACB(result){return(result.results)})
}


export { getDishDetails, searchDishes, getBookDetails };