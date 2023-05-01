import React from 'react';
import classes from "./Navigation.module.css";

export default function Navigation({onRouteChange, isSignedIn}){
        if(isSignedIn) {
            return(
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', alignItems: 'center'}}>
                    <h1>face-recs</h1>
                    <nav className={classes.navbar}>
                        <p onClick={() => onRouteChange('signout')} className={classes.text}>Sign Out</p>
                    </nav>
                </div> 
            );
        }
        else {
            return(
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', alignItems: 'center'}}>
                    <h1>face-recs</h1>
                    <nav className={classes.navbar}>
                        <p onClick={() => onRouteChange('signin')} className={classes.text}>Sign In</p>
                        <p onClick={() => onRouteChange('register')} className={classes.text}>Register</p>
                    </nav> 
                </div>
            );
        }
}