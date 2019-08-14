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
                It was nice to spend the first week with you. We will continue to update this website here for a few more weeks, as a good referance to get you going.
                Feel free to ask questions here or in person. <br /><br />Please share your feedback and comments to <a href="mailto:hej@digitalmedia-bremen.de">hej@digitalmedia-bremen.de</a>.
                Also reach out if you missed the introduction week, we can help.
                <br />
                <StaticFilterToggle />
            </p>

        </div>
    )
}

export default Header;