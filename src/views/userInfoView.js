function userInfoView(props) {
  return (
    <div class="profileInfo">
      <div>
        <img src="https://images.app.goo.gl/6naAt1r5aeHKLj2B6" height="150" />
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
          <img
            src="https://flyclipart.com/user-icon-png-pnglogocom-user-icon-png-133466"
            height="30"
          />
          Book1
        </tbody>
        <tbody>
          {" "}
          <img
            src="https://flyclipart.com/user-icon-png-pnglogocom-user-icon-png-133466"
            height="30"
          />
          Book2
        </tbody>
        <tbody>
          {" "}
          <img
            src="https://flyclipart.com/user-icon-png-pnglogocom-user-icon-png-133466"
            height="30"
          />
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
