
import classes from "./Navigation.module.css";

export default function Navigation({onRouteChange, isSignedIn}){
        if(isSignedIn) {
            return(
                <nav className={classes.navbar}>
                    <p onClick={() => onRouteChange('signout')} className={classes.text}>Sign Out</p>
                </nav> 
            );
        }
        else {
            return(
                <nav className={classes.navbar}>
                    <p onClick={() => onRouteChange('signin')} className={classes.text}>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className={classes.text}>Register</p>
                </nav> 
            );
        }
}