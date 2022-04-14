import SwipeView from "/src/views/swipeView.js"
import WaitUndef from "/src/views/waitUndef.js"


// TODO: 
export default
function Swipe(props){


    function onAddToLikedACB(book){
        props.model.addBookLiked(book) //Switch to currentBookPromiseState 
    }
    function changeCurrentBookACB(){
        props.model.changeCurrentBook()
    }

    return (
         WaitUndef(props.model.currentBook)|| 
            <SwipeView 
                currentBook = {props.model.currentBook}
                onAddToLiked = {onAddToLikedACB}
                changeCurrentBook = {changeCurrentBookACB} 
            />)
}

