import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import "./../../styles/Leaderboard.css";
import { Button, Form, Card, Table } from "react-bootstrap";



function Leaderboard(props) {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axios.get("/lists/leaderboard").then((res) => {
      setUsers(res.data);
    })
  }, []);


  return (
    <div>
      <h1> Leaderboard</h1>
      <table>
        <tr>
          <th> Rank </th>
          <th id="userHeader"> User </th>
          <th> Owing  </th>
          <th> Owed  </th>
          <th> Points </th>
        </tr>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <td> {index + 1} </td>
              <td> {user.name} </td>
              <td> - </td>
              <td> - </td>
              <td> {user.score} </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Leaderboard;