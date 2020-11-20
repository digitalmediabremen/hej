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
               Welcome to the Digital Media hybrid experience at HfK + University Bremen. 🚀 <br /><br />
               Glad you found this cybernetic place, perhaps you might already know it, but things have changed: 
               You can now switch between the familiar first semester info and our brand-new digital media oriented Corona info page. 
               So this is the place where everything is collected regarding pandemic digital media: 
               how do I get into the studios?  Excuse me: Workshops? And still: What the fuck does hybrid mean? 
               Have a look below for the links and information you need. 
               Otherwise just ask!  <br /><br />
                <br />
                
                <StaticFilterToggle />
            </p>

        </div>
    )
}

export default Header;