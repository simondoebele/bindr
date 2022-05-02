function BookDetailsView(props) {
  console.log(props.currentBookDetails);
  return (
    <div class="details">
      <div class="bookInfo">
        <div class="bookCoverDetails">
          <img
            class="bookDetailsImage"
            src={props.currentBookDetails.cover_id + "-M.jpg"}
          ></img>

          <br />
        </div>
        <div class="bookTitleDetails">
          {props.currentBookDetails.title}
          <div class="bookDescriptionDetails">
            {props.detailsPromiseState.data.description}
          </div>
        </div>
      </div>
      <div class="topnavDetails">
          <button id="detailsbutton"
          onClick={function () {
            window.location.hash = "#details";
          }}
        >Details</button>

<button onClick={function () {
            window.location.hash = "#userinfo";
          }}>Profile</button>

      <button class="swipebutton"
          onClick={function () {
            window.location.hash = "#swipe";
          }}
        >Swipe</button>
         
    </div>
    </div>
  );
}

export default BookDetailsView;
