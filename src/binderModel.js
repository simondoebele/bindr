import { getBookDetails, getSubDetails } from "./bookSource";
import resolvePromise from "./resolvePromise";
import "firebase/auth";
import "firebase/database";

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

    }
    
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

                    //protection against coverless books
                    if (!json.covers) {
                        json.covers = [" "];
                    }
                   

                    const base_url = 'https://covers.openlibrary.org/b/id/'
                    const cover_id = base_url + json.covers[0];                                                                 
                    const title = json.title;
                    const key = OLkey;
                    const book = { title: title, cover_id: cover_id, key: key };
                    return book;
            
                }
                return getBookDetails(OLkey).then(getBookFromJson);

            }
            function updateLikedBooks(likedArray){
                component.setLikedBooks(likedArray)
                return likedArray;
            }
            const seenBooksPromiseArray = Object.keys(data.val().seenBooks).map(makeBooksCB)
            const booksPromiseArray = Object.keys(data.val().likedBooks).map(makeBooksCB)
            const subs = Object.keys(data.val().userSubjects);
            component.userSubjects = subs;
            console.log(subs)
            Promise.all(seenBooksPromiseArray).then(seenArray => component.seenBooks = seenArray)
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
            console.log(this.userSubjects)
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

            // Since we have no data and UserInfo checks the likedBooksPromise we just give it some dummy values
            this.likedBooksPromise.promise = 1
            this.likedBooksPromise.data = []
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


    addBookSeen(bookToAdd) {
		if (
		!this.seenBooks.find(function isBookinCB(book) {
			return book === bookToAdd.title;
		}) &&
		!(typeof bookToAdd.title == "undefined")
		) {
		this.seenBooks = [...this.seenBooks, bookToAdd];

		this.notifyObservers({ seenBook: {bookToAdd : bookToAdd, uid:this.currentUser.uid} });
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

    resetBooks(){
        this.notifyObservers({resetBooks: true})
    }

    fetchNextSub() {
        const tmp = this.userSubjects[0];
        resolvePromise(getSubDetails(tmp), this.currentSubjPromiseState);
        this.userSubjects.shift();
        this.userSubjects = [...this.userSubjects, tmp];
    }

    addSub(subToAdd) {
        if (!this.userSubjects.find(function isSubInCB(sub) { return sub === subToAdd})) {
                this.userSubjects = [...this.userSubjects, subToAdd];
                this.notifyObservers({ addSub: {subToAdd : subToAdd, uid:this.currentUser.uid} });
            }
        
    }


  changeCurrentBook() {
    const component = this;

    function createBookObjCB(elem) {
        const cover_id = "https://covers.openlibrary.org/b/id/" + elem.cover_id;
        const key = elem.key.replace("/works/", "");

        return { title: elem.title, cover_id: cover_id, key: key };
        //this.listOfBooks = [...this.listOfBooks,{title: elem.title, img: "https://upload.wikimedia.org/wikipedia/commons/6/64/Houghton_Lowell_1238.5_%28A%29_-_Wuthering_Heights%2C_1847.jpg"}]
    }
    
    if (this.listOfBooks.length < 5) {
    //Beware!! This might be troublesome in the future, might wanna have an extra promisState.'
        const fetchedBooks = this.currentSubjPromiseState.data.works.map(createBookObjCB);
        this.fetchNextSub();

        const filtered = fetchedBooks.filter(ad => //filter out all books already in liked.
            this.likedBooks.every(fd => fd.title !== ad.title));

        const filtered2 = filtered.filter(ad => // also filter out all books already in seen.
            this.seenBooks.every(fd => fd.title !== ad.title));

        this.listOfBooks = this.listOfBooks.concat(filtered2);
        };

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
