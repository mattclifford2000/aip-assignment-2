import React from "react";
import Leaderboard from "../shared/Leaderboard";
import "./../../styles/Home.css";

function Home(props) {
  return (
    <div class="center">
      Welcome to the Favour Centre!
      <Leaderboard />
    </div>
  );
}

export default Home;
