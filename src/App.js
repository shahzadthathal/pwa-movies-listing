import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Register from './components/Register/Register';
import Header from './components/Header/Header';
import LatestMovies from './components/LatestMovies/LatestMovies';

function App() {
  return (
    <Router>
    

          <Header />

            <Switch>
              <Route path="/" exact={true}>
                <LatestMovies />
              </Route>
              <Route path="/signup" exact={true}>
                <Register />
              </Route>
              <Route path="/login" exact={true}>
                <Register />
              </Route>
              
            </Switch>
          
    
    </Router>
  );
}

export default App;
