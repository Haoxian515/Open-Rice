import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from "axios";
import image from "../assets/hotpot.jpg";

import NavBar from "./NavBar"

import "./Search_Page.css"

class Search_Page_Card extends Component{
    constructor(props){
        super(props)
        console.log(this.props.venue_id)
    }

    getVenueDetails(venue_id){
        axios.get("http://localhost:3001/api/venue_detail", {   
            params: {
                "venue_id": this.props.id
            }
        }).then( response => {
            // this.props.getVenueDetails(response.data)
            console.log(response.data)
            let resVenueName = response.data["name"]
            // venueDetail : bestPhoto : prefix : suffix
            let resVenuePhoto = response.data["bestPhoto"]["prefix"] + 
                                "400x400" + 
                                response.data["bestPhoto"]["suffix"]
            // this.setState(
            //     // {venueDetail: response.data}
            //     {
            //         venueName: resVenueName,
            //         venuePhoto: resVenuePhoto
            //     }
            // )
            console.log("SEACH PAGE RH")
            console.log(this.state)
        }).catch(err => {
            console.log("ERROR: " + err)
        })
    }

    render(){
        return (
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
        )
    }

}

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
        const detailCard = this.props.venue_ids.map(venue_id => 
            <Search_Page_Card venue_id={venue_id} />
        )

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