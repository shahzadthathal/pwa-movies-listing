import React,{ useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/constants';
import axios from 'axios'
import { 
    Container, 
    //Row, 
    Col, 
    Breadcrumb, 
    BreadcrumbItem, 
    Card, 
    //Button, 
    CardImg, 
    CardTitle, 
    CardText, 
    //CardGroup,
    //CardSubtitle, 
    CardBody
} from 'reactstrap';

import './Profile.css';


function Profile(props) {
  const [state , setState] = useState({
        full_name : "",
        email : "",
    })

    useEffect(() => {
        axios.get(API_BASE_URL+'/api/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
        .then(function (response) {
            if(response.status !== 200){
              redirectToLogin()
            }else{
              console.log("Loged in user data")
              console.log(response.data.full_name)


              //This method will rerender dom after updating value
              setState({
                'full_name' : response.data.full_name,
                'email' : response.data.email
              })

              //Don't do this, this method will not rerender dom
              //state.full_name = response.data.full_name ;
              //state.email = response.data.email ;
            }
        })
        .catch(function (error) {
          redirectToLogin()
        });
      })
    function redirectToLogin() {
        props.history.push('/login');
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
                      <img src="https://media.rockstargames.com/chinatownwars/global/downloads/avatars/zhou_256x256.jpg" class="img-responsive" alt=""/>
                    </div>
                   
                    <div class="profile-usertitle">
                      <div class="profile-usertitle-name">
                        {state.full_name}
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
                        <li class="active nav-item">
                          <a href="#" class="nav-link active">
                        <i class="fa fa-home"></i>
                        Overview </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="https://codepen.io/jasondavis/pen/jVRwaG?editors=1000">
                        <i class="fa fa-user"></i>
                        Account Settings </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#" target="_blank">
                        <i class="fa fa-check"></i>
                        Favourite Movies </a>
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
                    Some user related content goes here...
                    <h2>{state.email} </h2>
                  </div>
                </div>
              </div>
            </div>

        </Container>

    )
}

export default withRouter(Profile);