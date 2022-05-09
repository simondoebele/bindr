function LoginView(props) {

  function navigateToUserInfoACB(){
    window.location.hash = "#userinfo";
  }

  function navigateToUserCreationACB(){
      window.location.hash = "#create";
    }

  function handleLoginACB(){
      var msg = props.signIn(document.getElementById("loginUsername").value, document.getElementById("loginPassword").value);
      console.log(msg)
      // if there is no error :-) navigate
      if (msg === undefined) {
        navigateToUserInfoACB();
      }
  }

  return (
    <div class="login">
      <div class="binder">Bindr</div>
      <div>
        Never judge a <br></br> book by its cover.
      </div>

      <div class="loginProperties">
        <input id="loginUsername" type="email" placeholder="Email">
          Enter Email
        </input>
        <input
          id="loginPassword"
          type="password"
          placeholder="Password"
        ></input>
        <div>
          <button
            onClick={handleLoginACB}
          >
            Login
          </button>
        </div>

        <div class="forgotPassword">Forgot your password?</div>
      </div>

      <div
        class="notRegistered"
        onClick={navigateToUserCreationACB}
      >
        Not yet registered? Create an account here!
      </div>
    </div>
  );
}

export default LoginView;
