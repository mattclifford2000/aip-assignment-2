
import React from "react";
import Leaderboard from "../shared/Leaderboard";
import "./../../styles/Home.css";





function Home(props) {
  return (
    <div class="center">
      <p>Hello {localStorage.getItem('user')}!</p>
    </div>
  );
}

export default Home;
