import { getBookDetails, getSubDetails } from "./bookSource";
import resolvePromise from "./resolvePromise";

import "firebase/auth";
import "firebase/database";
import { BASE_URL } from "./apiConfig";

class BinderModel {
  constructor(likedArray = [], seenArray = []) {
    this.observers = [];
    this.likedBooksPromise = {};
    this.currentSubjPromiseState = {};
    this.currentBookPromiseState = {};
    this.currentBookDetailsPromiseState = {};

    this.currentUser;

    this.userSubjects = [];

    this.likedBooks = [];
    this.seenBooks = seenArray;
    this.listOfBooks = [];

    this.currentBook = this.listOfBooks[0];
    this.currentBookDetails = this.likedBooks[0];
  }

  // sets the book that we want to get a description (= details) from
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
    // no notifying observers, because no need for BookDetails in Firebase!
  }

  // adds a book to the liked books array
  addBookLiked(bookToAdd) {
    if (
      !this.likedBooks.find(function isBookinCB(book) {
        return book === bookToAdd.title;
      }) &&
      !(typeof bookToAdd.title == "undefined")
    ) {
      this.likedBooks = [...this.likedBooks, bookToAdd];
      this.notifyObservers({
        addBook: { bookToAdd: bookToAdd, uid: this.currentUser.uid },
      });
    }
  }

  // adds a book to the seenbooks array
  addBookSeen(bookToAdd) {
    if (
      !this.seenBooks.find(function isBookinCB(book) {
        return book === bookToAdd.title;
      }) &&
      !(typeof bookToAdd.title == "undefined")
    ) {
      this.seenBooks = [...this.seenBooks, bookToAdd];

      this.notifyObservers({
        seenBook: { bookToAdd: bookToAdd, uid: this.currentUser.uid },
      });
    }
  }

  // removes a book from the liked books
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

  // used for testing purposes, for removing all books from liked!
  resetBooks() {
    this.notifyObservers({ resetBooks: true });
  }

  // a book genre in our API is called a book "subject"
  // this function gets the subject of the book
  fetchNextSub() {
    const tmp = this.userSubjects[0];
    resolvePromise(getSubDetails(tmp), this.currentSubjPromiseState);
    this.userSubjects.shift();
    this.userSubjects = [...this.userSubjects, tmp];
  }

  // this function adds the subject ("genre") to the liked subjects ("usersubjects")
  addSub(subToAdd) {
    if (
      !this.userSubjects.find(function isSubInCB(sub) {
        return sub === subToAdd;
      })
    ) {
      this.userSubjects = [...this.userSubjects, subToAdd];
      this.notifyObservers({
        addSub: { subToAdd: subToAdd, uid: this.currentUser.uid },
      });
    }
    if (this.userSubjects.length == 1) {
      resolvePromise(
        getSubDetails(this.userSubjects[0]),
        this.currentSubjPromiseState
      );
    }
  }

  // creates a book object from the API calls
  createBookObjCB(elem) {
    const cover_id = BASE_URL + elem.cover_id;
    const key = elem.key.replace("/works/", "");
    //console.log(elem.subject[0])

    return {
      title: elem.title,
      cover_id: cover_id,
      key: key,
      sub: elem.subject[0],
    };
    //this.listOfBooks = [...this.listOfBooks,{title: elem.title, img: "https://upload.wikimedia.org/wikipedia/commons/6/64/Houghton_Lowell_1238.5_%28A%29_-_Wuthering_Heights%2C_1847.jpg"}]
  }

  // getting books for the first time
  async intitialFetch(sub) {
    const component = this;
    const test = await getSubDetails(sub);
    this.userSubjects.shift();
    this.userSubjects = [...this.userSubjects, sub];
    const books = test.works.map(component.createBookObjCB);
    this.listOfBooks = books.slice(1, books.length - 1);
    this.currentBook = books[0];
    this.fetchNextSub();
  }

  // fetches books if we do not have enough books
  changeCurrentBook(initial = false) {
    const component = this;

    if (this.listOfBooks.length < 5) {
      //Beware!! This might be troublesome in the future, might wanna have an extra promisState.'
      const fetchedBooks = this.currentSubjPromiseState.data.works.map(
        component.createBookObjCB
      );
      this.fetchNextSub();

      const filtered = fetchedBooks.filter(
        (
          ad //filter out all books already in liked.
        ) => this.likedBooks.every((fd) => fd.title !== ad.title)
      );

      const filtered2 = filtered.filter(
        (
          ad // also filter out all books already in seen.
        ) => this.seenBooks.every((fd) => fd.title !== ad.title)
      );

      this.listOfBooks = this.listOfBooks.concat(filtered2);
    }

    if (!initial) {
      this.listOfBooks.shift();
    }
    this.currentBook = this.listOfBooks[0];
  }

  /// Firebase

  setLikedBooks(likedArray) {
    this.likedBooks = likedArray;
  }

  updateModelFromFB() {
    const component = this;
    function allBooksRecvACB(data) {
      if (data.val() == null) {
        return [];
      }
      function makeBooksCB(OLkey) {
        function getBookFromJson(json) {
          //protection against coverless books
          if (!json.covers) {
            json.covers = [" "];
          }
          if (!json.subjects) {
            json.subjects = ["no info"];
          }

          const cover_id = BASE_URL + json.covers[0];
          const title = json.title;
          const key = OLkey;
          const sub = json.subjects[0];
          const book = { title: title, cover_id: cover_id, key: key, sub: sub };
          return book;
        }
        return getBookDetails(OLkey).then(getBookFromJson);
      }
      function updateLikedBooks(likedArray) {
        component.setLikedBooks(likedArray);
        return likedArray;
      }
      const seenBooksPromiseArray = Object.keys(data.val().seenBooks).map(
        makeBooksCB
      );
      const booksPromiseArray = Object.keys(data.val().likedBooks).map(
        makeBooksCB
      );
      const subs = Object.keys(data.val().userSubjects);
      component.userSubjects = subs;
      component.intitialFetch(subs[0]);
      Promise.all(seenBooksPromiseArray).then(
        (seenArray) => (component.seenBooks = seenArray)
      );
      return Promise.all(booksPromiseArray).then(updateLikedBooks);
    }

    return firebase
      .database()
      .ref("binder-e215b" + "/User/" + this.currentUser.uid)
      .get("value")
      .then(allBooksRecvACB);
  }

  setUser(email, pass) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        this.currentUser = user;
        console.log(this.currentUser); // debug statement
        resolvePromise(this.updateModelFromFB(), this.likedBooksPromise);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  createUser(email, pass) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        this.currentUser = user;

        // Since we have no data and UserInfo checks the likedBooksPromise we just give it some dummy values
        this.likedBooksPromise.promise = 1;
        this.likedBooksPromise.data = [];
        console.log("created user");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }

  /// Observers

  addObserver(callback) {
    this.observers = [...this.observers, callback];
  }

  removeObserver(callback) {
    this.observers = this.observers.filter(function (observer) {
      return observer !== callback;
    });
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
}

export default BinderModel;
