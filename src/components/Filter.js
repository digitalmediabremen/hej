import React, { Component } from 'react';
import {isFilterInArray} from '../utils/Helpers.js';
import withData from "../utils/withData.js";
import withSelectedFilters from "../utils/withSelectedFilters.js";
import FilterList from "./FilterList.js"
import { withRouter, Link } from 'react-router-dom';


class Filter extends Component {
  constructor(props) {
    super(props);
  }
  
  
  render() {
    return <FilterList {...this.props} />
  }
}





export default withRouter(withData(Filter,(dataStore, props) => dataStore.getFilters()));
