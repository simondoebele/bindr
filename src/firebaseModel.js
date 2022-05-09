
import firebaseConfig from "/src/firebaseConfig.js";
import { getBookDetails } from "./bookSource.js";
import BinderModel from "./binderModel";
import { BASE_URL } from "./apiConfig";

firebase.initializeApp(firebaseConfig);

const REF = "binder-e215b";

function updateFirebaseFromModel(model) {

	function observerACB(payload) {
		
		// payload is js object, key value pair (key : value)
		if (payload) {
			//New stuff
			if (payload.addBook) {
				if (!(typeof payload.addBook.bookToAdd.title == "undefined")) {
					firebase.database().ref(REF + "/User/" + payload.addBook.uid + "/likedBooks/" + payload.addBook.bookToAdd.key).set(payload.addBook.bookToAdd.title);
				}
			}
			if (payload.seenBook) {
				if (!(typeof payload.seenBook.bookToAdd.title == "undefined")) {
					firebase.database().ref(REF + "/User/" + payload.seenBook.uid + "/seenBooks/" + payload.seenBook.bookToAdd.key).set(payload.seenBook.bookToAdd.title);
				}
			}

			if (payload.resetBooks){
				firebase.database().ref(REF + "/User/" + model.currentUser.uid + "/likedBooks/").set(null)
			}

			if (payload.resetBooks){
				firebase.database().ref(REF + "/User/" + model.currentUser.uid + "/seenBooks/").set(null)
			}

			if (payload.removeLikedBook) {
				firebase.database().ref(REF + "/User/" + model.currentUser.uid + "/likedBooks/" + payload.removeLikedBook.key).set(null);
			}
			if (payload.addSub) {
				firebase.database().ref(REF + "/User/" + payload.addSub.uid + "/userSubjects/" + payload.addSub.subToAdd).set(payload.addSub.subToAdd);
			}
		}
	}

	model.addObserver(observerACB);
}
/*
function updateModelFromFirebase(model) {
  
  function addLikedBook(data) { //Make this func check uid
    
    function getBookFromJson(json) {
      //here we can add description, or we just fetch it in details
      const title = json.title;
      const key = data.key;
      const img = json.covers[0];
      const book = { title: title, img: img, key: key };
      return book;
    }
    if (
      !model.likedBooks.find(function isBookInLikedCB(book) {
        return book.key == data.key;
      })
    ) {
      getBookDetails(data.key)
        .then(getBookFromJson)
        .then(function addNewBook(book) {
          model.addBookLiked(book);
        });
      //model.addBookLiked({id:data.key})
    }
  }

  firebase.database().ref(REF + "/User/" + "07IFrLpSHFVM1Pa9p1h3e0TpLHi2" + "/likedBooks").on("child_added", addLikedBook);
}
*/
function firebaseModelPromise() {

  function allBooksRecvPromiseACB(firebaseData) {

    function makeBooksPromiseCB(OLkey) {

      function getBookFromJson(json) {

        const title = json.title;
        const key = OLkey;
        const cover_id = BASE_URL + json.covers[0];
        const book = { title: title, cover_id: cover_id, key: key };
        return book;

      }

      return getBookDetails(OLkey).then(getBookFromJson);
    }

    function createModelACB(booksArray) {
      return new BinderModel();
    }
    const booksPromiseArray = [];

    return Promise.all(booksPromiseArray).then(createModelACB);
  }
  return firebase.database().ref(REF + "/User/" + "6rK0QeStCThuf7dHCaiu4AWwJ2C2").get("value").then(allBooksRecvPromiseACB);
}

export {
  updateFirebaseFromModel,/* updateModelFromFirebase, */firebaseModelPromise};
