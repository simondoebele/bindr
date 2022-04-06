import { getDishDetails, searchDishes, getBookDetails } from "./dishSource";
import resolvePromise from "./resolvePromise";

class BinderModel{
    constructor(nrGuests=2, dishArray=[], currentDish){
        this.observers = [];
        this.setNumberOfGuests(nrGuests);
        this.dishes= dishArray;
        this.searchResultsPromiseState = {};
        this.searchParams = {};
        this.currentDishPromiseState = {};
        this.currentBookPromiseState = {};
        
        this.likedBooks = [];
        this.listOfBooks = [{title: "Wuthering Heights", img:"https://upload.wikimedia.org/wikipedia/commons/6/64/Houghton_Lowell_1238.5_%28A%29_-_Wuthering_Heights%2C_1847.jpg"},
                            {title:"Don Quioxte", img:"https://upload.wikimedia.org/wikipedia/commons/f/fb/CC_No_11_Don_Quixote.jpg"}, 
                            {title:"Frankenstein", img:"https://upload.wikimedia.org/wikipedia/commons/3/39/Frankenstein.jpg"}
                            
                            ]
        //this.listOfBooks =  ["Wuthering Heights", "Don Quioxte", "Frankenstein"]
        this.currentBook = this.listOfBooks[0]; 

        //this.book = getBookDetails();
        // this.book.works is an array of 12 works
        // each work has e.g a title.
        resolvePromise(getBookDetails(), this.currentBookPromiseState)
        
        console.log(this.currentBookPromiseState.data)
    }

    addBookLiked(title){
        
        if(!this.likedBooks.find(function isBookinCB(book){return book === title.id})){
            this.likedBooks = [...this.likedBooks ,title.id] 
            this.notifyObservers({addBook: title})
        }
    }

    changeCurrentBook(){
        console.log(this.currentBookPromiseState.data.works[4].title)

        this.listOfBooks.shift()
        if(!this.listOfBooks.length){
            this.listOfBooks = [{title: "Wuthering Heights", img:"https://upload.wikimedia.org/wikipedia/commons/6/64/Houghton_Lowell_1238.5_%28A%29_-_Wuthering_Heights%2C_1847.jpg"},
                            {title:"Don Quioxte", img:"https://upload.wikimedia.org/wikipedia/commons/f/fb/CC_No_11_Don_Quixote.jpg"}, 
                            {title:"Frankenstein", img:"https://upload.wikimedia.org/wikipedia/commons/3/39/Frankenstein.jpg"}
                            
                            ]
        }
        this.currentBook = this.listOfBooks[0]
        console.log(this.listOfBooks.length)
    }

    addObserver(callback){
        this.observers = [...this.observers, callback]
    }

    removeObserver(callback){
        console.log(this.observers);
        this.observers = this.observers.filter(function (observer){return observer !== callback})
        console.log(this.observers);

    }

    notifyObservers(payload){
        this.observers.forEach(
                function invokeObserverCB(obs){
                    try{obs(payload)}
                    catch(err){console.log(err)}
                }
        )
    }
            

    setSearchQuery(q){
        this.searchParams.query = q
    }

    setSearchType(t){
        this.searchParams.type = t
    }

    doSearch(params){
    

        const theModel = this;

        function notifyACB(){
            theModel.notifyObservers();

        }

        resolvePromise(searchDishes(params), this.searchResultsPromiseState, notifyACB)
    }

    setCurrentDish(id){
        var old = this.currentDish 
        this.currentDish = id; //updated value

        const theModel = this;

        function notifyACB(){
            theModel.notifyObservers();

        }

        if(id !== undefined && old != this.currentDish){
            resolvePromise(getDishDetails(id), this.currentDishPromiseState, notifyACB);
            this.notifyObservers({setCurrent : id})
        }
        
    }

    

    setNumberOfGuests(nr){

        var temp = this.numberOfGuests

        if (nr >= 1 && Number.isInteger(nr)) {
            this.numberOfGuests = nr;
            

            if(temp !== this.numberOfGuests){
                this.notifyObservers({nrGuests: nr})
    
            }

        }else{throw 'number of guests not a positive integer';}

        
       

    }
    addToMenu(dishToAdd){
        if(!this.dishes.find(function isDishInMenuCB(dish){return dish.id === dishToAdd.id})){
            this.dishes= [...this.dishes, dishToAdd];
            this.notifyObservers({addDish: dishToAdd})
            
        }
    }
    
    removeFromMenu(dishToRemove){
       
        function hasSameIdCB(dish){

            if(dish.id != dishToRemove.id){
                return true;
            }
            return false;

        }
        if(this.dishes.find(function isDishInMenuCB(dish){return dish.id === dishToRemove.id})){
            this.dishes = this.dishes.filter(hasSameIdCB);
            this.notifyObservers({removeDish: dishToRemove})   
        }
        

    }
 
}

export default BinderModel;