import React, { Component } from 'react';
import {connect} from "react-redux";

import image from "../assets/hotpot.jpg";

import NavBar from "./NavBar"

import "./Search_Page.css"

class Search_Page extends Component {
    constructor(props){
        super(props)
        this.state = {
            venue_ids: ""
        }
        console.log("PRINTING SEACH PAGE")
        console.log(this.props)
    }

    render(){
        const detailCard = 
        <div className="search_page_card"> 
            <div>
                <h3>["venue"]["name"]</h3>
            </div>
            <div className="search_page_card_preview">
                <img src={image}></img>
                <div className="search_page_venue_details">
                    <p>["location"]["address"]</p>
                    <p>["categories"][0]["name"]</p>
                    <p>Description</p>
                </div>
            </div>
            <div>
                More details expand ^
            </div>
        </div>

        // let venue_list = this.props.venue_ids.map( (venue) => 
        //     <h1>
        //         {venue}
        //     </h1>
        // )
        const searchResultFor = <div className="search_detail">Search result for " {this.props.searchKey} "</div>

        return(
            <div>
                <NavBar />
                    {searchResultFor}
                    {detailCard}
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
        venue_ids: reduxState.venue_ids
    }
}

  //second param pass dispatch functions as second param in connect
  //dispatch functom from actions creaters 
  export default connect(mapStateToProps, {} )(Search_Page);