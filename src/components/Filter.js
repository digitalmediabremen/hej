import "babel-polyfill";

import React, { Component } from 'react';
import {isFilterInArray} from 'utils/Helpers.js';
import withData from "utils/withData.js";
import withSelectedFilters from "utils/withSelectedFilters.js";
import { withRouter, Link } from 'react-router-dom';


class Filter extends Component {
  constructor(props) {
    super(props);
    
    this.clickHandler = this.clickHandler.bind(this);
  }
  
  
  clickHandler(label, e) {
    e.preventDefault();
    
    this.props.setSelectedFilters(label)
    
    if(this.props.showStaticFilters) {
      this.props.history.push("/");
      console.log("sdsdd")
    }
    
  }
  
  getClassName(label) {
    return `filter${isFilterInArray(this.props.filters, label) ? " selected" : ""}`;
  }
  
  render() {
    if(!this.props.data) return <p>...</p>
    
    let labelList = this.props.data.map((l) =>
      <li key={l.id} className={this.getClassName(l)}><a href="#filter" onClick={ (evt)=> this.clickHandler(l, evt)}>{l.name}</a></li>
    );


    
    return (
      <ul className="filter-list">{labelList}
      <li>-</li>
      { !this.props.showStaticFilters &&
      <li className="filter"><Link to="/select">change Bachelor / Master</Link></li>}
      </ul>
    );
  }
}



export default withRouter(withSelectedFilters(withData(Filter,(DataStore, props) => props.showStaticFilters ? DataStore.getStaticFilters() : DataStore.getFilters())));
