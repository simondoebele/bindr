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

export {getSubDetails, getBookDetails };
