// do not import firebase, it is done for you by the 3.5 tests!
// this is needed so that unit tests can inject a mock firebase
import firebaseConfig from "/src/firebaseConfig.js";
import {getDishDetails}  from "./dishSource.js";
import BinderModel from "./binderModel";
firebase.initializeApp({
    apiKey: "AIzaSyCPE1M8W5A_WQjfx9T8GZVDmtA2koRGtew",
    authDomain: "lab-dinner-planner.firebaseapp.com",
    databaseURL: "https://lab-dinner-planner-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lab-dinner-planner",
    storageBucket: "lab-dinner-planner.appspot.com",
    messagingSenderId: "329576991502",
    appId: "1:329576991502:web:cf87743088fa1f17c1e55f"
});

//  NN is your TW2_TW3 group number
const REF = "dinnerModel50";



 function updateFirebaseFromModel(model) {
    function observerACB(payload) {
        // payload is js object, key value pair (key : value)
        if (payload) {
            if (payload.nrGuests) {
                firebase.database().ref(REF + "/numberGuests").set(payload.nrGuests);
            }
            if (payload.removeDish) {
                firebase.database().ref(REF + "/Dishes/" + payload.removeDish.id).set(null);
            }
            if (payload.addDish) {
                firebase.database().ref(REF + "/Dishes/" + payload.addDish.id).set(payload.addDish.id);
            }
            if (payload.setCurrent) {
                firebase.database().ref(REF + "/currentDish").set(payload.setCurrent);
            }

        }
    }
    model.addObserver(observerACB)

}
function updateModelFromFirebase(model) {

    firebase.database().ref(REF + "/numberGuests").on(
        "value",
        function guestsChangedInFirebaseACB(firebaseData) {
            model.setNumberOfGuests(firebaseData.val());
        })

    firebase.database().ref(REF + "/currentDish").on(
        "value",
        function dishChangedInFirebaseACB(firebaseData) {
            model.setCurrentDish(firebaseData.val());
        })

    function fetchDishDataBasedOnID(id) {
        return getDishDetails(id);
    }
    function getIdFromFirebase(data) {
        // only initiate promise if NOT inside dishes
        if(!model.dishes.find(function isDishInMenuCB(dish){return dish.id == data.key})){
            fetchDishDataBasedOnID(data.key).then(function AddDishToMenu(dish) { model.addToMenu(dish)}) 
        }
    }

    function removeIdFromFirebase(data) {
        //doesnt need to init promise
        model.removeFromMenu({id : +data.key}) // dummy literal
    }

    firebase.database().ref(REF + "/Dishes").on(
        "child_added",
        getIdFromFirebase)

    firebase.database().ref(REF + "/Dishes").on(
        "child_removed",
        removeIdFromFirebase)
    }


    function firebaseModelPromise(){


        function allDishesRecvPromiseACB(firebaseData){
            

            function makeDishPromiseCB(dishId){
                return getDishDetails(dishId)
            }

            function createModelACB(dishArray){
                return new BinderModel(firebaseData.val().numberGuests, dishArray)
    
            }

            const dishPromiseArray= Object.keys(firebaseData.val().Dishes ).map(makeDishPromiseCB);

            return Promise.all(dishPromiseArray).then(createModelACB)

        }
        return firebase.database().ref(REF).once("value").then(allDishesRecvPromiseACB);
}


export {updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise}