function DetailsView(props){

    function addDishACB(){
        props.onAddToMenu();
        window.location.hash = "#search";

    }

    function ingredientsCB(array){
        return(
            <div>
                {array.name + ": " + array.amount + " " + array.unit}
            </div>
        );
    }
    return(
    <div class = "detailsView">

        <div class = "dishInfo">
            <div class = "image">
                <img src = {props.dishData.image} height = "150" ></img>
            </div>
            
            <div class="ingredients">
                Ingredients   
                {props.dishData.extendedIngredients.map(ingredientsCB)}
                <a href={props.dishData.sourceUrl}>More Info</a>
            </div>
        </div>

        <div class = "detailsTitle">
            {props.dishData.title}
            <div>Price: {props.dishData.pricePerServing }</div>
            <div>For {props.guests} guests {(props.dishData.pricePerServing * props.guests).toFixed(2)}</div>
            <div class = "instructions">{props.dishData.instructions}</div>
        </div>
        <div class = "buttons">
            <button onClick = {addDishACB} disabled = {props.isDishInMenu}>Add to menu</button>
            <button onClick = {function(){window.location.hash = "#search"}}>Cancel</button>

        </div>
    </div>
    );


    
}

export default DetailsView