
const base_url = "https://openlibrary.org/"

// fetches the subjects from the API
function getSubDetails(subject) {
  console.log("fetching: ", subject); // debug statement
  return (
    fetch(base_url + "subjects/" + subject + ".json")
      .then((response) => response.json())
      .catch((err) => console.log(err))
  );
}

// fetches the book description (aka "details") from the API
function getBookDetails(key) {
  console.log("fetching: ", key); // debug statement
  return fetch(base_url + "works/" + key + ".json")
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export {getSubDetails, getBookDetails };
