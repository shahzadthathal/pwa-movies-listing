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
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import { UncontrolledCarousel } from 'reactstrap';
import axios from 'axios';
import './MovieDetail.css';
import imageDummy from '../../images/318x180.svg';
import thumbUpLike from '../../images/favNo.svg';
import favNo from '../../images/favNo.svg';
import favYes from '../../images/favYes.svg';
import { Link } from "react-router-dom";
import {THEMOVIEDB_API_URL, THEMOVIEDB_API_KEY} from '../../constants/constants';
import {slugify} from "../../utils/Helpers"
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/constants';


class MovieDetail extends Component{

    //this.history = useHistory();

    //Adding class constructor that assigns the initial state values
    constructor(props){
        super(props);
        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)
        this.goToIndex = this.goToIndex.bind(this)
        this.goToDetailPage = this.goToDetailPage.bind(this)
        this.addToFav = this.addToFav.bind(this)
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
            recommendationsArr: [],
            totalItemsCount: 0,
            activeIndex: 0,
            animating: false,
            slides:[],

            successMessage: null,
            errorMessage: null,

            isFavoriteItem: false,

        };
    }

    next(){
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === this.state.totalItemsCount - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex:nextIndex})
    }

    previous(){
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.totalItemsCount - 1 : this.state.activeIndex - 1;
        this.setState({activeIndex:nextIndex})
    }

    goToIndex(newIndex){
        if (this.state.animating) return;
        this.setState({activeIndex:newIndex})
    }

    goToDetailPage(id,title){
        let goto =  '/movie-detail/'+slugify(title)+'/'+id;
        window.location.href = goto
    }

    componentDidMount(){
        const {params} =this.props.match;
        this.getDetail(params.id);
        this.checkFavoriteItem(params.id)
    }
    addToFav(movieId){
        this.setState({'successMessage':null});
        this.setState({'errorMessage':null});
        if(localStorage.getItem(ACCESS_TOKEN_NAME)){
            axios.post(API_BASE_URL+'/api/user/add-favorite',{id:movieId}, { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
            .then((response) => {
                if(response.status === 200){
                    this.setState({successMessage : response.data.msg})
                    this.setState({isFavoriteItem:true});
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
    checkFavoriteItem(recId){
        if(localStorage.getItem(ACCESS_TOKEN_NAME)){
            axios.post(API_BASE_URL+'/api/user/check-favorite?time='+new Date().getTime(), {id:recId}, { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME), 'Cache-Control':'no-cache' }})
            .then((response) => {
              if(response.status === 200){
                    this.setState({isFavoriteItem:response.data.isFavorite});
                }
            })
            .catch((error) => {
                //this.setState({errorMessage : "Please try again later."})
                console.log(error)
            });

        }
    }
    
    getDetail(recId){
        axios.get(THEMOVIEDB_API_URL+'/3/movie/'+recId+'?api_key='+THEMOVIEDB_API_KEY+'&language=en-US&video=true')
        .then(response =>{
            let data = response.data;
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
            if(data !='undefined'){
                this.setState({ video: data.key });
                this.setState({ site: data.site });
                this.setState({ type: data.type });
                if(data.site == 'YouTube'){
                    this.setState({ video: 'https://www.youtube.com/embed/'+data.key });
                }
            }
            
            //Get Recommendations
            this.getRecommendations(recId);

        }).catch(err=>{
            console.log("Fetching data in LatestMovies.js err")
            console.log(err)
        })

    }

    getRecommendations(movieId){
        axios.get(THEMOVIEDB_API_URL+'/3/movie/'+movieId+'/recommendations?api_key='+THEMOVIEDB_API_KEY+'&language=en-US&page=1')
        .then(response =>{
            this.setState({totalItemsCount:response.data.total_results})
            let modifiedRes =  response.data.results.map((item,index)=>{
                response.data.results[index].image = imageDummy
                if(item.poster_path){
                    response.data.results[index].image = 'https://image.tmdb.org/t/p/w200/'+item.poster_path;
                }
                return item;
            });
            this.setState({recommendationsArr : modifiedRes})
            let i = 1;
            let generateSlides = modifiedRes.map((item,index)=>{
                response.data.results[index].image = imageDummy
                if(item.poster_path){
                    response.data.results[index].image = 'https://image.tmdb.org/t/p/w200/'+item.poster_path;
                }

                return (
                  <CarouselItem
                    className="custom-tag"
                    tag="div"
                    onExiting={() => this.setState({animating : true}) }
                    onExited={() => this.setState({animating : false}) }
                    key={item.id}
                  >
                    <img className="w-100" src={item.image} alt={item.title} />
                    
                    <CarouselCaption className="text-white" captionText={''} captionHeader={item.title} />
                    
                    <div className="carousel-caption-btn">
                        <button onClick={() => this.goToDetailPage(item.id, item.title)} className="btn btn-secondary btn-md  mx-auto d-block mt-4">Detail</button>
                    </div>

                  </CarouselItem>
                );

                i++;
            });
            

            this.setState({slides : generateSlides});
            //set slides

        }).catch(err=>{
            console.log("Fetching data in LatestMovies.js err")
            console.log(err)
        })
    }

    //The render method contains the JSX code which will be compiled to HTML.
    render(){
        var videoIframe = 'No video found.';
        if(this.state.video!=''){
            videoIframe = <iframe width="100%" height="315" src={this.state.video} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        }
        let favItem = <img onClick={() => this.addToFav(this.state.id)} className="ml-1" src={favNo} width="20" height="20"/>
        if(this.state.isFavoriteItem){
            favItem = <img className="ml-1" src={favYes} width="20" height="20"/>
        }else{

        }

        return(

            <Container>
                
                <Breadcrumb className="mt-2" tag="nav" listTag="div">
                    <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
                    <BreadcrumbItem active>Movie Detail</BreadcrumbItem>
                </Breadcrumb>

                <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
                    {this.state.successMessage}
                </div>
                 <div className="alert alert-danger mt-2" style={{display: this.state.errorMessage ? 'block' : 'none' }} role="alert">
                    {this.state.errorMessage}
                </div>

                    
                <h1 className="mt-2">
                    {this.state.title}
                    {favItem}
                </h1>
                <small>Release date: {this.state.release_date}</small>
                
                <ul class="list-group">
                  <li class="list-group-item">
                    Production companies:
                    {this.state.production_companies.map((item)=>(
                        <span class="badge badge-secondary float-right ml-1">{item.name}</span>
                    ))}

                  </li>
                  <li class="list-group-item">
                     Production countries:
                    {this.state.production_countries.map((item)=>(
                        <span class="badge badge-info float-right ml-1">{item.name}</span>
                    ))}
                  </li>
                  <li class="list-group-item ">
                    Spoken languages:
                    {this.state.spoken_languages.map((item)=>(
                        <span class="badge badge-success float-right ml-1">{item.name}</span>
                    ))}
                  </li>
                  <li class="list-group-item ">
                    Total Vote:
                    <span class="badge badge-dark float-right">{this.state.vote_count}</span>
                  </li>
                 
                    <li class="list-group-item ">
                        {videoIframe}
                    </li>

                    <li class="list-group-item ">
                         {this.state.description}
                    </li>

                     <li class="list-group-item">

                     <CardImg className="mt-2" top width="100%" src={this.state.image} alt={this.state.title} />

                     </li>

                </ul>

                
                <div className="col-12"> 
                <h1 className="mt-4">Recommendations</h1>

                    <style>
                    {
                      `.custom-tag {
                          max-width: 100%;
                          background: black;
                        }`
                    }
                    </style>
                    <Carousel
                      ride={false}
                      indicators={false}
                      activeIndex={this.state.activeIndex}
                      next={this.next}
                      previous={this.previous}
                    >
                      <CarouselIndicators items={this.state.recommendationsArr} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                      {this.state.slides}
                      <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                      <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                    </Carousel>
                </div>

               {/* <UncontrolledCarousel items={this.state.slides } /> */}

                <div className="mb-5 mt-5">&nbsp;</div>
                
            </Container>
        )
    }
}

export default MovieDetail;