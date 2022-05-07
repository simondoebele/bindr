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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            Profile
          </div>

          <div
            class="iconcontain"
            onClick={function () {
              window.location.hash = "#swipe";
              props.fetchSub();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              class="bi bi-search-heart"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
              <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
            </svg>
            Swipe
          </div>

          <div
            class="iconcontain"
            onClick={function () {
              window.location.hash = "#aboutus";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              class="bi bi-info-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
            About
          </div>

          <div
            class="iconcontain"
            onClick={function () {
              window.location.hash = "#login";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              class="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fill-rule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
            Logout
          </div>
        </div>
      </div>
    );
  }
}

export default userInfoView;
