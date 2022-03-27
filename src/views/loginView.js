function LoginView(props){
    return(
    <div class = "login">
        <div>Welcome!</div>
        <div>Sign in with</div>
        
        <div>Or create an account...</div>
        <button onClick = {function(){window.location.hash = "#search"}}>Cancel</button>
    </div>
    )

}

export default LoginView