import "babel-polyfill";
import React, { Component } from 'react';
import Filter from "components/Filter.js"


export default class InputView extends Component {
  
  render() {
    return (
      <div className="preselect">
        <div className="wrapper">
          <Filter showStaticFilters={true}></Filter>
        </div>
      </div>
    )
  } 
}