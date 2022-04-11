function BookDetailsView(props) {
  return (
    <div class="detailsView">
      <div class="bookInfo">
        <div class="bookCover, bookCoverDetails">
          <img src={props.currentBook.img}></img>
          <br />
          <button
            onClick={function () {
              window.location.hash = "#userinfo";
            }}
          >
            Cancel
          </button>
        </div>
        <div class="bookTitleDetails">{props.currentBook.title}</div>

        <div class="bookDescriptionDetails">Description</div>
      </div>
    </div>
  );
}

export default BookDetailsView;
