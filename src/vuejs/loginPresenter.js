import LoginView from "../views/loginView";
export default

function Login(props){

    function signInACB(username, password){
        props.model.signIn(username,password)
    }

    return <LoginView signIn = {signInACB}/>
}