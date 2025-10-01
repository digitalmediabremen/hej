import React from 'react';
import DataStore from "../utils/DataStore.js";
import FilterToggle from "./FilterToggle.js"
import withData from "../utils/withData.js";
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
                
               Welcome👋  Glad you found this cybernetic space! <br /><br />
               This website is for the Digital Media orientation week for students at Uni and HfK Bremen.
               Scroll down to find important information about the start of your studies and 
               the orientation week. 
             <br></br>
               If you have any questions: Just ask us in the box below! The student hej-digital-team will update the missing pieces of information.
               <br /><br />
               These groups will connect you with other students and guide you through the orientation week: 
                <ul type="square">
                    <li> <a target="blank" href="https://signal.group/#CjQKIBLukXCpirpds8bgpqoAVg6IWQudGyQtsCqcWxdv89zhEhCeXapsYlSCPDogdHZLcMdC" >Signal group for all Bachelor first semester students</a>  </li>
                    <li> <a target="blank" href="https://signal.group/#CjQKIO6ng2RFhNTIfRcEardwfefD6w0jegUzXRidAEnMLOHgEhDrsAJ0TYv7LQ12bWtvtkH7" >Signal group for all Master first semester students </a>  </li>
                </ul>
            <br></br>
               The next orientation week of the entire Digital Media program will take place in October 2025
             <br></br>
             <strong>⚠️ We're currently working on making this page secure.</strong><br />
               In the meantime, you can use this link: 
               <a href="https://digitalmediabremen.github.io/hej/" target="_blank">
                 https://digitalmediabremen.github.io/hej/
               </a> 
               for a secure connection.
                
                <StaticFilterToggle />
            </p>
        </div>
    )
}

export default Header;
