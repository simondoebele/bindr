
const base_url = "https://openlibrary.org/"

function getSubDetails(subject) {
  console.log("fetching: ", subject); // debug statement
  return (
    fetch(base_url + "subjects/" + subject + ".json")
      .then((response) => response.json())
      .catch((err) => console.log(err))
  );
}

function getBookDetails(key) {
  console.log("fetching: ", key); // debug statement
  return fetch(base_url + "works/" + key + ".json")
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export {getSubDetails, getBookDetails };
