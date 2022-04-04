function userInfoView(props) {
  const userIcon = "https://cdn-icons-png.flaticon.com/512/219/219986.png";
  const bookIcon =
    "https://upload.wikimedia.org/wikipedia/commons/5/50/Closed_Book_Icon.svg";

  return (
    <div class="profileInfo">
      <br></br>
      <div>
        <img src={userIcon} alt="User image" height="150" />
      </div>

      <div>Hi User!</div>
      <div>Your books</div>

      <table class="table">
        <thead class="tablehead">
          <tr>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {" "}
          <img src={bookIcon} height="30" />
          Book1
        </tbody>
        <tbody>
          {" "}
          <img src={bookIcon} height="30" />
          Book2
        </tbody>
        <tbody>
          {" "}
          <img src={bookIcon} height="30" />
          Book3
        </tbody>
      </table>

      <button
        onClick={function () {
          window.location.hash = "#search";
        }}
      >
        Back
      </button>
    </div>
  );
}

export default userInfoView;
