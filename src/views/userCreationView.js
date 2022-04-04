function UserCreationView(props){
    return(
    <div class ="create">
        <div class = "binder">Binder</div>
        <div>Create your account</div>
        

        <div class = "loginProperties">
            <input type = "text" placeholder="Username">Enter Username</input>
            <input type = "password" placeholder="Password"></input>
            <div>
                <button onClick = {function(){window.location.hash = "#pick"}}>Create</button>
                <button onClick = {function(){window.location.hash = "#login"}}>Cancel</button>
            </div>
        </div>
    </div>
    )

}

export default UserCreationView