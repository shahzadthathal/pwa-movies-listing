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
import './UpcomingMovies.css';
import axios from 'axios';
import imageDummy from '../../images/318x180.svg';
import thumbUpLike from '../../images/like.svg';
import { Link } from "react-router-dom";
import {THEMOVIEDB_API_URL, THEMOVIEDB_API_KEY} from '../../constants/constants';
import PaginationComponent from "react-reactstrap-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import {slugify} from "../../utils/Helpers"

class UpcomingMovies extends Component{
    //Adding class constructor that assigns the initial state values
    constructor(){
        super();
        this.state = {
            id:'',
            title: '',
            image: '',
            description:'',
            recordsArr:[],
            selectedPage: 1,
            pageSize:20,
            totalItemsCount:0,
            maxPaginationNumbers:5,
        };

        this.handleSelected = this.handleSelected.bind(this);
    }

    //This is called when an instance of this component is being created and inserted into the DOM.
    componentWillMount(){
        this.getRecords(1)
    }

    getRecords(pageNumber){

        //Get upcoming
        axios.get(THEMOVIEDB_API_URL+'/3/movie/upcoming?api_key='+THEMOVIEDB_API_KEY+'&language=en-US&page='+pageNumber)
        .then(response =>{
            this.setState({totalItemsCount:response.data.total_results})
            let modifiedRes =  response.data.results.map((item,index)=>{
                response.data.results[index].image = imageDummy
                if(item.poster_path){
                    response.data.results[index].image = 'https://image.tmdb.org/t/p/w200/'+item.poster_path;
                }
                return item;
            });
            this.setState({recordsArr : modifiedRes})
        })
        .catch(err=>{
            console.log("Fetching data in LatestMovies.js err")
            console.log(err)
        })
    }

    handleSelected(pageNumber) {
        this.setState({ selectedPage: pageNumber });
        this.getRecords(pageNumber)
    }

    //The render method contains the JSX code which will be compiled to HTML.
    render(){
        return(
            <Container>
               
                   <Breadcrumb className="mt-2" tag="nav" listTag="div">
                        <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
                        <BreadcrumbItem active>Upcoming</BreadcrumbItem>
                    </Breadcrumb>
               
                    <h1 className="mt-2">Upcoming Movies</h1>
                    
                    <div className="row ml-0">
                        <PaginationComponent
                          size="sm"
                          totalItems={this.state.totalItemsCount}
                          pageSize={this.state.pageSize}
                          onSelect={this.handleSelected}
                          maxPaginationNumbers={this.state.maxPaginationNumbers}
                          defaultActivePage={1}
                        />
                    </div>

                    <div className="row border-bottom">
                        {this.state.recordsArr.map((item,index) =>(
                            <Col sm="4">
                                <Card className="mt-4">
                                    <CardImg top width="" src={item.image} alt={item.title} />
                                    <CardBody>
                                        <CardTitle>{item.title}
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

            </Container>
        )
    }
}

export default UpcomingMovies;