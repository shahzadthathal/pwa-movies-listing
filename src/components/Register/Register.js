import React, {useState} from 'react';

import axios from 'axios';
import './Register.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/constants';
import { withRouter , Redirect} from "react-router-dom";
import { Container, Breadcrumb, BreadcrumbItem} from 'reactstrap';

function Register(props) {

    const [state , setState] = useState({
        full_name : "",
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
   
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            props.showError('Passwords do not match');
        }
    }

    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length) {
            props.showError(null);
            const payload={
                "full_name":state.full_name,
                "email":state.email,
                "password":state.password,
            }
            axios.post(API_BASE_URL+'/api/user/register', payload)
                .then(function (response) {
                    if(response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                        redirectToProfile();
                        props.showError(null)
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            props.showError('Please enter valid username and password')    
        }
        
    }
    const redirectToProfile = () => {
        props.updateTitle('Profile')
        props.history.push('/profile');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }

    function isLogedIn() {
        if(localStorage.getItem(ACCESS_TOKEN_NAME))
            return <Redirect to='/profile' />
    }

  return(

        <Container>

        {isLogedIn()}
                
        <Breadcrumb className="mt-2" tag="nav" listTag="div">
            <BreadcrumbItem> <a href="/">Home</a> </BreadcrumbItem>
            <BreadcrumbItem active>Register</BreadcrumbItem>
        </Breadcrumb>
            
                <form>
                    <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Full Name</label>
                    <input type="text" 
                        className="form-control" 
                        id="full_name" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter Full Name" 
                        value={state.full_name}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" 
                        value={state.email}
                        onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword2">Confirm Password</label>
                        <input type="password" 
                            className="form-control" 
                            id="confirmPassword" 
                            placeholder="Confirm Password"
                            value={state.confirmPassword}
                            onChange={handleChange} 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-secondary"
                        style={{"pointer-events": "all"}}
                        onClick={handleSubmitClick}
                    >
                        Register
                    </button>
                </form>

                <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
                </div>
                <div className="mt-2">
                    <span>Already have an account? </span>
                    <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
                </div>
            
        </Container>
    )
}

export default withRouter(Register);
