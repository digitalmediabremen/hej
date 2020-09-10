import React from 'react';
import DataStore from 'utils/DataStore';
import FilterToggle from "components/FilterToggle.js"
import withData from "utils/withData.js";
import ReactTyped from 'react-typed';

const Header = (props) => {
    const StaticFilterToggle = withData(FilterToggle, (dataStore, props) => dataStore.getStaticFilters());

    return (
        <div className="intro">
            <h1 className="">
                Hej, <ReactTyped
                    strings={DataStore.studentNames}
                    typeSpeed={80}
                    shuffle={true}
                    loop={true}
                />.</h1>
            <p className="small">
               Welcome to Digital Media at HfK + University Bremen. 🚀 <br /><br />
               You have made it! We have prepared this cybernetic place for you and are 
               currently organizing a busy first orientation which will take place from 26.10 - 30.10.
               These are crazy times so check back regulary - this website will help you getting started. 
               We will publish the program an all important information here step by step. <br /><br />
                <br />
                
                <StaticFilterToggle />
            </p>

        </div>
    )
}

export default Header;