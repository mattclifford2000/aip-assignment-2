import React from "react";
import Leaderboard from "../shared/Leaderboard";
import "./../../styles/Home.css";



function Home(props) {

  return (
    <div class="center">
      Welcome to the Favour Centre!
      {localStorage.getItem('loggedIn') == "true" &&
        <div>
          <p>Username:</p>
          <p>{localStorage.getItem('username')}</p>
        </div>
      }


      <Leaderboard />



    </div>
  );
}

export default Home;

