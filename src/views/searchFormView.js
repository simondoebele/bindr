function SearchFormView(props) {
  function dishTypeOptionsCB(param) {
    return <option value={param}>{param}</option>;
  }

  function onSearchACB() {
    props.searchInitiated();
  }
  function onInputACB(event) {
    props.enteredText(event.target.value);
  }
  function onSelectACB(event) {
    props.selectedType(event.target.value);
  }

  return (
    <div class="searchForm">
      <input onChange={onInputACB} id="hello" type="search" />
      <select onChange={onSelectACB} name="options" id="dishtype">
        <option value="">Choose:</option>
        {props.dishTypeOptions.map(dishTypeOptionsCB)}
      </select>
      <button onClick={onSearchACB}>Search!</button>
      <button
        onClick={function () {
          window.location.hash = "#summary";
        }}
      >
        Summary
      </button>
      <button
        onClick={function () {
          window.location.hash = "#login";
        }}
      >
        Login
      </button>
      <button
        onClick={function () {
          window.location.hash = "#userinfo";
        }}
      >
        User Information
      </button>
      <button onClick={function(){window.location.hash="#swipe"}}>Swipe!</button>  
    </div>
  );
}

export default SearchFormView;
