import React, { Component } from "react";
import LeaderboardComponent from './LeaderboardComponent';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';

import './Style.css';



class FrontPageComponent extends Component{



    render() {
        return (
            <div>
    <h1>Favour Centre</h1>
      <p>
        Welcome to the Favour Centre! Please login or register to make use of
        our fine services!
      </p>
      <div className = 'loginRegisterTogether'>
      <LoginComponent /> 
      
      <RegisterComponent />
      </div>
      <LeaderboardComponent />
      </div>
        );
    }
}

export default FrontPageComponent;