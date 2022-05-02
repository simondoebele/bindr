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
        

        <div class="topnavProfile">
          <button id="profilebutton"
          onClick={function () {
            window.location.hash = "#userinfo";
          }}
        >Profile</button>

      <button class="swipebutton"
          onClick={function () {
            window.location.hash = "#swipe";
          }}
        >Swipe</button>
         <button onClick={props.resetBooks}>Reset</button>
         <button onClick={function () {
            window.location.hash = "#login";
          }}>Logout</button>
    </div>
      </div>
    );
  }
}

export default userInfoView;
