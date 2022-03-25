import SummaryView from "../views/summaryView.js";
import {shoppingList} from "/src/utilities.js"

export default
function Summary(props){
    return <SummaryView people={props.model.numberOfGuests} 
                        ingredients={shoppingList(props.model.dishes)}
            
            />;
}
