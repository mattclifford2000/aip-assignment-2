import React from 'react';
//Sample code for listing users from an API
//Can be modified to read users from backend
import axios from 'axios';

export default class ListUsers extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get('/users')
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        { this.state.persons.map(person => <li>{person.name}</li>)}
      </ul>
    )
  }
}