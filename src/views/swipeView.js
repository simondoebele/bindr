function SwipeView(props) {
  function addBookACB() {
    props.onAddToLiked(props.currentBook);
    props.onAddToSeen(props.currentBook);
    props.changeCurrentBook();
  }

  function deleteBookACB() {
    props.onAddToSeen(props.currentBook);
    props.changeCurrentBook();
  }

  function selectedBookACB() {
    props.selectedBook(props.currentBook); //book object to change current
  }

  return (
    <div class="swipe">
      <div
        onClick={function () {
          window.location.hash = "#details";
          props.selectedBook(props.currentBook);
        }}
        class="bookInfo"
      >
        <img src={props.currentBook.cover_id + "-M.jpg"}></img>
        <div class="swipeTitle">{props.currentBook.title}</div>
        <div class="author">By Jane Doe</div>
        <div class="description">A fantastic book about...</div>
      </div>

      <div class="like">
        <img
          height="75"
          width="75"
          src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Eo_circle_green_heart.svg"
          onClick={addBookACB}
        ></img>
      </div>

      <div class="dislike">
        <img
          height="75"
          width="75"
          src="https://upload.wikimedia.org/wikipedia/commons/8/83/Eo_circle_red_white_letter-x.svg"
          onClick={deleteBookACB}
        ></img>
      </div>

      <div class="topnavDetails">
        <div
          class="iconcontain"
          onClick={function () {
            window.location.hash = "#details";
          }}
        >
          <img
            height="35"
            width="35"
            src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Eo_circle_grey_hash.svg"
          >
            Hello
          </img>
          Details
        </div>

        <div
          class="iconcontain"
          onClick={function () {
            window.location.hash = "#userinfo";
          }}
        >
          <img
            height="35"
            width="35"
            src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Eo_circle_grey_info.svg"
          >
            Hello
          </img>
          Profile
        </div>

        <div
          class="iconcontainCurr"
          onClick={function () {
            window.location.hash = "#swipe";
            props.fetchSub();
          }}
        >
          <img
            height="35"
            width="35"
            src="https://upload.wikimedia.org/wikipedia/commons/d/df/Eo_circle_grey_repeat.svg"
          >
            Hello
          </img>
          Swipe
        </div>

        <div
          class="iconcontain"
          onClick={function () {
            window.location.hash = "#aboutus";
          }}
        >
          <img
            height="35"
            width="35"
            src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Eo_circle_grey_info.svg"
          >
            Hello
          </img>
          About
        </div>
      </div>
    </div>
  );
}

export default SwipeView;
