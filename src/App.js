import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import LatestMovies from './components/LatestMovies/LatestMovies';
import PopularMovies from './components/PopularMovies/PopularMovies';
import TopRatedMovies from './components/TopRatedMovies/TopRatedMovies';
import UpcomingMovies from './components/UpcomingMovies/UpcomingMovies';

import MovieDetail from './components/MovieDetail/MovieDetail';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import AlertComponent from './components/AlertComponent/AlertComponent';  


function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
    

          <Header />

            <Switch>
              <Route path="/" exact={true}>
                <Home />
              </Route>
               <Route path="/home" exact={true}>
                <Home />
              </Route>

              <Route path="/latest-movies" exact={true}>
                <LatestMovies />
              </Route>
              <Route path="/popular-movies" exact={true}>
                <PopularMovies />
              </Route>
              <Route path="/top-rated-movies" exact={true}>
                <TopRatedMovies />
              </Route>
               <Route path="/upcoming-movies" exact={true}>
                <UpcomingMovies />
              </Route>

              <Route path="/movie-detail/:id" component={MovieDetail} />

              <Route path="/signup">
                <Register showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/login">
                <Login showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              
            </Switch>

            <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
          
    
    </Router>
  );
}

export default App;
