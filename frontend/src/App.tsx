import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginComponent from "./components/LoginComponent";
import HeaderComponent from "./components/HeaderComponent";
import LeaderboardComponent from "./components/LeaderboardComponent";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <h1>Favour Centre</h1>
      <p>
        Welcome to the Favour Centre! Please login or register to make use of
        our fine services!
      </p>
      <p>Login</p>
      <p>Register</p>
      <LeaderboardComponent />
    </div>
  );
}

export default App;
