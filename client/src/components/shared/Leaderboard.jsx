
import * as React from "react";
import axios from "axios";
import "./../../styles/Leaderboard.css";
import { Button, Form, Card, Table } from "react-bootstrap";

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
    axios.get("lists/leaderboard").then((res) => {
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

  renderTableData() {
    var i = 0;
    return this.state.users.map((user, index) => {
      const { name, score } = user
      i++
      return (
        <tr key={name}>
          <td> {i} </td>
          <td>{name}</td>
          <td> - </td>
          <td> - </td>
          <td>{score}</td>
        </tr>
      )
    })
  }
  render() {
    return (
      <div>
        <h1> Leaderboard </h1>
        <table>
          <tr>
            <th> Rank </th>
            <th id="userHeader"> User </th>
            <th> Owing  </th>
            <th> Owed  </th>
            <th> Points </th>
          </tr>
          <tbody>
            {this.renderTableData()}
          </tbody>
        </table>



      </div>
    );
  }
}
