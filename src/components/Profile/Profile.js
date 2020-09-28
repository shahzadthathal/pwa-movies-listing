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

             
              setState({'full_name' : response.data.full_name})
              setState({'email' : response.data.email})

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
       
            <h1 className="mt-2">Welcome again {state.full_name}</h1>
            <p>Your email is: {state.email} </p>

         </Container>
    )
}

export default withRouter(Profile);