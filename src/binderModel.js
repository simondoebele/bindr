import { getDishDetails, searchDishes } from "./dishSource";
import resolvePromise from "./resolvePromise";

class BinderModel{
    constructor(nrGuests=2, dishArray=[], currentDish){
        this.observers = [];
        this.setNumberOfGuests(nrGuests);
        this.dishes= dishArray;
        this.searchResultsPromiseState = {};
        this.searchParams = {};
        this.currentDishPromiseState = {};
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