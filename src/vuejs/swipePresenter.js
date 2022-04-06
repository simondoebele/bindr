import SwipeView from "/src/views/swipeView.js"
import PromiseNoData from "/src/views/promiseNoData.js"


// TODO: 
export default
function Swipe(props){

    function isDishInMenuCB(dish){
        return dish.id === props.model.currentDish;
    }

    function onAddToMenuACB(book){
        props.model.addBookLiked({id:book.title}) //Switch to currentBookPromiseState 
    }
    function changeCurrentBookACB(){
        props.model.changeCurrentBook()
    }
    


    return (
        PromiseNoData(props.model.currentDishPromiseState) || 
            <SwipeView 
                guests={props.model.numberOfGuests} 
                dishData = {props.model.currentDishPromiseState.data} 
                currentBook = {props.model.currentBook}
                onAddToMenu = {onAddToMenuACB}
                isDishInMenu = {props.model.dishes.find(isDishInMenuCB)}
                changeCurrentBook = {changeCurrentBookACB} 
            />)
}

