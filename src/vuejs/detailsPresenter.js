import DetailsView from "/src/views/detailsView.js"
import PromiseNoData from "/src/views/promiseNoData.js"


export default
function Details(props){

    function isDishInMenuCB(dish){
        return dish.id === props.model.currentDish;
    }

    function onAddToMenuACB(){
        props.model.addToMenu(props.model.currentDishPromiseState.data);
    }


    return (PromiseNoData(props.model.currentDishPromiseState) || <DetailsView guests={props.model.numberOfGuests} 
                                                                  dishData = {props.model.currentDishPromiseState.data} 
                                                                  onAddToMenu = {onAddToMenuACB}
                                                                  isDishInMenu = {props.model.dishes.find(isDishInMenuCB)} 
                                                                  />)
}
