import UserCreationGenreView from "../views/userCreationGenreView";
import subjects from "../utilities.js"
import WaitUndef from "/src/views/waitUndef.js"
export default



function CreationGenre(props){
    
    function onClickSubACB(sub) {
        props.model.addSub(sub)
        console.log(props.model.userSubjects)
        
    }
    function subLeft() {
        var subLeft = 5 - props.model.userSubjects.length;
        if(subLeft <= 0) {
            subLeft = ""
            document.getElementById("nextbtn").disabled = false;
        }
        return subLeft
    }

    return WaitUndef(props.model.userSubjects)||<UserCreationGenreView
    subs = {subjects}
    onClickSub = {onClickSubACB}
    currentSubs = {props.model.userSubjects}
    subLeft = {subLeft}
    
    />
}