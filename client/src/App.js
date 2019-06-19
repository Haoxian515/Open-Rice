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
      main_venue_ids:[],
      explores_ids:[],
      searchVenuesArray:[]
    })

    // this.getFive()
    // this.getExplore()

  }

  getFive = async() => {
    fetch("http://localhost:3001/api/getMain")
      .then(response => response.json())
      .then(venues => {
        // let tempState = this.state;
        // console.log(res)
        // console.log(tempState.venues)
        this.setState({main_venue_ids: venues})
        // console.log(this.state.mainVenues)
      }).catch(() => console.log("Can’t access response. Blocked by browser?"));
  };

  getExplore = async() => {
    fetch("http://localhost:3001/api/explore")
      .then(response => response.json())
      .then(venues => {
        this.setState({explores_ids: venues})
        // console.log(this.state.mainVenues)
      }).catch(() => console.log("Can’t access response. Blocked by browser?"));
  };

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
    
      let mainVenues = [1,2,3,4,5].map( venue => 
        <VenueCard key={venue} />
      )
      
      if(this.state.main_venue_ids.length > 0){
        mainVenues = this.state.main_venue_ids.map( (venue_id) => 
          <VenueCard key={venue_id} id={venue_id} /> 
          )
      }

      let trendsFiller = [1,2,3,4,5,6,7,8].map( venue => 
        <Trends key={venue} />
      )
      if(this.state.explores_ids.length > 0){
        trendsFiller = this.state.explores_ids.map( (venue_id) => 
          <Trends key={venue_id} id={venue_id} /> 
          )
      }
    
    const Main_Page = () => (
      <div className="App">
        <NavBar />
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
            {trendsFiller}
          </div>
        </div>
      </div>
    )

    const About_Page = () => (
      <h1>HELLO H1</h1>  
    )

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main_Page}/>
          <Route exact path="/search_result" render={ () => <Search_Page />} />
          <Route exact path="/about" component={About_Page}/>
        </Switch>
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
  }
}

export default connect(mapStateToProps, {getVenueDetails} )(App);

