function UserCreationView(props){
    return(
    <div class ="create">
        <div class = "binder">Binder</div>
        <div>Create your account</div>
        

        <div class = "loginProperties">
            <input id = "createUsername" type = "email" placeholder="Email">Enter Email</input>
            <input id = "createPassword" type = "password" placeholder="Password" minlength = "6"></input>
            <div>
                <button onClick = {function(){ window.location.hash = "#pick"; props.createUser(document.getElementById("createUsername").value, document.getElementById("createPassword").value) }}>Create</button>
                <button onClick = {function(){window.location.hash = "#login"}}>Cancel</button>
            </div>
        </div>
    </div>
    )

}

export default UserCreationView