import React, { Component } from 'react';
import {githubApiRequest, isFilterInArray} from './Helpers.js';

let excludedLabels = ["public", "pinned"];

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.clickHandler = this.clickHandler.bind(this);
  }
  
  componentDidMount() {
    githubApiRequest("labels", "?sort=issues")
      .then(d => {
        //filter public tag
        d = d.filter(filter => !excludedLabels.includes(filter.name));
        this.setState({
          data: d
        });
      }, () => {
        this.props.requestFailedHandler();
      })
  }
  
  clickHandler(label, e) {
    e.preventDefault();
    
    if(isFilterInArray(this.props.filters, label)) this.props.onFilterChange([]);
    else this.props.onFilterChange([label])
    
  }
  
  getClassName(label) {
    return `filter${isFilterInArray(this.props.filters, label) ? " selected" : ""}`;
  }
  
  render() {
    if(!this.state.data) return <p>...</p>
    
        
    let labelList = this.state.data.map((l) =>
      <li key={l.id} className={this.getClassName(l)}><a href="#filter" onClick={ (evt)=> this.clickHandler(l, evt)}>{l.name}</a></li>
    );
    
    
    return (
      <ul className="filter-list">{labelList}</ul>
    );
  }
}



export default Filter;
