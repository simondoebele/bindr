import { getBookDetails, getSubDetails } from "./bookSource";
import resolvePromise from "./resolvePromise";

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

    this.userSubjects = ["fantasy", "love", "literature", "young_adult"];

    this.likedBooks = likedArray;
    this.listOfBooks = [
      {
        title: "Don Quixote",
        img: "https://upload.wikimedia.org/wikipedia/commons/f/fb/CC_No_11_Don_Quixote.jpg",
        key: "OL14873215W",
      },
      {
        title: "Frankenstein; or, The Modern Prometheus",
        img: "https://upload.wikimedia.org/wikipedia/commons/3/39/Frankenstein.jpg",
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
      const base_url = "https://covers.openlibrary.org/b/id/";
      const cover_id = elem.cover_id + "-M.jpg";
      const key = elem.key.replace("/works/", "");

      return { title: elem.title, img: base_url + cover_id, key: key };
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

  setSearchQuery(q) {
    this.searchParams.query = q;
  }

  setSearchType(t) {
    this.searchParams.type = t;
  }

  doSearch(params) {
    const theModel = this;

    function notifyACB() {
      theModel.notifyObservers();
    }

    resolvePromise(
      searchDishes(params),
      this.searchResultsPromiseState,
      notifyACB
    );
  }

  setCurrentDish(id) {
    var old = this.currentDish;
    this.currentDish = id; //updated value

    const theModel = this;

    function notifyACB() {
      theModel.notifyObservers();
    }

    if (id !== undefined && old != this.currentDish) {
      resolvePromise(
        getDishDetails(id),
        this.currentDishPromiseState,
        notifyACB
      );
      this.notifyObservers({ setCurrent: id });
    }
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

  setNumberOfGuests(nr) {
    var temp = this.numberOfGuests;

    if (nr >= 1 && Number.isInteger(nr)) {
      this.numberOfGuests = nr;

      if (temp !== this.numberOfGuests) {
        this.notifyObservers({ nrGuests: nr });
      }
    } else {
      throw "number of guests not a positive integer";
    }
  }
  addToMenu(dishToAdd) {
    if (
      !this.dishes.find(function isDishInMenuCB(dish) {
        return dish.id === dishToAdd.id;
      })
    ) {
      this.dishes = [...this.dishes, dishToAdd];
      this.notifyObservers({ addDish: dishToAdd });
    }
  }

  removeFromMenu(dishToRemove) {
    function hasSameIdCB(dish) {
      if (dish.id != dishToRemove.id) {
        return true;
      }
      return false;
    }
    if (
      this.dishes.find(function isDishInMenuCB(dish) {
        return dish.id === dishToRemove.id;
      })
    ) {
      this.dishes = this.dishes.filter(hasSameIdCB);
      this.notifyObservers({ removeDish: dishToRemove });
    }
  }
}

export default BinderModel;
