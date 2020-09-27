import React, {useState} from 'react';

import axios from 'axios';
import './Register.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/constants';
import { withRouter } from "react-router-dom";
import { Container, Breadcrumb, BreadcrumbItem} from 'reactstrap';

function Register(props) {
    const [state , setState] = useState({
        full_name : "",
        email : "",
        password : ""
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
            axios.post(API_BASE_URL+'/user/register', payload)
                .then(function (response) {
                    if(response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        redirectToHome();
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
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }

  return(

        <Container>
                
        <Breadcrumb className="mt-2" tag="nav" listTag="div">
            <BreadcrumbItem active>Home</BreadcrumbItem>
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
                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                        <input type="password" 
                            className="form-control" 
                            id="confirmPassword" 
                            placeholder="Confirm Password"
                            value={state.password}
                            onChange={handleChange} 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={handleSubmitClick}
                    >
                        Register
                    </button>
                </form>
            
        </Container>
    )
}

export default Register;