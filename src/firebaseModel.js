// do not import firebase, it is done for you by the 3.5 tests!
// this is needed so that unit tests can inject a mock firebase
import firebaseConfig from "/src/firebaseConfig.js";
import { getBookDetails } from "./bookSource.js";
import BinderModel from "./binderModel";
firebase.initializeApp({
  apiKey: "AIzaSyBH2BtAtW0SS6jwGDw5dMjVDH_sOB9dZKY",
  authDomain: "binder-e215b.firebaseapp.com",
  databaseURL:
    "https://binder-e215b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "binder-e215b",
  storageBucket: "binder-e215b.appspot.com",
  messagingSenderId: "684501139736",
  appId: "1:684501139736:web:3276001a1e827f698d9e6d",
});
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

    if(payload.resetBooks){
      firebase
      .database().ref(REF + "/User/" + model.currentUser.uid + "/likedBooks/").set(null)
    }

    if(payload.resetBooks){
      firebase
      .database().ref(REF + "/User/" + model.currentUser.uid + "/seenBooks/").set(null)
    }

		if (payload.removeLikedBook) {
			firebase
			.database()
			.ref(REF + "/User/" + model.currentUser.uid + "/likedBooks/" + payload.removeLikedBook.key)
			.set(null);
		}
		if (payload.addGenre) {
			firebase
			.database()
			.ref(REF + "/Genres/" + payload.addGenre.id)
			.set(payload.addGenre.id);
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
        const base_url = 'https://covers.openlibrary.org/b/id/'
        const cover_id = base_url + json.covers[0];
        const book = { title: title, cover_id: cover_id, key: key };
        return book;

      }

      return getBookDetails(OLkey).then(getBookFromJson);
    }

    function createModelACB(booksArray) {
      return new BinderModel();
    }
    const booksPromiseArray = Object.keys(firebaseData.val().likedBooks).map(makeBooksPromiseCB);

    return Promise.all(booksPromiseArray).then(createModelACB);
  }
  return firebase.database().ref(REF + "/User/" + "07IFrLpSHFVM1Pa9p1h3e0TpLHi2").get("value").then(allBooksRecvPromiseACB);
}

export {
  updateFirebaseFromModel,/* updateModelFromFirebase, */firebaseModelPromise};
