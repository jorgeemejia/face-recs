import React from 'react';
import classes from './Register.module.css'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            email: '',
            password: '',
            name: ''
        }
    }



    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://thawing-chamber-69828.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })   

    }


    render(){
        return(
<div className={classes.form_container} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div className={classes.form_background}>
        <fieldset id="sign_up" className={classes.form_fieldset} style={{border: 'none', margin: '0'}}>
            <div className={classes.legend_container}>
                <legend className={classes.legend} style={{fontSize: '2rem', fontWeight: 'bold'}}>Register</legend>
            </div>
            <div className={classes.form_input_container} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <label className={classes.form_label} htmlFor="name" style={{margin: '1rem'}}>Name</label>
                <input 
                    onChange = {this.onNameChange}
                    className={classes.form_input} 
                    type="text" 
                    name="name"  
                    id="name"
                    style={{padding: '0.5rem', borderRadius: '5px', border: '1px solid gray', marginBottom: '1rem'}}
                />
            </div>
            <div className={classes.form_input_container} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <label className={classes.form_label} htmlFor="email-address" style={{margin: '1rem'}}>Email</label>
                <input 
                    onChange={this.onEmailChange}
                    className={classes.form_input} 
                    type="email" 
                    name="email-address"  
                    id="email-address"
                    style={{padding: '0.5rem', borderRadius: '5px', border: '1px solid gray', marginBottom: '1rem'}}
                />
            </div>
            <div className={classes.form_input_container} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <label className={classes.form_label} htmlFor="password" style={{margin: '1rem'}}>Password</label>
                <input 
                    onChange={this.onPasswordChange}
                    className={classes.form_input} 
                    type="password" 
                    name="password"  
                    id="password"
                    style={{padding: '0.5rem', borderRadius: '5px', border: '1px solid gray', marginBottom: '1rem'}}
                />
            </div>
        </fieldset>
        <div className={classes.form_button_container} style={{marginTop: '1rem'}}>
            <input 
            onClick={this.onSubmitSignIn}
            className={classes.form_button} 
            type="submit" 
            value="Register"
            style={{padding: '0.5rem 1rem', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer'}}
            />
        </div>
    </div>
</div>


        );
    }
}


export default Register;