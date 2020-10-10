import React from "react";
import axios from "axios";



export default class Leaderboard extends React.Component {
  state = {
    requests: [],
  };


  componentDidMount() {
    axios.get("requests/mine").then((res) => {
      this.setState({ requests: res.data });
      console.log(res.data);
    });
  }


  render() {
    return (

      <div>
        <h5>Requests</h5>
        <div>
          <p>
            {this.state.requests.map((request) => (
              <p>{"Owner: " + request.ownerID + ". ID: " + request.requestID + "."} <br />
              {"Cupcakes: " + request.requestContent.cupcakes + ". Muffins: " + request.requestContent.muffins + "."}</p>
            ))}
          </p>
        </div>
      </div>
    );
  }
}
