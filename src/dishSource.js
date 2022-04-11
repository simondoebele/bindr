import { BASE_URL, API_KEY } from "./apiConfig.js";

function treatHTTPResponseACB(response) {
  if (!response.ok) {
    throw "API problem";
  } else {
    return response.json();
  }
}

function getBookDetails(subject) {
  console.log("fetching: ", subject);
  const base_url = "https://openlibrary.org/subjects/";
  return (
    fetch(base_url + subject + ".json")
      // change to isbn + base_url later, or not
      .then((res) => res.json())
      .catch((err) => console.log(err))
  );
}

//ISBN version
/*
function getBookDetails(isbn) {
  console.log("fetching: ", isbn);
  const base_url = "https://openlibrary.org/api/books?bibkeys=ISBN:";
  return (
    fetch(base_url + isbn + "&jscmd=data&format=json")
      // change to isbn + base_url later, or not
      .then((res) => res.json())
      .catch((err) => console.log(err))
  );
}*/

//https://openlibrary.org/api/books?bibkeys=ISBN:" +
// "9780385533225" +
// "&jscmd=data&format=json"

function getDishDetails(id) {
  return fetch(BASE_URL + "recipes/" + id + "/information", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "X-Mashape-Key": API_KEY,
    },
  }).then(treatHTTPResponseACB);
}

function searchDishes(params) {
  return fetch(BASE_URL + "recipes/search?" + new URLSearchParams(params), {
    method: "GET",
    headers: {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "X-Mashape-Key": API_KEY,
    },
  })
    .then(treatHTTPResponseACB)
    .then(function transformResultACB(result) {
      return result.results;
    });
}

export { getDishDetails, searchDishes, getBookDetails };
