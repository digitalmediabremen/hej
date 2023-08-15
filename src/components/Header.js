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
               If you have any questions: Just ask us in the box below or on Discord/Whatsapp! The student hej-digital-team will update the missing pieces of information.
               <br /><br />
               These groups will connect you with other students and guide you through the orientation week: 
                <ul type="square">
                    <li> <a target="blank" href="https://discord.gg/59K3fVHeS" >Discord Server for all</a> </li>
                    <li> <a target="blank" href="https://chat.whatsapp.com/CxgI8UypLP5IPA9p04HXoS" >Whatsapp Group for all Bachelor first semester students</a>  </li>
                    <li> <a target="blank" href="https://chat.whatsapp.com/EVxvVxfE6np6XYtjhHDGkE" >Whatsapp Group for all Master first semester students </a>  </li>
                </ul>
            <br></br>
               The orientation week of the entire Digital Media program will take place from the 09.10 - 13.10.2023
                <br />
                
                <StaticFilterToggle />
            </p>

        </div>
    )
}

export default Header;
