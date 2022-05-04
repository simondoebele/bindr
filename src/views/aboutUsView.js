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
        of books to read.
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

      <button onClick={props.resetBooks}>Reset</button>
    </div>
  );
}

export default AboutUsView;
