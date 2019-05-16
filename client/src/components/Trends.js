import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from "axios";


import "./Trends.css"

import image from "../assets/matcha.jpg"



class Trends extends Component{
    
    constructor(props){
        super(props)

        this.state = {
            venueName: "venueName",
            venuePhoto: image
        }

        axios.get("http://localhost:3001/api/venue_detail", {   
            params: {
                "venue_id": this.props.id
            }
        }).then( response => {
            // this.props.getVenueDetails(response.data)
            // console.log(response.data)
            let resVenueName = response.data["name"]
            // venueDetail : bestPhoto : prefix : suffix
            let resVenuePhoto = response.data["bestPhoto"]["prefix"] + 
                                "400x400" + 
                                response.data["bestPhoto"]["suffix"]
            this.setState(
                // {venueDetail: response.data}
                {
                    venueName: resVenueName,
                    venuePhoto: resVenuePhoto
                }
            )
            console.log(this.state)
        }).catch(err => {
            console.log("ERROR: " + err)
        })
    }


    render(){
        return(
            <div className="trends" >
                <img className="trend-img" src={this.state.venuePhoto} 
                    alt={image}
                />
                <div className="centered">{this.state.venueName}</div>
            </div>
        )
    }
}

function mapStateToProps(){
    return {}
}

export default connect(mapStateToProps,{} )(Trends)
