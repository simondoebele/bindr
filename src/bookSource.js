import { BASE_URL, API_KEY } from "./apiConfig.js";

function treatHTTPResponseACB(response) {
  if (!response.ok) {
    throw "API problem";
  } else {
    return response.json();
  }
}

function getSubDetails(subject) {
  console.log("fetching: ", subject); // debug statement
  const base_url = "https://openlibrary.org/subjects/";
  return (
    fetch(base_url + subject + ".json")
      // change to isbn + base_url later, or not
      .then((res) => res.json())
      .catch((err) => console.log(err))
  );
}

function getBookDetails(key) {
  console.log("fetching: ", key); // debug statement
  const base_url = "https://openlibrary.org/works/";
  return fetch(base_url + key + ".json")
    .then((res) => res.json())
    .catch((err) => console.log(err));
}


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

export { getDishDetails, searchDishes, getSubDetails, getBookDetails };