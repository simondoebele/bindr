/*
    Inputs a firebase error and outputs an error message that the user understands.
    If error is not part of this list, returns null.
    For more errors to add to the list:
    https://firebase.google.com/docs/reference/js/auth#autherrorcodes
*/
export function firebaseErrorMsgs(error){
    if(!error || !error?.code){
        return;
    }
    // for Signing up
    if(error.code === "auth/email-already-in-use") return "Email already in use. Go to sign in!";
    else if ( error.code === "auth/account-exists-with-different-credential" ) return "Account already exists. Go to sign in!!"
    else if ( error.code === "auth/weak-password" ) return "Passwords must have at least 6 characters!"

    // for Signing in
    else if ( error.code === "auth/invalid-email" ) return "Invalid email!"
    else if ( error.code === "auth/wrong-password" ) return "Invalid password!"
    else if ( error.code === "auth/invalid-app-credential" ) return "Invalid credential."
    else if ( error.code === "auth/user-not-found" ) return "You need to sign up first!"
    else if ( error.code === "auth/null-user" ) return "User does not exist. Go to Sign up!"

    // other:
    else if ( error.code === "auth/network-request-failed") return "Failed due to a network error!"    

    //else if ( error.code === "" ) return ""
    else return;
}