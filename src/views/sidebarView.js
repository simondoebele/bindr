import { dishType } from "../utilities";
import { menuPrice } from "../utilities";
import { sortDishes } from "../utilities";

function SidebarView(props){

    function dishTableCB(dish){

        return <tr class = "entry" key={""}>
                    <td><button onClick={function(){props.onRemove(dish)}}>x</button></td>
                    <td> <a href="#details" onClick={function(){props.onSet(dish)}}>{dish.title}</a></td>
                    <td>{dishType(dish)}</td>
                    <td class = "qt">{(dish.pricePerServing * props.number).toFixed(2)}</td>
                </tr>;
    }

    function summaryTableCB(dish){
        return <tr>
                <td></td>
                <td>Total:</td>
                <td></td>
                <td class = "qt">{(menuPrice(dish)*props.number).toFixed(2)}</td>
            </tr>

    }


    return (
            <div class="SidebarView">

                <div class="guestView">
                
                    <div id = "nrGuests">Number of guests</div>

                    <button id = "addGuestLeft" disabled={props.number <= 1} onClick={function(){props.onNumberChange(props.number-1)}}>-</button> 

                    <span id = "nrGuests" title="nr guests">{props.number}</span>

                    <button id = "addGuestRight" onClick={function(){props.onNumberChange(props.number+1)}}>+</button>
                    
                </div>

            <table>    
                <tbody>

                    {sortDishes(props.dishes).map(dishTableCB)}

                    {summaryTableCB(props.dishes)}

                </tbody>
            </table>

            </div>
    );
}


export default SidebarView;