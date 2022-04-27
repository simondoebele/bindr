import { getBookDetails, getSubDetails } from "./bookSource";
import resolvePromise from "./resolvePromise";
import "firebase/auth";
import "firebase/database";

class BinderModel {
    constructor(likedArray = []) {
    this.observers = [];
    this.likedBooksPromise = {};
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

    this.currentBook = this.listOfBooks[0];
    this.currentBookDetails = this.likedBooks[0];


    resolvePromise(getSubDetails(this.userSubjects[0]), this.currentSubjPromiseState);}
    
    setLikedBooks(likedArray){
        this.likedBooks = likedArray
    }
    updateModelFromFB() {
        const component = this;
        function allBooksRecvACB(data) {
            if(data.val() == null) {
                return [];
            }
            function makeBooksCB(OLkey) {
                
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
            function updateLikedBooks(likedArray){
                component.setLikedBooks(likedArray)
                return likedArray;
            }
            
            const booksPromiseArray = Object.keys(data.val().likedBooks).map(makeBooksCB)
            return Promise.all(booksPromiseArray).then(updateLikedBooks)
        }

        return firebase.database().ref("binder-e215b" + "/User/" + this.currentUser.uid).get("value").then(allBooksRecvACB)
    }
    setUser(email, pass) {

        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            this.currentUser = user
            console.log(this.currentUser) // debug statement
            resolvePromise(this.updateModelFromFB(), this.likedBooksPromise)
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
		this.notifyObservers({ addBook: {bookToAdd : bookToAdd, uid:this.currentUser.uid} });
		}
	}

	removeLikedBook(book) {
		function hasSameTitleCB(likedBook) {
			if (likedBook.title != book.title) { 
				return true;}
			return false;
		}
		if ( this.likedBooks.find(function isBookInLikedCB(likedBook) {return likedBook.title === book.title;})) {
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
      const component = this;

    function createBookObjCB(elem) {
        const cover_id = "https://covers.openlibrary.org/b/id/" + elem.cover_id;
        const key = elem.key.replace("/works/", "");

        return { title: elem.title, cover_id: cover_id, key: key };
        //this.listOfBooks = [...this.listOfBooks,{title: elem.title, img: "https://upload.wikimedia.org/wikipedia/commons/6/64/Houghton_Lowell_1238.5_%28A%29_-_Wuthering_Heights%2C_1847.jpg"}]
    }

    function objectFilterCB(elem){

    }
    
    if (this.listOfBooks.length < 5) {
    //Beware!! This might be troublesome in the future, might wanna have an extra promisState.'
        const fetchedBooks = this.currentSubjPromiseState.data.works.map(createBookObjCB);
        this.fetchNextSub();

        const filtered = fetchedBooks.filter(ad => //filter out all books already in liked.
            this.likedBooks.every(fd => fd.title !== ad.title));

        this.listOfBooks = this.listOfBooks.concat(filtered);
}

        this.listOfBooks.shift();
        this.currentBook = this.listOfBooks[0];
  }

	addObserver(callback) {
		this.observers = [...this.observers, callback];
  	}

	removeObserver(callback) {
		console.log(this.observers);
    	this.observers = this.observers.filter(function (observer) { return observer !== callback;});
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
      		resolvePromise(getBookDetails(book.key), this.currentBookDetailsPromiseState);
      		console.log(this.currentBookDetailsPromiseState);
    	}
  	}

  
  

  
}

export default BinderModel;
