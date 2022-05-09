import UserCreationView from "../views/userCreationView";
export default

function Create(props){

    function signUpACB(username, password) {
        console.log(username)
        console.log(password)
        props.model.signUp(username,password)
    }

    return <UserCreationView signUp = {signUpACB}/>
}