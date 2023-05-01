
import React from "react";
import classes from "./Signin.module.css";



class Signin extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            signInEmail: '',
            signInPassword: ''
        }
    }



    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://thawing-chamber-69828.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user  => {
            if (user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })   

    }


    render(){
        const { onRouteChange } = this.props;
        return(
            <div className="" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div className={classes.form_background}>
            <fieldset id="sign_up" className={classes.fieldset} style={{border: 'none', margin: '0'}}>
              <div className={classes.legend_container}>
                <legend className="" style={{fontSize: '2rem', fontWeight: 'bold'}}>Sign In</legend>
              </div>
              <div className="" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <label className="" htmlFor="email-address" style={{margin: '1rem'}}>Email</label>
                <input 
                  onChange={this.onEmailChange}
                  className="" 
                  type="email" 
                  name="email-address"  
                  id="email-address"
                  style={{padding: '0.5rem', borderRadius: '5px', border: '1px solid gray', marginBottom: '1rem'}}
                />
              </div>
              <div className="" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <label className="" htmlFor="password" style={{margin: '1rem'}}>Password</label>
                <input 
                  onChange={this.onPasswordChange}
                  className="" 
                  type="password" 
                  name="password"  
                  id="password"
                  style={{padding: '0.5rem', borderRadius: '5px', border: '1px solid gray', marginBottom: '1rem'}}
                />
              </div>
            </fieldset>
            <div className="" style={{marginTop: '1rem'}}>
              <input 
                onClick={this.onSubmitSignIn}
                className="" 
                type="submit" 
                value="Sign in"
                style={{padding: '0.5rem 1rem', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer'}}
              />
            </div>
            <div className="" style={{marginTop: '1rem'}}>
              <p onClick={() => onRouteChange('register')}href="#0" className="" style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>Register</p>
            </div>
            </div>
          </div>
          
        );
    }
}

export default Signin;