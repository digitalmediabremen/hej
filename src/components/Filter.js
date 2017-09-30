import "babel-polyfill";

import React, { Component } from 'react';
import {isFilterInArray} from 'utils/Helpers.js';
import withData from "utils/withData.js";
import withSelectedFilters from "utils/withSelectedFilters.js";


class Filter extends Component {
  constructor(props) {
    super(props);
    
    this.clickHandler = this.clickHandler.bind(this);
  }
  
  componentDidMount() {
   
  }
  
  clickHandler(label, e) {
    e.preventDefault();

    if(isFilterInArray(this.props.filters, label)) this.props.setSelectedFilters([]);
    else this.props.setSelectedFilters([label])
    
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
      <ul className="filter-list">{labelList}</ul>
    );
  }
}



export default withSelectedFilters(withData(Filter,(DataStore, props) => DataStore.getFilters()));
