function SearchResultsView(props){

    function searchResultsCB(param){
        let URL = "https://spoonacular.com/recipeImages/" + param.image

        function bubbleClickACB(){
            props.bubbleClick(param)
            window.location.hash = "#details"
        }

        return(
        <span class = "searchResult" onClick = {bubbleClickACB}>
            <img src = {URL} height = "100" ></img>
            <div>
                {param.title}
            </div>
            
        </span>
        );
        
    }


    return(
        <div>
            {props.searchResults.map(searchResultsCB)}
        </div>

    );

}

export default SearchResultsView