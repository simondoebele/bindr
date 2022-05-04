function AboutUsView(props) {
  return (
    <div class="profileInfo">
      <div class="binder">Bindr</div>
      <div>About us</div>
      <div class="aboutUsDescription">
        Do you love reading but find it hard to find the right book to read?{" "}
        <br />
        - Bindr is the solution for you!
        <br />
        <br />
        Bindr is an app for book-lovers who are looking for more books to
        explore. Bindr gives you suggestions based on your topics of interest,
        you swipe left or right on the books in order to add them to your list
        of books to read or discard them.
        <br />
        <br />
        Happy book-swiping!
      </div>

      <button
        onClick={function () {
          window.location.hash = "#userinfo";
        }}
      >
        Cancel
      </button>

      <div class="topnavDetailsAboutUs">
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
          class="iconcontain"
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
          class="iconcontainCurr"
          onClick={function () {
            window.location.hash = "#aboutus";
          }}
        >
          <img
            height="35"
            width="35"
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Eo_circle_grey_letter-a.svg"
          >
            Hello
          </img>
          About
        </div>
      </div>
    </div>
  );
}

export default AboutUsView;
