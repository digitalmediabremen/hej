import React, { Component } from 'react';
import withSelectedFilters from "../utils/withSelectedFilters.js";
import { withRouter, Link } from 'react-router-dom';


class FilterList extends Component {
  constructor(props) {
    super(props);
    
    this.clickHandler = this.clickHandler.bind(this);
  }
  
  
  clickHandler(label, e) {
    e.preventDefault();
    
    this.props.onFilterSelected(label) 
  }
  
  getClassName(label) {
    return `filter${this.props.isFilterSelected(label) ? " selected" : ""}`;
  }
  
  render() {
    if(!this.props.data) return <span>...</span>

    let c = !!this.props.styleClass ? this.props.styleClass : "inline"
    
    let labelList = this.props.data.map((l) =>
      <li key={l.id} className={this.getClassName(l)}><a href="#filter" onClick={ (evt)=> this.clickHandler(l, evt)}>{l.name}</a></li>
    );
    
    return (
      <ul className={"filter-list " + c}>
        {labelList}
      </ul>
    );
  }
}



export default withRouter(withSelectedFilters(FilterList));
