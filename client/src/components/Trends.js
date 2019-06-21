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
    }


    render(){
        return(
            <div className="trends" >
                <img className="trend-img" src={this.props.venue.photo} 
                    alt={image}
                />
                <div className="centered">{this.props.venue.title}</div>
            </div>
        )
    }
}

function mapStateToProps(){
    return {}
}

export default connect(mapStateToProps,{} )(Trends)
