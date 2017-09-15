import React, { Component } from 'react';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.clickHandler = this.clickHandler.bind(this);
  }
  
  componentDidMount() {
    fetch(`${this.props.apiUrl}/labels`)
      .then(response => {
        if(!response.ok) {
          throw Error("Network request failed");
        }
      
        return response;
      })
      .then(d => d.json())
      .then(d => {
        this.setState({
          data: d
        });
      }, () => {
        this.props.requestFailedHandler();
      })
  }
  
  clickHandler(label, e) {
    e.preventDefault();
    
    if(this.state.selected === label.id) {
      this.setState({selected: undefined});
      this.props.filterSettings.clearFilter();
      
    } else {
      this.setState({
        selected: label.id
      });
      this.props.filterSettings.setFilter(label.name);

    }
    
    this.props.filterHandler(this.props.filterSettings)
  }
  
  isActive(id) {
    return (id === this.state.selected) ? "selected" : "";
  }
  
  render() {
    if(!this.state.data) return <p>...</p>
    
    let labelList = this.state.data.map((l) =>
      <li key={l.id}><a href="#filter" onClick={ (evt)=> this.clickHandler(l, evt)} className={this.isActive(l.id)}>{l.name}</a></li>
    );
    
    
    return (
      <ul>{labelList}</ul>
    );
  }
}


class FilterSettings {
  constructor() {
    this.filters = [];
    this.language = "de";
  }

  setFilter(filter) {
    if(0 <= this.filters.findIndex( (f) => f === filter)) {
      this.filters = [];
    } else {
      this.filters = [filter];
    }
  }
  
  clearFilter(filter) {
    this.filters = [];
  }
  
  encodeFilters() {
    return this.filters.join(',');
  }

}

export {Filter, FilterSettings};
