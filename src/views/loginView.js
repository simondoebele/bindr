function LoginView(props){
    return(
    <div class = "login">
        <div class = "binder">Bindr</div>
        <div>Never judge a <br></br> book by its cover.</div>

        <div class = "loginProperties">
            <input type = "text" placeholder="Username">Enter Username</input>
            <input type = "password" placeholder="Password"></input>
            <div>
                <button onClick = {function(){window.location.hash = "#userinfo"}}>Login</button>
            </div>
            <div class = "forgotPassword" >Forgot your password?</div>
        </div>

        <div class ="notRegistered" onClick = {function(){window.location.hash = "#create"}}>   
             Not yet registered? Create an account here!</div>
    </div>
    )

}



export default LoginView