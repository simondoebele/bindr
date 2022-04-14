import { getBookDetails, getSubDetails } from "./bookSource";
import resolvePromise from "./resolvePromise";
import "firebase/auth";

class BinderModel {
  constructor(likedArray = []) {
    this.observers = [];
    //this.setNumberOfGuests(nrGuests);
    //this.dishes= dishArray;
    this.searchResultsPromiseState = {};
    this.searchParams = {};
    this.currentDishPromiseState = {};
    this.currentSubjPromiseState = {};
    this.currentBookPromiseState = {};
    this.currentBookDetailsPromiseState = {};
    
    this.currentUser;

    this.userSubjects = ["fantasy", "love", "literature", "young_adult"];

    this.likedBooks = likedArray;
    this.listOfBooks = [
      {
        title: "Don Quixote",
        cover_id: "https://covers.openlibrary.org/b/id/9655663",
        key: "OL14873215W",
      },
      {
        title: "Frankenstein; or, The Modern Prometheus",
        cover_id: "https://covers.openlibrary.org/b/id/9545602",
        key: "OL450063W",
      },
    ];
    //this.listOfBooks =  ["Wuthering Heights", "Don Quioxte", "Frankenstein"]
    this.currentBook = this.listOfBooks[0];
    this.currentBookDetails = this.likedBooks[0];

    //this.book = getBookDetails();
    // this.book.works is an array of 12 works
    // each work has e.g a title.

    resolvePromise(
      getSubDetails(this.userSubjects[0]),
      this.currentSubjPromiseState
    );
    //resolvePromise(getBookDetails("works/OL8193508W"), this.currentBookPromiseState)
    //resolvePromise(getBookDetailsISBN("9780385533225"), this.currentBookPromiseState)
  }

    setUser(email, pass) {

        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            this.currentUser = user
            console.log("great success!")
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        });
    }
    createUser(email, pass) {
        firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            this.currentUser = user;
            console.log("created user")
            // ...
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });
    }

  addBookLiked(bookToAdd) {
    if (
      !this.likedBooks.find(function isBookinCB(book) {
        return book === bookToAdd.title;
      }) &&
      !(typeof bookToAdd.title == "undefined")
    ) {
      this.likedBooks = [...this.likedBooks, bookToAdd];
      this.notifyObservers({ addBook: bookToAdd });
    }
  }

  removeLikedBook(book) {
    function hasSameTitleCB(likedBook) {
      if (likedBook.title != book.title) {
        return true;
      }
      return false;
    }
    if (
      this.likedBooks.find(function isBookInLikedCB(likedBook) {
        return likedBook.title === book.title;
      })
    ) {
      this.likedBooks = this.likedBooks.filter(hasSameTitleCB);
      this.notifyObservers({ removeLikedBook: book });
    }
  }

  fetchNextSub() {
    const tmp = this.userSubjects[0];
    resolvePromise(getSubDetails(tmp), this.currentSubjPromiseState);
    this.userSubjects.shift();
    this.userSubjects = [...this.userSubjects, tmp];
  }
  changeCurrentBook() {
    function titleExtractorCB(elem) {
        const cover_id = "https://covers.openlibrary.org/b/id/" + elem.cover_id;
        const key = elem.key.replace("/works/", "");

        return { title: elem.title, cover_id: cover_id, key: key };
        //this.listOfBooks = [...this.listOfBooks,{title: elem.title, img: "https://upload.wikimedia.org/wikipedia/commons/6/64/Houghton_Lowell_1238.5_%28A%29_-_Wuthering_Heights%2C_1847.jpg"}]
    }

    if (this.listOfBooks.length < 5) {
      //Beware!! This might be troublesome in the future, might wanna have an extra promisState.
      const a = this.currentSubjPromiseState.data.works.map(titleExtractorCB);
      this.fetchNextSub();

      this.listOfBooks = this.listOfBooks.concat(a);
    }

    this.listOfBooks.shift();
    this.currentBook = this.listOfBooks[0];
  }

  addObserver(callback) {
    this.observers = [...this.observers, callback];
  }

  removeObserver(callback) {
    console.log(this.observers);
    this.observers = this.observers.filter(function (observer) {
      return observer !== callback;
    });
    console.log(this.observers);
  }

  notifyObservers(payload) {
    this.observers.forEach(function invokeObserverCB(obs) {
      try {
        obs(payload);
      } catch (err) {
        console.log(err);
      }
    });
  }


  setCurrentBook(book) {
    var old = this.currentBookDetails;
    this.currentBookDetails = book;
    console.log(book);
    if (!(typeof book.key == "undefined") && old != this.currentBookDetails) {
      resolvePromise(
        getBookDetails(book.key),
        this.currentBookDetailsPromiseState
      );
      console.log(this.currentBookDetailsPromiseState);
    }
  }

  
  

  
}

export default BinderModel;
