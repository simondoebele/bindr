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
      <button
        class="bookDetailsButton"
        onClick={function () {
          window.location.hash = "#userinfo";
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default BookDetailsView;
