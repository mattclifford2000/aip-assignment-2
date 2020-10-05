import React, { Component} from "react";


class Header extends Component{
    render() {
        return (
            <div>
              <ul className="header">
                <li><a href="/">Home</a></li>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/requests">Requests</a></li>
              </ul>
            </div>
        );
      }
}

export default Header;