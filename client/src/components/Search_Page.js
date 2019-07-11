import React, { Component } from 'react';
import {connect} from "react-redux";
import { withRouter , Link} from 'react-router-dom';


import axios from "axios";
import image from "../assets/hotpot.jpg";

import Search_Page_Card from "./Search_Page_Card.js"
import NavBar from "./NavBar"

import "./Search_Page.css"

import {
    removeEmptyVenues
} from "../actions/actionCreators"


class Search_Page extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchVenuesArray: []
        }
        console.log("SEARCH PAGE///")
        console.log(this.props.searchVenuesArray)    
    }

    

    render(){

        let arr = []
        if(this.props.searchVenuesArray !== undefined){
            arr = this.props.searchVenuesArray.map( venue => 
               < Search_Page_Card key={venue._id} venue={venue} />
            )
        }
        const searchResultFor = <div className="search_detail">Search result for "{this.props.searchKey}" near "{this.props.searchLocation}"</div>

        return(
            <div>
                {searchResultFor}
                {arr}
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    // debugger
    return {
        // venue_ids: reduxState.venue_ids
        searchKey: reduxState.searchKey,
        searchLocation: reduxState.searchLocation,
        searchVenuesArray: reduxState.searchVenuesArray
    }
}

  //second param pass dispatch functions as second param in connect
  //dispatch functom from actions creaters 
  export default connect(mapStateToProps, {} )(Search_Page);