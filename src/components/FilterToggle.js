import React, { Component } from 'react';
import withSelectedFilters from "../utils/withSelectedFilters.js";
import { withRouter, Link } from 'react-router-dom';


class FilterToggle extends Component {
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
        if (!this.props.data) return <p>...</p>
        let f = this.props.getSelectedStaticFilter();
        let fw = this.props.data.filter((elem) => elem.name != f.name);
        let nextF = fw.length > 0 ? fw[0] : f;

        let label =
            <span className="filter-toggle">
                <span className="filter">
                    <a href="#filter" onClick={(evt) => this.clickHandler(nextF, evt)}>current track: {f.name}</a>
                </span>
            </span>


        return (
            label
        );
    }
}



export default withRouter(withSelectedFilters(FilterToggle));
