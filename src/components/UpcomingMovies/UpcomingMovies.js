import React, {Component} from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody} from 'reactstrap';
import './UpcomingMovies.css';
import axios from 'axios';
import imageDummy from '../../images/318x180.svg';
import { Link, Route } from "react-router-dom";
import MovieDetail from '../MovieDetail/MovieDetail';
import {THEMOVIEDB_API_URL, THEMOVIEDB_API_KEY} from '../../constants/constants';

class UpcomingMovies extends Component{
    //Adding class constructor that assigns the initial state values
    constructor(){
        super();
        this.state = {
            id:'',
            title: '',
            image: '',
            description:'',
            moviesArrUpcoming:[],
        };
    }

    //This is called when an instance of this component is being created and inserted into the DOM.
    componentWillMount(){

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
               
                    <h1 className="mt-2">Upcoming Movies</h1>
        
                    <div className="row border-bottom">
                        {this.state.moviesArrUpcoming.map((item,index) =>(
                            <Col sm="4">
                                <Card className="mt-4">
                                    <CardImg top width="" src={item.image} alt={item.title} />
                                    <CardBody>
                                        <CardTitle>{item.title}</CardTitle>
                                        <CardText>{item.overview.substring(0,100)}</CardText>
                                        <Link to={`/movie-detail/${item.id}`} className="btn btn-secondary btn-lg active">Detail</Link>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </div>

            </Container>
        )
    }
}

export default UpcomingMovies;