import React, { Component } from 'react';
import {connect} from "react-redux";
import { BrowserRouter, Route, Link , Switch, Redirect} from "react-router-dom";


//COMPONENETS
import Venue from "./components/venue.js";
// import InputFormArea from './components/inputFormArea.js';
import VenueCard from "./components/VenueCard.js";
import NavBar from "./components/NavBar.js";
import HotTopic from "./components/HotTopic.js";
import Trends from "./components/Trends.js";
import Search_Page from "./components/Search_Page.js";
import NavBottom from "./components/NavBottom.js";
import VenueDetails from "./components/VenueDetails.js";

//ACTION CREATOR
import {

  getMainVenues,
  getExploreVenues
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
      main_venues:[],
      explores_ids:[],
      searchVenuesArray:[],
      mainVenues:[],
      exploreVenues:[]
    })

    this.getFive()
    this.getExplore()

  }

  getFive = async() => {
    fetch("https://localhost:5000/api/getMain", {'mode': 'no-cors'})
      .then(response => response.json())
      .then(venues => {
        this.props.getMainVenues(venues)
      }).catch(() => console.log("Can’t access response. Blocked by browser?"));
  };

  getExplore = async() => {
    fetch("https://localhost:5000/api/explore", {'mode': 'no-cors'})
      .then(response => response.json())
      .then(venues => {
        this.props.getExploreVenues(venues)
        // console.log(venues)
      }).catch(() => console.log("Can’t access response. Blocked by browser?"));
  };



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
    
      console.log("CURRENT STATE")
      // console.log(this.props.mainVenues)let
    let mainVenues = []
      if(this.props.mainVenues !== undefined){
        mainVenues = this.props.mainVenues.map( (venue) => 
          <VenueCard key={venue._id} venue={venue} /> 
          )
      }

      let exploreVenues = []
      if(this.props.exploreVenues !== undefined){
        exploreVenues = this.props.exploreVenues.map( (venue) => 
          <Trends  key={venue._id} venue={venue} /> 
          )
      }
    
    const Main_Page = () => ( 
      <div className="App">
        {/* <NavBar /> */}
        <div className="content">
          <div className="left-main">
            <HotTopic />
            <h2>What's Hot</h2>
            <div className="card-container">  
                {mainVenues}
            </div>
          </div>
          <h2>Explore</h2>
          <div className="trends-container">
            {exploreVenues}
          </div>
        </div>
      </div>
    )

    const About_Page = () => (
      <h1>HELLO H1</h1>  
    )

    return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Main_Page}/>
          <Route exact path="/search_result" render={ () => <Search_Page />} />
          <Route exact path="/about" component={About_Page}/>
          <Route path="/venue/*" component = {VenueDetails} />
        </Switch>
        {/* <NavBottom /> */}
      </BrowserRouter>
    );
  }
}

function mapStateToProps(reduxState){
  // debugger
  return {
    venues: reduxState.venues,
    venue_ids: reduxState.venue_ids,
    main_venue_ids: reduxState.main_venue_ids,
    explores_ids: reduxState.explores_ids,
    mainVenues: reduxState.mainVenues,
    exploreVenues: reduxState.exploreVenues
  }
}

export default connect(mapStateToProps, {getMainVenues, getExploreVenues} )(App);

