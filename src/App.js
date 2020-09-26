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


function App() {
  return (
    <Router>
      <div className="App">

          <Header />

          <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <Register />
            </Route>
          </Switch>
       </div>
       
          
      </div>
    </Router>
  );
}

export default App;
