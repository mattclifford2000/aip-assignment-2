import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "./components/shared/HeaderComponent";
import FrontPageComponent from "./components/main/FrontPageComponent";



function App() {
  return (
    <div className="App">
      <FrontPageComponent />
  
    </div>
  );
}

export default App;
