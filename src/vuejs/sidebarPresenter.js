import SidebarView from "../views/sidebarView.js"

export default
function Sidebar(props){

    function numberChangeACB(nr){props.model.setNumberOfGuests(nr);}

    function removeDishACB(dish){
        props.model.removeFromMenu(dish)
    }

    function setDishACB(dish){
        props.model.setCurrentDish(dish.id)
    }

    return <SidebarView dishes = {props.model.dishes} 
                        number={props.model.numberOfGuests} 
                        onNumberChange={numberChangeACB}
                        onRemove={removeDishACB}
                        onSet={setDishACB}
                        
                        />;
}