import "babel-polyfill";
import React, { Component } from 'react';
import StaticFilter from "components/StaticFilter.js"


export default class InputView extends Component {
  
  render() {
    return (
      <div className="preselect">
        <div className="wrapper">
          <StaticFilter />
        </div>
      </div>
    )
  } 
}