import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from "axios";
import image from "../assets/hotpot.jpg";

import NavBar from "./NavBar"

import "./Search_Page.css"

import {
    removeEmptyVenues
} from "../actions/actionCreators"

class Search_Page_Card extends Component{
    constructor(props){
        super(props)
        this.state = {
            search_page_card:{},
            searchKey:""
        }
        console.log("SEARCH PAGE///")
        console.log(this.props.searchVenuesArray)
    }


    render(){

        return (
            <div className="search_page_card"> 
                <div>
                    <h3>{this.props.venue.title}</h3>
                </div>
                <div className="search_page_card_preview">
                    <img src={this.props.venue.photo}></img>
                    <div className="search_page_venue_details">
                        <p>{this.props.venue.address}</p>
                        <p>{this.props.venue.category}</p>
                        <p>{this.props.venue.description}</p>
                    </div>
                </div>
            </div>
        )
    }

}

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
               < Search_Page_Card venue={venue} />
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