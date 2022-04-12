import SwipeView from "/src/views/swipeView.js"
import PromiseNoData from "/src/views/promiseNoData.js"


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
    


    return (
        PromiseNoData(props.model.currentDishPromiseState) || 
            <SwipeView 
                currentBook = {props.model.currentBook}
                onAddToLiked = {onAddToLikedACB}
                changeCurrentBook = {changeCurrentBookACB} 
            />)
}

