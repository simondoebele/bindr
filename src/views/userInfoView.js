function userInfoView(props) {
  const userIcon = "https://cdn-icons-png.flaticon.com/512/219/219986.png";
  const bookIcon =
    "https://upload.wikimedia.org/wikipedia/commons/5/50/Closed_Book_Icon.svg";
  const books = props.likedBooks

  function bookTableCB(bookarray) {
    return (
      <tr>
        <td>
          <img src={bookIcon} height="30" />
          {bookarray}
        </td>
      </tr>
    );
  }

  return (
    <div class="profileInfo">
      <br></br>
      <div>
        <img src={userIcon} alt="User image" height="150" />
      </div>

      <div>Hi!</div>
      <div>Your Liked Books</div>

      <table class="table">
        <thead class="tablehead">
          <tr>
            <th>Books</th>
          </tr>
        </thead>

        <tbody>{books.map(bookTableCB)}</tbody>
      </table>

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

export default userInfoView;
