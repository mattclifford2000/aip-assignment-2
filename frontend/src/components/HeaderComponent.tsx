import React, { Component, useState } from "react";


class HeaderComponent extends Component{
    render() {
        return (
            <div>
              <ul className="header">
                <li><a href="/">Home</a></li>
                <li><a href="/stuff">Stuff</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
        );
      }
}

export default HeaderComponent;