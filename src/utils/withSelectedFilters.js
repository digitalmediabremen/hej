import React, { Component } from 'react';
import DataStore from "./DataStore.js";
import {isFilterInArray} from 'utils/Helpers.js';


export default function withSelectedFilters(WrappedComponent) {
  
  return class extends Component {
    constructor(props) {
      super(props)
      
      this.handleChange = this.handleChange.bind(this)
      this.selectFilterHandler = this.selectFilterHandler.bind(this);
      this.isFilterSelected = this.isFilterSelected.bind(this);
      this.getSelectedStaticFilter = this.getSelectedStaticFilter.bind(this);

      
      this.dataStore = DataStore.getInstance();
            
      this.state = {
        filters: this.dataStore.getAllSelectedFilters()
      }
    }
    
    componentDidMount() {
      this.dataStore.addFilterChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      this.dataStore.removeFilterChangeListener(this.handleChange);
    }
    
    selectFilterHandler(label) {
      if(isFilterInArray(this.dataStore.getSelectedFilters(), label)) { 
        this.dataStore.removeSelectedFilters([label]);
      }
      else this.dataStore.setSelectedFilters([label])
      
      if(this.props.onFilterSelected) {
        this.props.onFilterSelected(label);
      }
    }
    
    getSelectedStaticFilter() {
      const sf = this.dataStore.getSelectedStaticFilters()
      if(sf.length === 0) return undefined;
      
      return sf[0]
    }
    
    isFilterSelected(filter) {
      return isFilterInArray(this.state.filters, filter);
    }
    
    handleChange() {
      this.setState({
        filters: this.dataStore.getAllSelectedFilters()
      });
    }

    render() {
      const props = Object.assign({}, this.props, {
        isFilterSelected: this.isFilterSelected,
        selectedStaticFilter: this.getSelectedStaticFilter(),
        onFilterSelected: this.selectFilterHandler,
        filters: this.state.filters
      });

      return <WrappedComponent {...props} />;
    }
  }
  
}