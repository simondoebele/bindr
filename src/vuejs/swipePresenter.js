import SwipeView from "/src/views/swipeView.js"
import PromiseNoData from "/src/views/promiseNoData.js"


// TODO: 
export default
function Swipe(props){

    function isDishInMenuCB(dish){
        return dish.id === props.model.currentDish;
    }

    function onAddToMenuACB(){
        props.model.addToMenu(props.model.currentDishPromiseState.data);
    }


    return (
        PromiseNoData(props.model.currentDishPromiseState) || 
            <SwipeView 
                guests={props.model.numberOfGuests} 
                dishData = {props.model.currentDishPromiseState.data} 
                onAddToMenu = {onAddToMenuACB}
                isDishInMenu = {props.model.dishes.find(isDishInMenuCB)} 
            />)
}

