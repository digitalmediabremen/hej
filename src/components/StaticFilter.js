import React, { Component } from 'react';
import {isFilterInArray} from '../utils/Helpers.js';
import withData from "../utils/withData.js";
import withSelectedFilters from "../utils/withSelectedFilters.js";
import FilterList from "./FilterList.js"
import { withRouter, Link } from 'react-router-dom';


class StaticFilter extends Component {
  constructor(props) {
    super(props);
    
    this.selectFilterHandler = this.selectFilterHandler.bind(this);
  }
  
  
  selectFilterHandler(label) {
    //this.props.history.push("/"); 
  }
  
  render() {
    return <FilterList {...this.props} styleClass="inline pre-select" onFilterSelected={this.selectFilterHandler} />
  }
}





export default withRouter(withData(StaticFilter,(DataStore, props) => DataStore.getStaticFilters()));
