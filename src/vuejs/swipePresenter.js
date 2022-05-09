import SwipeView from "/src/views/swipeView.js"
import WaitUndef from "/src/views/waitUndef.js"
import PromiseNoData from "../views/promiseNoData";

// TODO: 
export default
function Swipe(props){


    function onAddToLikedACB(book){
        props.model.addBookLiked(book) //Switch to currentBookPromiseState 
    }

    function onAddToSwipedACB(book){
        props.model.addBookSeen(book) //Switch to currentBookPromiseState 
    }

    function changeCurrentBookACB(){
        props.model.changeCurrentBook()
    }

    function selectedBookACB(book) {
        props.model.setCurrentBook(book);
      }

    return (
        PromiseNoData(props.model.currentBook)|| 
            <SwipeView 
                currentBook = {props.model.currentBook}
                onAddToLiked = {onAddToLikedACB}
                onAddToSeen = {onAddToSwipedACB}
                changeCurrentBook = {changeCurrentBookACB} 
                selectedBook={selectedBookACB}
                
            />)
}

