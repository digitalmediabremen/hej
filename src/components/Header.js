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
               Welcome to the joint Digital Media program at HfK + University Bremen. 🚀 <br /><br />
               Glad you found this cybernetic space. This website provides you with all the important information about the start of your studies, 
               the orientation week and what is going on in Bremen in the upcoming weeks. Below you'll find a list of all important information. 
               If you have any questions: Just ask us! The student hej team will update the missing pieces of information. By the way, 
               the hej-team will also guide you through the entire orientation phase and beyond...
               <br /><br />
                <br />
                
                <StaticFilterToggle />
            </p>

        </div>
    )
}

export default Header;