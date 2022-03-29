function UserCreationView(props){
    return(
    <div class ="create">
        <div>User Creation</div>
        Name:<input class ="createName"></input>
        
        <div>Please pick 5 genres that interest you</div>
        <div class="genres">
            <button>Drama</button><button>Romance</button><button>Thriller</button>
            <button>Science-Fiction</button><button class="test">Mystery</button>
           
        </div>
        <button onClick = {function(){window.location.hash = "#login"}}>Cancel</button>
    </div>
    )

}

export default UserCreationView