/* Functional JSX component. Name starts with capital letter */
import {sortIngredients} from "/src/utilities.js"


function SummaryView(props){
    return (
            <div class="summary">
                
                Summary for <span title="nr guests">{props.people}</span> persons
                <button onClick={function(){window.location.hash="#search"}}>Back</button>
            
                {
                renderIngredients(props.ingredients, props.people)
                }
                
            </div>
    );
}

/* For TW1.5. If you are at TW1.2, wait :) */
/* This is an ordinary JS function, not a component. It will be invoked from the component above */
function renderIngredients(ingredientArray, people){
    function ingredientTableRowCB(ingr){
        return <tr class = "ingredientTable" key={ingr.id}>
                    <td>{ingr.name}</td> 
                    <td>{ingr.aisle}</td>
                    <td class="qt">{(ingr.amount * people).toFixed(2)} </td>
                    <td> {ingr.unit} </td>
                </tr>;
    }
    
    
    return <table>
        <thead>
        <tr><th>Name</th><th>Aisle</th><th>Quantity</th><th>Unit</th></tr>
        </thead>
        <tbody>

           { 
            sortIngredients(ingredientArray).map(ingredientTableRowCB)
          }

        </tbody>
        </table>;
         
   
        
}

export default SummaryView;
export {renderIngredients};   // we export so that tests can analyze the source code
