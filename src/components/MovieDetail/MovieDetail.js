import React, {Component} from 'react';
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
import axios from 'axios';
import './MovieDetail.css';
import imageDummy from '../../images/318x180.svg';
import {THEMOVIEDB_API_URL, THEMOVIEDB_API_KEY} from '../../constants/constants';


class MovieDetail extends Component{

    //Adding class constructor that assigns the initial state values
    constructor(){
        super();
        this.state = {
            id:'',
            title: '',
            image: '',
            description:'',
        };
    }
    componentDidMount(){
        const {params} =this.props.match;
        this.getDetail(params.id)
    }
    
    getDetail(recId){
        axios.get(THEMOVIEDB_API_URL+'/3/movie/'+recId+'?api_key='+THEMOVIEDB_API_KEY+'&language=en-US')
        .then(response =>{
            this.setState({ id: response.data.id });
            this.setState({ title: response.data.title });
            this.setState({ description: response.data.overview });
            this.setState({ image: imageDummy });
            if(response.data.poster_path){
                this.setState({ image: 'https://image.tmdb.org/t/p/original/'+response.data.poster_path });
            }
        });
    }

    //The render method contains the JSX code which will be compiled to HTML.
    render(){
        return(
            <Container>
                
                    <Breadcrumb className="mt-2" tag="nav" listTag="div">
                        <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
                        <BreadcrumbItem active>Movie Detail</BreadcrumbItem>
                    </Breadcrumb>
                    
                    <h1 className="mt-2">Movie Detail</h1>

                    <Card className="ml-1">
                        <CardImg top width="100%" src={this.state.image} alt={this.state.title} />
                        <CardBody>
                        <CardTitle>{this.state.title}</CardTitle>
                        <CardText>{this.state.description}</CardText>
                        </CardBody>
                    </Card>
                
            </Container>
        )
    }
}

export default MovieDetail;