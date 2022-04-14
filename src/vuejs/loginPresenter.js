import LoginView from "../views/loginView";
export default

function Login(props){

    function setUserACB(username, password){
        props.model.setUser(username,password)
    }

    return <LoginView setUser = {setUserACB}/>
}