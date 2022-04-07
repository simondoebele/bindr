// do not import firebase, it is done for you by the 3.5 tests!
// this is needed so that unit tests can inject a mock firebase
import firebaseConfig from "/src/firebaseConfig.js";
import {getDishDetails}  from "./dishSource.js";
import BinderModel from "./binderModel";
firebase.initializeApp({
    apiKey: "AIzaSyBH2BtAtW0SS6jwGDw5dMjVDH_sOB9dZKY",
    authDomain: "binder-e215b.firebaseapp.com",
    databaseURL: "https://binder-e215b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "binder-e215b",
    storageBucket: "binder-e215b.appspot.com",
    messagingSenderId: "684501139736",
    appId: "1:684501139736:web:3276001a1e827f698d9e6d"
});

//  NN is your TW2_TW3 group number
const REF = "dinnerModel50"; //switch this to binder-e215b when old firebase is done
const REF1 = "binder-e215b"



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
            //New stuff
            if (payload.addBook) {
                firebase.database().ref(REF1 + "/likedBooks/" + payload.addBook.id).set(payload.addBook.id);
            }
            if (payload.removeLikedBook) {
                firebase.database().ref(REF1 + "/likedBooks/" + payload.removeLikedBook).set(null);
            }
            if (payload.addGenre) {
                firebase.database().ref(REF1 + "/Genres/" + payload.addGenre.id).set(payload.addGenre.id);
            }
            if (payload.addAccount) {
                const auth = getAuth();
                firebase.auth().createUserWithEmailAndPassword(payload.addAccount.email, payload.addAccount.pass).then(userWasCreatedACB).catch()
                // sign-in automatically after first login
                firebase.auth().signInWithEmailAndPassword(payload.addAccount.email, payload.addAccount.pass).then(userLoggedInACB).catch()   
            }
            if (payload.deleteAccount) {
                // TODO
            }
            if (payload.signIn) {
                const auth = getAuth();
                firebase.auth().signInWithEmailAndPassword(payload.addAccount.email, payload.addAccount.pass).then(userLoggedInACB).catch()
            }
            if (payload.signOut) {
                firebase.auth().signOut().then(signoutSuccessACB).catch(signoutErrorACB)
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
    function addLikedBook(data) {
        if(!model.likedBooks.find(function isBookInLikedCB(book){return book.id == data.key})){
            model.addBookLiked({id:data.key})
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

    firebase.database().ref(REF1 + "/likedBooks").on("child_added", addLikedBook)
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