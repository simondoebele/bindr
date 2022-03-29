function SwipeView(props){

    function addBookACB(){
        props.onAddToMenu();
        window.location.hash = "#search";
    }

    function deleteBookACB(){
        props.onAddToMenu();
        window.location.hash = "#search";
    }


    // TODO: integrate new API so to change dish data to book data + the book Description
    // TODO: functionality needed to decide which book is shown (e.g. based on user's favorite genres;... 
        //...later possibly more sophisticated)!! -> in the model!
    // TODO: change all CSS to match our style
    // TODO: add Menu bar (or burger menu) to change between different views...
        // ... in order to do:  <button onClick = {function(){window.location.hash = "#search"}}>Cancel</button>
    return(
    <div class = "detailsView">
        <div class = "detailsTitle">
            {props.dishData.title} The Book
        </div>
        <div class = "dishInfo">
            <div class = "image">
                <img src = {props.dishData.image} height = "150" ></img>
            </div>
            <div>
                Description
            </div>
        </div>
        <div class = "buttons">
            <button onClick = {addBookACB} disabled = {props.isDishInMenu}>Like!</button>
        </div>
        <button onClick = {function(){window.location.hash = "#search"}}>Back to Overview</button>
    </div>
    );


    
}

export default SwipeView