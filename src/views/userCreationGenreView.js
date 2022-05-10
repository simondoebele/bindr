function UserCreationGenreView(props){
    function SubButton(sub) {
        const cleanString = sub.replace('_',' ')
        const readyString = cleanString.charAt(0).toUpperCase() + cleanString.slice(1)

            function onClickSubACB() {
                
                props.onClickSub(sub)
            }

        return (
                <button onClick={onClickSubACB}>{readyString}</button>
        )
    }
    
    return(
    <div class ="create">
        <div class = "binder">Bindr</div>
        <div>Pick {props.subLeft()} genres that interest you.</div>
        <div class = "userSubjects">
            {props.subs.subjects.filter( ( el ) => !props.currentSubs.includes( el ) ).map(SubButton)}
        </div>

        <button disabled id = "nextbtn" onClick={function(){window.location.hash = "#userinfo"}}>Next</button>
    </div>
    )

}

export default UserCreationGenreView