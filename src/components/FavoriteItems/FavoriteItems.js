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
import './FavoriteItems.css';
import imageDummy from '../../images/318x180.svg';
import thumbUpLike from '../../images/favNo.svg';
import favNo from '../../images/favNo.svg';
import favYes from '../../images/favYes.svg';
import { Link , Redirect, withRouter} from "react-router-dom";
import {THEMOVIEDB_API_URL, THEMOVIEDB_API_KEY} from '../../constants/constants';
import {slugify} from "../../utils/Helpers"
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/constants';

class FavoriteItems extends Component{

	constructor(props){
        super(props);
        this.state = {
        	full_name: '',
        	email : "",
        	favoriteItemsArr:[],
        	recordsArr:[],
        	successMessage: null,
            errorMessage: null,
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
                'favoriteItemsArr': response.data.favoriteItemsArr
              })

    		  this.state.favoriteItemsArr.map((id) =>{
    		  		this.getDetail(id);
    		  })
    		}

    	})
    	.catch((err) =>{
    		console.log(err)

    		localStorage.removeItem(ACCESS_TOKEN_NAME)
          	this.redirectToLogin()

    	})
    }

     getDetail(recId){
        axios.get(THEMOVIEDB_API_URL+'/3/movie/'+recId+'?api_key='+THEMOVIEDB_API_KEY+'&language=en-US&video=true')
        .then(response =>{
            let data = response.data;
            if(data){
            	let image = imageDummy;
            	if(data.poster_path){
	                image =  'https://image.tmdb.org/t/p/original/'+data.poster_path;
	            }
	            let item = {
	            	id:data.id,
		            image: image,
		            title: data.title,
		            vote_count: data.vote_count,
		            overview: data.overview,
		            release_date: data.release_date,
		            original_language: data.original_language,
		        }
		        let modifiedRes = this.state.recordsArr;
		        modifiedRes.push(item)
            	this.setState({recordsArr : modifiedRes})
            }
        })
    }

    removeFav(movieId){

    	this.setState({'successMessage':null});
        this.setState({'errorMessage':null});
        if(localStorage.getItem(ACCESS_TOKEN_NAME)){
            axios.post(API_BASE_URL+'/api/user/remove-favorite',{id:movieId}, { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
            .then((response) => {
                if(response.status === 200){
                    this.setState({successMessage : response.data.msg})
                

                    let favoriteItemsArr = this.state.favoriteItemsArr;
                    delete favoriteItemsArr[movieId];
                    this.setState({
		                'favoriteItemsArr': favoriteItemsArr
		            })

		            let recordsArr = this.state.recordsArr.filter(item => item.id !=movieId);
                    this.setState({
		                'recordsArr': recordsArr
		            })


                }else if(response.status === 403){
                    this.setState({errorMessage : response.data.msg})

                }else{
                    this.setState({errorMessage : "Please try again later."})
                }
            })
            .catch((error) => {
                this.setState({errorMessage : "Please try again later."})
                console.log(error)
            });

        }else{
            this.setState({
                errorMessage:"Please login to add this item into your favorite list."
            })
        }
    }


    redirectToLogin() {
        this.props.history.push('/login');
    }

    isNotLogedIn() {
        if(!localStorage.getItem(ACCESS_TOKEN_NAME))
            return <Redirect to='/login' />
    }

    render(){

    	return(

    		<Container>

    		{this.isNotLogedIn()}
               
            <Breadcrumb className="mt-2" tag="nav" listTag="div">
                <BreadcrumbItem> <a href="/">Home</a> </BreadcrumbItem>
                <BreadcrumbItem><a href="/profile">Profile</a></BreadcrumbItem>
                <BreadcrumbItem active>Favorite Movies</BreadcrumbItem>
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
                        <li class="nav-item">
                          <Link to={`/profile`} className="nav-link">
                        <i class="fa fa-user"></i>
                        Account Settings </Link>
                        </li>
                        <li class="active nav-item">
                          	<Link to={`/profile`} className="nav-link">
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

	                   <h1 className="mt-2">Favorite Movies</h1>

	                   <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
	                    {this.state.successMessage}
		                </div>
		                 <div className="alert alert-danger mt-2" style={{display: this.state.errorMessage ? 'block' : 'none' }} role="alert">
		                    {this.state.errorMessage}
		                </div>


	                    <div className="row">
	                    	{this.state.recordsArr.map((item,index) =>(
			                    <Col sm="4">
			                        <Card className="mt-4">
			                            <CardImg top width="" src={item.image} alt={item.title} />
			                            <CardBody>
			                                <CardTitle>{item.title}  <img  onClick={() => this.removeFav(item.id)} className="ml-1" src={favYes} width="20" height="20"/>
			                                <span class="badge badge-info float-right ml-1"> <img width="18" height="13" src={thumbUpLike} /> {item.vote_count} </span>
			                                </CardTitle>
			                                <CardText>{item.overview.substring(0,100)}</CardText>
			                                <ul class="list-group mt-1 mb-1">
			                                    <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
			                                     Release date: {item.release_date}
			                                    </li>
			                                    <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
			                                     Original language: {item.original_language.toUpperCase()}
			                                    </li>
			                                </ul>
			                                <Link to={`/movie-detail/${slugify(item.title)}/${item.id}`} className="btn btn-secondary btn-md  mx-auto d-block">Detail</Link>
			                            </CardBody>
			                        </Card>
			                    </Col>
			                ))}
			            </div>


                  </div>
                </div>
              </div>
            </div>

        </Container>

    	)
    }
}

export default FavoriteItems;