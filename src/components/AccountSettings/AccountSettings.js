import React, {Component} from 'react';
import { 
    Container,
    Col, 
    Breadcrumb, 
    BreadcrumbItem, 
    Card,
    CardImg, 
    CardTitle, 
    CardText, 
    CardBody
} from 'reactstrap';

import axios from 'axios';
import './AccountSettings.css';
import { Link , Redirect, withRouter} from "react-router-dom";
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/constants';

import ReactFilestack from 'filestack-react';


class AccountSettings extends Component{

	constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitClick = this.handleSubmitClick.bind(this)
        this.state = {
        	full_name: '',
        	email : "",
        	successMessage: null,
            errorMessage: null,
            currentPassword : "",
            password : "",
            confirmPassword: "",
    	}
    }

    componentWillMount(){
        this.getUser();
    }

    getUser(){
    	axios.get(API_BASE_URL+'/api/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
    	.then((response) => {
    		if(response.status !== 200){
              this.redirectToLogin()
            }else{
    		 this.setState({
                'full_name' : response.data.full_name,
                'email' : response.data.email,
              })
    		}
    	})
    	.catch((err) =>{
    		console.log(err)
    		localStorage.removeItem(ACCESS_TOKEN_NAME)
          	this.redirectToLogin()
    	})
    }

    
    redirectToLogin() {
        //this.props.history.push('/login');
        window.location.href = '/login'
    }

    isNotLogedIn() {
        if(!localStorage.getItem(ACCESS_TOKEN_NAME))
            return <Redirect to='/login' />
    }
    redirectToProfile(){
        //this.props.updateTitle('Profile')
        //this.props.history.push('/profile');
        window.location.href = '/profile'
    }

    handleChange(e){
        const {id , value} = e.target   
        this.setState({
            [id] : value
        });
    }
    handleSubmitClick(e){
        this.setState({'successMessage':null});
        this.setState({'errorMessage':null});
        e.preventDefault();
        if(this.state.currentPassword){
            if(this.state.password === this.state.confirmPassword) {
            this.sendDetailsToServer();
            } else {
                this.setState({'errorMessage':'Passwords do not match'});
            }
        }else if(this.state.full_name.length){
            this.sendDetailsToServer();
        }
        
    }
    sendDetailsToServer (){
        this.setState({'successMessage':null});
        this.setState({'errorMessage':null});
        if(localStorage.getItem(ACCESS_TOKEN_NAME)){

            if(this.state.full_name.length) {
                const payload={
                    "full_name":this.state.full_name,
                }
                if(this.state.currentPassword){
                    payload.currentPassword =  this.state.currentPassword;
                    payload.password = this.state.password;
                }
                
                axios.post(API_BASE_URL+'/api/user/account-settings', payload, { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
                    .then((response) =>{
                        console.log("resposne after updateing ")
                        console.log(response)
                        if(response.status === 200){
                            this.setState({
                                'successMessage' : 'Account settings updated redirecting to profile page...'
                            })
                            //localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                            this.redirectToProfile();
                        } else{
                            this.setState({'errorMessage':"Some error ocurred"});
                        }
                    })
                    .catch((error)=> {
                        console.log(error);
                        this.setState({'errorMessage':"Some error ocurred"});
                    });    
            } else {
                this.setState({'errorMessage':'Please enter valid data'});  
            }
        }
    }

    fileUploadedHandler(res){
        console.log('fileUploadedHandler res')
        console.log(res)
        if(res.filesUploaded.length>0){
            console.log("filenames")
            console.log(res.filesUploaded[0])
            console.log(res.filesUploaded[0].url)
        }
    }

    render(){

    	return(

    		<Container>

    		{this.isNotLogedIn()}
               
            <Breadcrumb className="mt-2" tag="nav" listTag="div">
                <BreadcrumbItem> <a href="/">Home</a> </BreadcrumbItem>
                <BreadcrumbItem><a href="/profile">Profile</a></BreadcrumbItem>
                <BreadcrumbItem active>Account Settings</BreadcrumbItem>
            </Breadcrumb>

            <div class="content">
              <div class="row profile">
                <div class="col-md-3">
                  <div class="profile-sidebar mb-2">
                    
                    <div class="profile-userpic">
                      <img src="https://media.rockstargames.com/chinatownwars/global/downloads/avatars/zhou_256x256.jpg" class="img-responsive" alt=""/>
                    </div>
                    <div class="d-flex justify-content-center profile-usertitle-job">
                   
                    <ReactFilestack
                        apikey={'A8YB5Y89OQQuEzIMMqQqXz'}
                        componentDisplayMode={{
                          type: 'button',
                          customText: 'Change picture',
                          customClass: 'some-custom-class'
                        }}
                        onSuccess={this.fileUploadedHandler}
                        />
                    </div>
                   
                    <div class="profile-usertitle">
                      <div class="profile-usertitle-name">
                        {this.state.full_name}
                      </div>
                      <div class="profile-usertitle-job">
                        Developer
                      </div>
                    </div>
                   
                    <div class="profile-userbuttons">
                      <button type="button" class="btn btn-success btn-sm">Follow</button>
                      <button type="button" class="btn btn-danger btn-sm">Message</button>
                    </div>
                   
                    <div class="profile-usermenu sidebar-sticky">
                      <ul class="nav flex-column">
                        <li class="nav-item">
                        	
                        	<Link to={`/profile`} className="nav-link">
                        		<i class="fa fa-home"></i>Overview
                        	</Link>
                         	
                        </li>
                        <li class="active nav-item">
                          <Link to={`/account-settings`} className="nav-link">
                        <i class="fa fa-user"></i>
                        Account Settings </Link>
                        </li>
                        <li class="nav-item">
                          	<Link to={`/favorite-movies`} className="nav-link">
	                        	<i class="fa fa-check"></i>
	                        Favourite Movies 
	                        </Link>
	                    </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#">
                        <i class="fa fa-flag"></i>
                        Watch Later Movies</a>
                        </li>
                      </ul>
                    </div>
                    
                  </div>
                </div>
                <div class="col-md-9">
                   <div class="profile-content mb-2">

	                   <h1 className="mt-2">Update Account Settings</h1>

	                   <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
	                    {this.state.successMessage}
		                </div>
		                 <div className="alert alert-danger mt-2" style={{display: this.state.errorMessage ? 'block' : 'none' }} role="alert">
		                    {this.state.errorMessage}
		                </div>

                        <form>
                            <div className="form-group text-left">
                                <label htmlFor="exampleInputEmail1">Full Name</label>
                                <input type="text" 
                                    className="form-control" 
                                    id="full_name" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter Full Name" 
                                    value={this.state.full_name}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="exampleInputPassword0">Current Password</label>
                                <input type="password" 
                                    className="form-control" 
                                    id="currentPassword" 
                                    placeholder="Current Password"
                                    value={this.state.currentPassword}
                                    onChange={this.handleChange} 
                                />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleChange} 
                                />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="exampleInputPassword2">Confirm Password</label>
                                <input type="password" 
                                    className="form-control" 
                                    id="confirmPassword" 
                                    placeholder="Confirm Password"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange} 
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-secondary"
                                style={{"pointer-events": "all"}}
                                onClick={this.handleSubmitClick}
                            >
                                Update
                            </button>
                        </form>


                  </div>
                </div>
              </div>
            </div>

        </Container>

    	)
    }
}

export default AccountSettings;