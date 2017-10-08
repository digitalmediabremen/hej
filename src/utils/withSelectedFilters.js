import React, { Component } from 'react';
import DataStore from "./DataStore.js";
import {isFilterInArray} from 'utils/Helpers.js';


export default function withSelectedFilters(WrappedComponent) {
  
  return class extends Component {
    constructor(props) {
      super(props)
      
      this.handleChange = this.handleChange.bind(this)
      this.setSelectedFilters = this.setSelectedFilters.bind(this);
      this.dataStore = DataStore.getInstance();
      
      console.log(props)
      
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
    
    setSelectedFilters(label) {
      if(isFilterInArray(this.dataStore.getSelectedFilters(), label)) { 
        this.dataStore.removeSelectedFilters([label]);
      }
      else this.dataStore.setSelectedFilters([label])
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