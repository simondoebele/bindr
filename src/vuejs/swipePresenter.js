import SwipeView from "/src/views/swipeView.js"
import WaitUndef from "/src/views/waitUndef.js"


// TODO: 
export default
function Swipe(props){

    function isDishInMenuCB(dish){
        return dish.id === props.model.currentDish;
    }

    function onAddToLikedACB(book){
        props.model.addBookLiked(book) //Switch to currentBookPromiseState 
    }
    function changeCurrentBookACB(){
        props.model.changeCurrentBook()
    }

    function setUserACB(){
        props.model.setUser("test","test")
    }
    


    return (
         WaitUndef(props.model.currentBook)|| 
            <SwipeView 
                currentBook = {props.model.currentBook}
                onAddToLiked = {onAddToLikedACB}
                changeCurrentBook = {changeCurrentBookACB} 
                setUser = {setUserACB}
            />)
}

