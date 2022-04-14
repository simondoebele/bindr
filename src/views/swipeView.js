function SwipeView(props) {
  function addBookACB() {
    props.onAddToLiked(props.currentBook);
    props.changeCurrentBook();
  }

  function deleteBookACB() {
    props.changeCurrentBook();
  }

  // TODO: integrate new API so to change dish data to book data + the book Description
  // TODO: functionality needed to decide which book is shown (e.g. based on user's favorite genres;...
  //...later possibly more sophisticated)!! -> in the model!
  // TODO: change all CSS to match our style
  // TODO: add Menu bar (or burger menu) to change between different views...
  // ... in order to do:  <button onClick = {function(){window.location.hash = "#search"}}>Cancel</button>
  return (
    <div class="swipe">
      <button
        onClick={function () {
          window.location.hash = "#userinfo";
        }}
      >
        Profile
      </button>
      <div class="bookInfo">
        <div class="bookCover">
          <img src={props.currentBook.cover_id + "-M.jpg"}></img>
        </div>
        <div>
          <div class="swipeTitle">{props.currentBook.title}</div>
          Description
        </div>
      </div>

      <div class="like">
        <img
          height="75"
          width="75"
          src="https://upload.wikimedia.org/wikipedia/commons/9/97/Twemoji13_1f60d.svg"
          onClick={addBookACB}
        ></img>
      </div>

      <div class="dislike">
        <img
          height="75"
          width="75"
          src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Twemoji13_1f4a9.svg"
          onClick={deleteBookACB}
        ></img>
      </div>
    </div>
  );
}

export default SwipeView;
