function LoginView(props){
    return(
    <div class = "login">
        <div class = "binder">Binder</div>
        <div>Tinder, for books!</div>

        <div class = "loginProperties">
            <input type = "text" placeholder="Username">Enter Username</input>
            <input type = "password" placeholder="Password"></input>
            <div>
                <button onClick = {function(){window.location.hash = "#userinfo"}}>Login</button>
                <button onClick = {function(){window.location.hash = "#search"}}>Cancel</button>
            </div>
            <div class = "forgotPassword" >Forgot your password?</div>
        </div>

        <div class ="notRegistered" onClick = {function(){window.location.hash = "#userinfo"}}>   
             Not yet registered? Create an account here!</div>
    </div>
    )

}



export default LoginView