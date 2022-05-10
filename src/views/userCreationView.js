function UserCreationView(props) {
  function navigateToLoginCB() {
    window.location.hash = "#login";
  }

  function navigateToPickGenresCB() {
    window.location.hash = "#pick";
  }

  function handleSignUpACB() {
    var msg = props.signUp(
      document.getElementById("createUsername").value,
      document.getElementById("createPassword").value
    );
    console.log("created " + msg);
    // if there is no error :-) navigate
    // if (msg === undefined && msg != null) {
    //     navigateToPickGenresCB();
    // }
  }

  return (
    <div class="create">
      <div class="binder">Bindr</div>
      <div>Create your account</div>

      <div class="loginProperties">
        <input id="createUsername" type="email" placeholder="Email">
          Enter Email
        </input>
        <input
          id="createPassword"
          type="password"
          placeholder="Password"
          minlength="6"
        ></input>
        <div>
          <button onClick={handleSignUpACB}>Create</button>
          <button onClick={navigateToLoginCB}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default UserCreationView;
