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
import './Home.css';
import axios from 'axios';
import imageDummy from '../../images/318x180.svg';
import thumbUpLike from '../../images/like.svg';
import { Link } from "react-router-dom";
import {THEMOVIEDB_API_URL, THEMOVIEDB_API_KEY} from '../../constants/constants';
import {slugify} from "../../utils/Helpers"

class Home extends Component{
    //Adding class constructor that assigns the initial state values
    constructor(){
        super();
        this.state = {
            id:'',
            title: '',
            image: '',
            description:'',
            moviesArrPopular:[],
            moviesArrTopRated:[],
            moviesArrUpcoming:[],
        };
    }

    //This is called when an instance of this component is being created and inserted into the DOM.
    componentWillMount(){

            //Get popular movies
            axios.get(THEMOVIEDB_API_URL+'/3/discover/movie?api_key='+THEMOVIEDB_API_KEY+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
            .then(response =>{
                let modifiedRes =  response.data.results.map((item,index)=>{
                    response.data.results[index].image = imageDummy
                    if(item.poster_path){
                        response.data.results[index].image = 'https://image.tmdb.org/t/p/w200/'+item.poster_path;
                    }
                    return item;
                });
                this.setState({moviesArrPopular : modifiedRes})
            })
            .catch(err=>{
                console.log("Fetching data in LatestMovies.js err")
                console.log(err)
            })

            //Get Top rated movies
            axios.get(THEMOVIEDB_API_URL+'/3/movie/top_rated?api_key='+THEMOVIEDB_API_KEY+'&language=en-US&page=1')
            .then(response =>{
                let modifiedRes =  response.data.results.map((item,index)=>{
                    response.data.results[index].image = imageDummy
                    if(item.poster_path){
                        response.data.results[index].image = 'https://image.tmdb.org/t/p/w200/'+item.poster_path;
                    }
                    return item;
                });
                this.setState({moviesArrTopRated : modifiedRes})
            })
            .catch(err=>{
                console.log("Fetching data in LatestMovies.js err")
                console.log(err)
            })

            //Get upcoming
            axios.get(THEMOVIEDB_API_URL+'/3/movie/upcoming?api_key='+THEMOVIEDB_API_KEY+'&language=en-US&page=1')
            .then(response =>{
                let modifiedRes =  response.data.results.map((item,index)=>{
                    response.data.results[index].image = imageDummy
                    if(item.poster_path){
                        response.data.results[index].image = 'https://image.tmdb.org/t/p/w200/'+item.poster_path;
                    }
                    return item;
                });
                this.setState({moviesArrUpcoming : modifiedRes})
            })
            .catch(err=>{
                console.log("Fetching data in LatestMovies.js err")
                console.log(err)
            })

           
    }

    //The render method contains the JSX code which will be compiled to HTML.
    render(){
        return(
            <Container>
               
                    <Breadcrumb className="mt-2" tag="nav" listTag="div">
                        <BreadcrumbItem active>Home</BreadcrumbItem>
                    </Breadcrumb>
               
                    <h1 className="mt-2">Popular Movies</h1>
        
                    <div className="row pb-2">
                        {this.state.moviesArrPopular.map((item,index) =>(
                            <Col sm="4">
                                <Card className="mt-4">
                                    <CardImg top width="" src={item.image} alt={item.title} />
                                    <CardBody>
                                        <CardTitle>
                                            {item.title}
                                            <span class="badge badge-info float-right ml-1"> <img width="18" height="13" src={thumbUpLike} /> {item.vote_count} </span>
                                        </CardTitle>
                                        <CardText>{item.overview.substring(0,99)}</CardText>
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


                    <h1 className="mt-2 border-top">Top Rated Movies</h1>
        
                    <div className="row pb-2">
                        {this.state.moviesArrTopRated.map((item,index) =>(
                            <Col sm="4">
                                <Card className="mt-4">
                                    <CardImg top width="" src={item.image} alt={item.title} />
                                    <CardBody>
                                        <CardTitle>
                                            {item.title}
                                            <span class="badge badge-info float-right ml-1"> <img width="18" height="13" src={thumbUpLike} /> {item.vote_count} </span>
                                        </CardTitle>
                                        <CardText>{item.overview.substring(0,99)}</CardText>
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

                    <h1 className="mt-2 border-top">Upcoming Movies</h1>
        
                    <div className="row mb-4 pb-2">
                        {this.state.moviesArrUpcoming.map((item,index) =>(
                            <Col sm="4">
                                <Card className="mt-4">
                                    <CardImg top width="" src={item.image} alt={item.title} />
                                    <CardBody>
                                        <CardTitle>
                                            {item.title}
                                            <span class="badge badge-info float-right ml-1"><img width="18" height="13" src={thumbUpLike} />{item.vote_count} </span>
                                        </CardTitle>
                                        <CardText>{item.overview.substring(0,99)}</CardText>
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


            </Container>
        )
    }
}

export default Home;