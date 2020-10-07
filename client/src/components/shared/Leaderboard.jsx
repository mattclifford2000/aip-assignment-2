import * as React from "react";
import axios from "axios";
import "./../../styles/Leaderboard.css";

export default class Leaderboard extends React.Component {
  state = {
    users: [],
  };

  GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return -1;
      } else if (a[prop] < b[prop]) {
        return 1;
      }
      return 0;
    };
  }

  componentDidMount() {
    axios.get("/lists/leaderboard").then((res) => {
      var users = res.data;
      var data = [];
      if (users.length < 10) {
        users.sort(this.GetSortOrder("score"));
      } else {
        users.sort(this.GetSortOrder("score"));
        for (var i = 0; i < 10; i++) {
          data.push(users[i]);
        }
      }

      this.setState({ users: data });
    });
  }

  render() {
    return (
      <div>
        <h5>Leaderboard</h5>
        <div className="leaderboard">
          <ol>
            {this.state.users.map((user) => (
              <li>{user.name + ": " + user.score + " points."}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
