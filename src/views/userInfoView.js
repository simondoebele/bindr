function userInfoView(props) {
  const userIcon = "https://cdn-icons-png.flaticon.com/512/219/219986.png";
  const bookIcon =
    "https://upload.wikimedia.org/wikipedia/commons/5/50/Closed_Book_Icon.svg";
  const books = props.likedBooks;

  function bookTableCB(bookarray) {
    function removeBookACB() {
      props.removeBook(bookarray);
    }

    function selectedBookACB() {
      //props.selectedBook(books); //book object to change current
      window.location.hash = "#details";
    }

    return (
      <tr>
        <td>
          <img src={bookIcon} height="30" class="img" />

          <span
            class="cut-off"
            title={bookarray}
            onClick={function () {
              window.location.hash = "#details";
            }}
          >
            {bookarray.title}
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

        <div class="profileInfoHeader">Hi.</div>
        <div class="profileInfoHeader">Here's your liked books.</div>

        <div class="tableContainer">
          <table class="table">
            <tbody>{books.map(bookTableCB)}</tbody>
          </table>
        </div>

        <button
          onClick={function () {
            window.location.hash = "#swipe";
          }}
        >
          Swipe
        </button>
      </div>
    );
  }
}

export default userInfoView;
