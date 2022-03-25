import SearchFormView from "/src/views/searchFormView.js"
import SearchResultsView from "/src/views/searchResultsView.js"
import PromiseNoData from "/src/views/promiseNoData.js"
import resolvePromise from "../resolvePromise"
import { render } from "react-dom"
import { searchDishes } from "../dishSource";

const Search = {   // ordinary JS object literal, can have methods
    props: ["model"],
    data(){
        return{
            state: {},
            searchParams: {}
            }
    },

    created(){ lifecycle: resolvePromise(searchDishes({}), this.state)  },
    
   
    render() {
        const component = this;

        function userSearch() {
            resolvePromise(searchDishes(component.searchParams), component.state)
        }

        function userEntered(text) {
            component.searchParams.query = text;
        }
        function userSelect(value) {
            component.searchParams.type = value;
        }
        function bubbleClick(result) {
            component.model.setCurrentDish(result.id)
        }
        return(
        <div>
            <SearchFormView dishTypeOptions={["starter", "main course", "dessert"]}
                searchInitiated={userSearch}
                enteredText={userEntered}
                selectedType={userSelect} />
            {PromiseNoData(component.state) || < SearchResultsView searchResults={component.state.data} bubbleClick={bubbleClick} />}
        </div>
        );

    },
};

export default Search;