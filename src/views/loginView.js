function LoginView(props) {
    return (
        <div class="login">
            <div class="binder">Bindr</div>
            <div>Never judge a <br></br> book by its cover.</div>

            <div class="loginProperties">
                <input id = "loginUsername" type="email" placeholder="Email">Enter Email</input>
                <input id = "loginPassword" type="password" placeholder="Password"></input>
                <div>
                    <button onClick={function () { window.location.hash = "#userinfo"; props.setUser(document.getElementById("loginUsername").value, document.getElementById("loginPassword").value) }}>Login</button>
                </div>

                
                <div class="forgotPassword" >Forgot your password?</div>
            </div>

            <div class="notRegistered" onClick={function () { window.location.hash = "#create" }}>
                Not yet registered? Create an account here!</div>
        </div>
    )

}



export default LoginView