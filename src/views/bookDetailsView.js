function BookDetailsView(props) {
  console.log(props.currentBookDetails);
  return (
    <div class="detailsView">
      <div class="bookInfo">
        <div class="bookCover, bookCoverDetails">
          <img
            src={props.currentBookDetails.cover_id + "-M.jpg"
            }
          ></img>

          <br />
          <button
            onClick={function () {
              window.location.hash = "#userinfo";
            }}
          >
            Cancel
          </button>
        </div>
        <div class="bookTitleDetails">{props.currentBookDetails.title}</div>

        <div class="bookDescriptionDetails">
          {props.detailsPromiseState.data.description}
        </div>
      </div>
    </div>
  );
}

export default BookDetailsView;
