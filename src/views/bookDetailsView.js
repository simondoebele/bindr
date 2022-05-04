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
      <div class="iconcontainCurr" onClick={function () {
              window.location.hash = "#details";
            }}>
          <img height="35" width="35" src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Eo_circle_grey_hash.svg">Hello</img>
            Details

          </div>

          <div class="iconcontain" onClick={function () {
              window.location.hash = "#userinfo";
            }}>
          <img height="35" width="35" src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Eo_circle_grey_info.svg">Hello</img>
            Profile

          </div>

        <div class="iconcontain" onClick={function () {
            window.location.hash = "#swipe";
            props.fetchSub();
          }}>
        <img height="35" width="35" src="https://upload.wikimedia.org/wikipedia/commons/d/df/Eo_circle_grey_repeat.svg">Hello</img>
          Swipe
        </div>
         
    </div>
    </div>
  );
}

export default BookDetailsView;
