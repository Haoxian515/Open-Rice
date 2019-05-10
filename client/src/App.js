import React, { Component } from 'react';
import {connect} from "react-redux";

//COMPONENETS
import Venue from "./components/venue.js";
// import InputFormArea from './components/inputFormArea.js';
import VenueCard from "./components/VenueCard.js";
import NavBar from "./components/NavBar.js";
import HotTopic from "./components/HotTopic.js";
import Trends from "./components/Trends.js";

//ACTION CREATOR
import {
  getVenueDetails
} from "./actions/actionCreators";


// CSS
import "./components/App.css"
// const axios = require("axios");


class App extends Component {

  constructor(props){
    super(props)

    this.state = ({
      text: "FROM APP.JS",
      venue_ids: [],
      main_venue_ids:[]
    })

    // this.getFive()

  }

  // getFive = async() => {
  //   fetch("http://localhost:3001/api/getMain")
  //     .then(response => response.json())
  //     .then(venues => {
  //       // let tempState = this.state;
  //       // console.log(res)
  //       // console.log(tempState.venues)
  //       this.setState({main_venue_ids: venues})
  //       // console.log(this.state.mainVenues)
  //     }).catch(() => console.log("Can’t access response. Blocked by browser?"));
  // };

  // getDataFromDb = async () => {
  //   fetch("http://localhost:3001/api/getData")
  //     .then(response => response.json())
  //     .then(venues => {
  //       // let tempState = this.state;
  //       // console.log(res)
  //       // console.log(tempState.venues)
  //       this.setState({venues: venues})
  //       // console.log(this.state.venues)
  //     })
  //     .catch(() => console.log("Can’t access response. Blocked by browser?"));
  // };

  

  componentDidMount() {
    console.log("Component did mount")
    console.log(this.state.mainVenues)
  }
  componentDidUpdate(){
    // debugger
    console.log("Component did update")
    console.log(this.state.venues)
  }

  render() {
    // debugger
    // let Venues = []
      // let Venues = this.props.venues.map( (venue) => 
      //   <Venue venue={venue} />
      // )
    
      // let mainVenues = this.state.main_venue_ids.map( (venue_id) => 
      //   <VenueCard key={venue_id} id={venue_id} /> 
      //   )

      // let venuesList = this.props.venue_ids.map( (venue_id) =>   
      //     <VenueCard key={venue_id} id={venue_id} />
      // )

      let filler = [1,2,3,4,5].map( venue => 
        <VenueCard key={venue} />
      )

      let trendsFiller = [1,2,3,4].map( venue => 
        <Trends key={venue} />
      )
    
    return (
      <div className="App">
        <NavBar />

        <div className="content">

          <div className="left-main">
          
            <HotTopic />

            <div className="card-container">
                {filler}
            </div>
          </div>
          
          <div className="trends-container">
            {trendsFiller}
          </div>
        
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState){
  // debugger
  return {
    venues: reduxState.venues,
    venue_ids: reduxState.venue_ids,
    main_venue_ids: reduxState.main_venue_ids
  }
}

export default connect(mapStateToProps, {getVenueDetails} )(App);

