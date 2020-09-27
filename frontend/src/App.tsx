import React from "react";
import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from "./components/HeaderComponent";
import FrontPageComponent from './components/FrontPageComponent'

function App() {
  return (
    <div className="App">
      <FrontPageComponent />
    </div>
  );
}

export default App;
