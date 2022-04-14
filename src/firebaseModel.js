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
				if (!(typeof payload.addBook.title == "undefined")) {
				firebase
					.database()
					.ref(REF + "/User/" + model.currentUser.uid +"/likedBooks/" + payload.addBook.key)
					.set(payload.addBook.title);
				}
			}
			if (payload.removeLikedBook) {
				firebase
				.database()
				.ref(REF + "/likedBooks/" + payload.removeLikedBook.key)
				.set(null);
			}
			if (payload.addGenre) {
				firebase
				.database()
				.ref(REF + "/Genres/" + payload.addGenre.id)
				.set(payload.addGenre.id);
			}
			if (payload.addAccount) {
				const auth = getAuth();
				firebase
				.auth()
				.createUserWithEmailAndPassword(
					payload.addAccount.email,
					payload.addAccount.pass
				)
				.then(userWasCreatedACB)
				.catch();
				// sign-in automatically after first login
				firebase
				.auth()
				.signInWithEmailAndPassword(
					payload.addAccount.email,
					payload.addAccount.pass
				)
				.then(userLoggedInACB)
				.catch();
			}
			if (payload.deleteAccount) {
				// TODO
			}
			if (payload.signIn) {
				const auth = getAuth();
				firebase
				.auth()
				.signInWithEmailAndPassword(
					payload.addAccount.email,
					payload.addAccount.pass
				)
				.then(userLoggedInACB)
				.catch();
			}
			if (payload.signOut) {
				firebase
				.auth()
				.signOut()
				.then(signoutSuccessACB)
				.catch(signoutErrorACB);
			}
		}
  	}	
  model.addObserver(observerACB);
}

function updateModelFromFirebase(model) {
  function addLikedBook(data) {
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

  firebase
    .database()
    .ref(REF + "/likedBooks")
    .on("child_added", addLikedBook);
}

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
      return new BinderModel(booksArray);
    }
    const booksPromiseArray = Object.keys(firebaseData.val().likedBooks).map(
      makeBooksPromiseCB
    );

    return Promise.all(booksPromiseArray).then(createModelACB);
  }
  return firebase.database().ref(REF).get("value").then(allBooksRecvPromiseACB);
}

export {
  updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise};
