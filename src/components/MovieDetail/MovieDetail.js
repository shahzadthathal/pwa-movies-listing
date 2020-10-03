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
            video: '',
            site: '',
            type: '',
            release_date: '',
            production_companies: [],
            production_countries: [],
            spoken_languages: [],
            vote_count: 0,

        };
    }
    componentDidMount(){
        const {params} =this.props.match;
        this.getDetail(params.id)
    }
    
    getDetail(recId){
        axios.get(THEMOVIEDB_API_URL+'/3/movie/'+recId+'?api_key='+THEMOVIEDB_API_KEY+'&language=en-US&video=true')
        .then(response =>{
            let data = response.data;
            console.log("MovieDetail")
            console.log(data)
            this.setState({ id: data.id });
            this.setState({ title: data.title });
            this.setState({ description: data.overview });
            this.setState({ image: imageDummy });
            if(data.poster_path){
                this.setState({ image: 'https://image.tmdb.org/t/p/original/'+data.poster_path });
            }
            this.setState({release_date: data.release_date})
            this.setState({production_companies: data.production_companies})
            this.setState({production_countries: data.production_countries})
            this.setState({spoken_languages: data.spoken_languages})
            this.setState({vote_count: data.vote_count})
        }).catch(err=>{
            console.log("Fetching data in LatestMovies.js err")
            console.log(err)
        })

        axios.get(THEMOVIEDB_API_URL+'/3/movie/'+recId+'/videos?api_key='+THEMOVIEDB_API_KEY+'&language=en-US')
        .then(response =>{
            let data = response.data.results[0];
            console.log("MovieDetail video data")
            console.log(response.data)
            if(data !='undefined'){
                this.setState({ video: data.key });
                this.setState({ site: data.site });
                this.setState({ type: data.type });
                if(data.site == 'YouTube'){
                    this.setState({ video: 'https://www.youtube.com/embed/'+data.key });
                }
            }
        }).catch(err=>{
            console.log("Fetching data in LatestMovies.js err")
            console.log(err)
        })

    }

    //The render method contains the JSX code which will be compiled to HTML.
    render(){
        const videoIframe = '';
        if(this.state.video){
            videoIframe = <li class="list-group-item d-flex justify-content-between align-items-center">
                                 <iframe width="100%" height="315" src={this.state.video} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                          </li>
        }
        return(
            <Container>
                
                    <Breadcrumb className="mt-2" tag="nav" listTag="div">
                        <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
                        <BreadcrumbItem active>Movie Detail</BreadcrumbItem>
                    </Breadcrumb>
                    
                    <h1 className="mt-2">{this.state.title}</h1>
                    <small>Release date: {this.state.release_date}</small>
                    
                    <ul class="list-group">
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        Production companies:
                        {this.state.production_companies.map((item)=>(
                            <span class="badge badge-secondary">{item.name}</span>
                        ))}

                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                         Production countries:
                        {this.state.production_countries.map((item)=>(
                            <span class="badge badge-info">{item.name}</span>
                        ))}
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        Spoken languages:
                        {this.state.spoken_languages.map((item)=>(
                            <span class="badge badge-success">{item.name}</span>
                        ))}
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        Total Vote:
                        <span class="badge badge-dark">{this.state.vote_count}</span>
                      </li>
                     
                        {videoIframe}

                        <li class="list-group-item d-flex justify-content-between align-items-center">
                             {this.state.description}
                        </li>

                         <li class="list-group-item d-flex justify-content-between align-items-center">

                         <CardImg className="mt-2" top width="100%" src={this.state.image} alt={this.state.title} />

                         </li>

                    </ul>
                
            </Container>
        )
    }
}

export default MovieDetail;