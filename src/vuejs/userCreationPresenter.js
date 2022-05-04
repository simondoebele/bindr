import UserCreationView from "../views/userCreationView";
export default

function Create(props){

    function createUserACB(username, password) {
        console.log(username)
        console.log(password)
        props.model.createUser(username,password)
    }

    return <UserCreationView createUser = {createUserACB}/>
}