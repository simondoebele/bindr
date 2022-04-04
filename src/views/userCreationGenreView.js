function UserCreationGenreView(props){
    return(
    <div class ="create">
        <div class = "binder">Binder</div>
        <div>Pick genres that interest you</div>

        <div>
            <button>Drama</button>
            <button>Romance</button>
            <button>Thriller</button>
            <button>Sci-Fi</button>
            <button>Mystery</button>
        </div>

        <button onClick={function(){window.location.hash = "#userinfo"}}>Done</button>
    </div>
    )

}

export default UserCreationGenreView