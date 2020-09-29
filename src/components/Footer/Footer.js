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
import './Footer.css';
import axios from 'axios';
import imageDummy from '../../images/318x180.svg';
import { Link } from "react-router-dom";
import {THEMOVIEDB_API_URL, THEMOVIEDB_API_KEY} from '../../constants/constants';

class Footer extends Component{

    render() {
        return(

            <footer class="footer mt-2">
              <div class="container text-center">
                <span>&copy;{new Date().getFullYear()} All Rights Reserved.</span>
              </div>
            </footer>

        )
    }
    

}

export default Footer;