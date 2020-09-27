import React, {Component} from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody} from 'reactstrap';
import './LatestMovies.css';
import axios from 'axios';
import imageDummy from '../../images/318x180.svg';
import { Link, Route } from "react-router-dom";
import MovieDetail from '../MovieDetail/MovieDetail';
import {THEMOVIEDB_API_URL, THEMOVIEDB_API_KEY} from '../../constants/constants';

class LatestMovies extends Component{
    //Adding class constructor that assigns the initial state values
    constructor(){
        super();
        this.state = {
            id:'',
            title: '',
            image: '',
            description:'',
            moviesArr:[],
        };
    }

    //This is called when an instance of this component is being created and inserted into the DOM.
    componentWillMount(){

        //Get latest movies
        axios.get(THEMOVIEDB_API_URL+'/3/movie/latest?api_key='+THEMOVIEDB_API_KEY+'&language=en-US')
            .then(response =>{
                this.setState({ id: response.data.id });
                this.setState({ title: response.data.title });
                this.setState({ description: response.data.overview });
                this.setState({ image: imageDummy });
                if(response.data.poster_path){
                    this.setState({ image: 'https://image.tmdb.org/t/p/original/'+response.data.poster_path });
                }
            })
            .catch(err=>{
                console.log("Fetching data in LatestMovies.js err")
                console.log(err)
            })

        //Get popular movies
        axios.get(THEMOVIEDB_API_URL+'/3/movie/popular?api_key='+THEMOVIEDB_API_KEY+'&language=en-US&page=1')
            .then(response =>{
                let modifiedRes =  response.data.results.map((item,index)=>{
                    response.data.results[index].image = imageDummy
                    if(item.poster_path){
                        response.data.results[index].image = 'https://image.tmdb.org/t/p/w200/'+item.poster_path;
                    }
                    return item;
                });
                this.setState({moviesArr : modifiedRes})
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
               
                    <h1 className="mt-2">Latest Movies</h1>
                    <div className="row">
                        <Col sm="6">
                            <Card className="">
                                <CardImg top width="" src={this.state.image} alt={this.state.title} />
                                <CardBody>
                                    <CardTitle>{this.state.title}</CardTitle>
                                    <CardText>{this.state.description.substring(0,100)}</CardText>
                                    <Link to={`/movie-detail/${this.state.id}`} className="btn btn-secondary btn-lg active">Detail</Link>
                                </CardBody>
                            </Card>
                        </Col>
                    </div>
               
                    <h2 className="mt-2">Popular Movies</h2>
                    <div className="row">
                        {this.state.moviesArr.map((item,index) =>(
                            <Col sm="6">
                                <Card className="mt-2">
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

export default LatestMovies;