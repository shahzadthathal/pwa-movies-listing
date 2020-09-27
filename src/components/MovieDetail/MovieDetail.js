import React, {Component} from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody} from 'reactstrap';
import axios from 'axios';
import './MovieDetail.css';
import imageDummy from '../../images/318x180.svg';
import { BrowserRouter, Link} from 'react-router-dom';


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
        console.log("componentDidMount")
        console.log(this.props);
       // console.log(this.props.match.params.id);
    }

     //This is called when an instance of this component is being created and inserted into the DOM.
     componentWillMount(){
        axios.get('https://api.themoviedb.org/3/movie/latest?api_key=717e71c059310d1e0f6e21f35f0a08a9&language=en-US')
            .then(response =>{
                //console.log("Fetching data in LatestMovies.js response")
                //console.log(response.data)
                this.setState({ id: response.data.id });
                this.setState({ title: response.data.title });
                this.setState({ description: response.data.overview });
                this.setState({ image: imageDummy });
                console.log("response.data.poster_path")
                console.log(response.data.poster_path)
                if(response.data.poster_path){
                    this.setState({ image: response.data.poster_path });
                }
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