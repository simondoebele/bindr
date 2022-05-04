function userInfoView(props) {
  const userIcon = "https://cdn-icons-png.flaticon.com/512/219/219986.png";
  const bookIcon =
    "https://upload.wikimedia.org/wikipedia/commons/5/50/Closed_Book_Icon.svg";
  const books = props.likedBooks;

  function bookTableCB(elem) {
    function removeBookACB() {
      props.removeBook(elem);
    }

    function resetBooksACB() {
      props.resetBooks();
    }

    function selectedBookACB() {
      props.selectedBook(elem); //book object to change current
      window.location.hash = "#details";
    }
    return (
      <tr>
        <td>
          <img src={elem.cover_id + "-S.jpg"} height="30" class="img" />

          <span class="cut-off" title={elem.title} onClick={selectedBookACB}>
            {elem.title}
          </span>
          <button class="removeButton" onClick={removeBookACB}>
            x
          </button>
        </td>
      </tr>
    );
  }
  if (!(typeof books == "undefined")) {
    return (
      <div class="profileInfo">
        <br></br>
        <div>
          <img src={userIcon} alt="User image" height="150" />
        </div>

        <div class="profileInfoHeader">
          Hi {props.currentUser.email.split("@")[0]}!
        </div>
        <div class="profileInfoHeader">Here's your liked books.</div>

        <div class="tableContainer">
          <table class="table">
            <tbody>{books.map(bookTableCB)}</tbody>
          </table>
        </div>

        <div class="topnavDetailsUser">
          <div
            class="iconcontainCurr"
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
            class="iconcontain"
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
}

export default userInfoView;
