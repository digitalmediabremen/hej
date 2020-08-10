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
                    shuffle={false}
                    loop={true}
                />.</h1>
            <p className="small">
               Welcome to Digital Media at HfK + University Bremen. 🚀 <br /><br />
               You have made it! We have prepared this cybernetic place and a busy first week for you.
               This website will help you getting started. We will keep you posted all week long.. <br /><br />
                Also reach out if you missed the introduction week, we can help.
                <br />
                
                <StaticFilterToggle />
            </p>

        </div>
    )
}

export default Header;