import React from 'react';
import DataStore from "../utils/DataStore.js";
import FilterToggle from "./FilterToggle.js";
import withData from "../utils/withData.js";
import ReactTyped from 'react-typed';

const Header = (props) => {
  const StaticFilterToggle = withData(
    FilterToggle,
    (dataStore, props) => dataStore.getStaticFilters()
  );

  return (
    <div className="intro">
      <h1 className="">
        Hej,{" "}
        <ReactTyped
          strings={DataStore.studentNames}
          typeSpeed={80}
          shuffle={true}
          loop={true}
        />
        .
      </h1>

      <p className="small">
        Welcome👋 Glad you found this cybernetic space! <br /><br />
        This website is for the Digital Media orientation week for students at
        Uni and HfK Bremen. Scroll down to find important information about the
        start of your studies and the orientation week.
        <br /><br />
        If you have any questions: Just ask us in the box below! The student
        hej-digital-team will update the missing pieces of information.
        <br /><br />
          
        These groups will connect you with other students and guide you through
        the orientation week:
        <ul type="square">
          <li>
            <a
              target="_blank"
              href="https://signal.group/#CjQKIIUsvAzyRR0_sxvmGcs8v65IrURQywwPpgC4_LIfNnUHEhAhC0fJ462ZpA_Fy3JaJ0P5"
            >
              Signal group for all Bachelor first semester students (WS 26/27)
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://signal.group/#CjQKINVcTLrIvWCjusXyFdNXYV68TMDqq1dYfCNF-uJf7IhFEhAH6PHSGaqwsHsfYwjERkbs"
            >
              Signal group for all Master first semester students (WS 26/27)
            </a>
          </li>
        </ul>
        
        <br />
        The next orientation week of the entire Digital Media program will take
        place in October 2026.
        <br /><br />
       
        <StaticFilterToggle />
      </p>
    </div>
  );
};

export default Header;
