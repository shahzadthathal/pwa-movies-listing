import React,{ useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/constants';
import axios from 'axios';
import Moment from 'moment';
import {slugify} from "../../utils/Helpers"


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

import './Profile.css';



function Profile(props) {
  const [state , setState] = useState({
        full_name : "",
        email : "",
        image : "",
        bio : "",
        created_at: 0,
        from_now:0,
        selectedFile:null,
    })

    useEffect(() => {
        axios.get(API_BASE_URL+'/api/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
        .then(function (response) {
            if(response.status !== 200){
              redirectToLogin()
            }else{
             // console.log("Loged in user data")
              //console.log(response.data.full_name)


              //This method will rerender dom after updating value
              setState({
                'full_name' : response.data.full_name,
                'email' : response.data.email,
                'image' : response.data.image,
                'bio' : response.data.bio,
                'created_at': Moment(response.data.created_at).format('YYYY-MM-DD HH:mm'),
                'from_now': Moment(response.data.created_at).fromNow(),
              })

              //Don't do this, this method will not rerender dom
              //state.full_name = response.data.full_name ;
              //state.email = response.data.email ;
            }
        })
        .catch(function (error) {
          localStorage.removeItem(ACCESS_TOKEN_NAME)
          redirectToLogin()
        });
      })
    function redirectToLogin() {
        props.history.push('/login');
    }
    
    
    const fileSelect = event =>{
        document.getElementById("selectImage").click()
    }

    const fileSelectedHandler = event => {
      const formData = new FormData();
      formData.append('image',event.target.files[0])
     
       axios.post(API_BASE_URL+'/api/user/upload-image', formData, { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
       .then((response)=>{
         // console.log("File upload response")
          //console.log(response)
       })
       .catch((err)=>{
          console.log("File upload error")
          console.log(err)
       })
    }
    
    let imageUrl = <img src="https://media.rockstargames.com/chinatownwars/global/downloads/avatars/zhou_256x256.jpg" class="img-responsive" alt=""/>
    if(state.image){
      imageUrl = <img src={state.image} class="img-responsive" alt="" width="150" height="150"/>
    }

    return(
       
      <Container>
               
            <Breadcrumb className="mt-2" tag="nav" listTag="div">
                <BreadcrumbItem> <a href="/">Home</a> </BreadcrumbItem>
                <BreadcrumbItem active>Profile</BreadcrumbItem>
            </Breadcrumb>

            <div class="content">
              <div class="row profile">
                <div class="col-md-3">
                  <div class="profile-sidebar mb-2">
                    
                    <div class="profile-userpic">
                      {imageUrl}
                      
                    </div>
                   
                   {/* <div class="d-flex justify-content-center profile-usertitle-job">
                      <input 
                          id='selectImage'
                          style={{"display":"none"}} 
                          type="file" 
                          onChange={fileSelectedHandler}
                          />
                          <span style={{"pointer-events":"all","cursor":"pointer"}} onClick={fileSelect}>Edit Picture</span>

                    </div>
                  */}

                    <div class="profile-usertitle">
                      <div class="profile-usertitle-name">
                        {state.full_name}
                      </div>
                      <div class="profile-usertitle-job">
                        {state.bio}
                      </div>
                    </div>
                   
                    {/* <div class="profile-userbuttons">
                       <button type="button" class="btn btn-success btn-sm">Follow</button>
                       <button type="button" class="btn btn-danger btn-sm">Message</button>
                     </div>
                    */}
                   
                    <div class="profile-usermenu sidebar-sticky">
                      <ul class="nav flex-column">
                        <li class="active nav-item">
                          <Link to={`/profile`} className="nav-link active">
                        <i class="fa fa-home"></i>
                        Overview </Link>
                        </li>
                        <li class="nav-item">
                          <Link to={`/account-settings`} className="nav-link">
                        <i class="fa fa-user"></i>
                        Account Settings </Link>
                        </li>
                        <li class="nav-item">
                        
                        <Link to={`/favorite-movies`} className="nav-link">
                        <i class="fa fa-check"></i>
                        Favourite Movies</Link>
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
                    <h1>Welcom to your profile</h1>
                    
                    <p>Your email: {state.email} </p>
                    <p>Register at: {state.created_at} </p>

                  </div>
                </div>
              </div>
            </div>

        </Container>

    )
}

export default withRouter(Profile);