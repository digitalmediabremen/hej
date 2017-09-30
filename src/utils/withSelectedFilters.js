import React, { Component } from 'react';
import DataStore from "./DataStore.js";

export default function withSelectedFilters(WrappedComponent) {
  
  return class extends Component {
    constructor(props) {
      super(props)
      
      this.handleChange = this.handleChange.bind(this)
      this.setSelectedFilters = this.setSelectedFilters.bind(this);
      this.dataStore = DataStore.getInstance();
      
      this.state = {
        filters: this.dataStore.getSelectedFilters()
      }
      
      
    }
    
    componentDidMount() {
      this.dataStore.addFilterChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      this.dataStore.removeFilterChangeListener(this.handleChange);
    }
    
    setSelectedFilters(filters) {
      this.dataStore.setSelectedFilters(filters);
    } 
    
    handleChange() {
      this.setState({
        filters: this.dataStore.getSelectedFilters()
      });
    }

    render() {
      return <WrappedComponent filters={this.state.filters} {...this.props} setSelectedFilters={this.setSelectedFilters} />;
    }
  }
  
}