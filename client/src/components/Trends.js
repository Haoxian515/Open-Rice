import React, { Component } from 'react';
import {connect} from "react-redux";

import {withRouter} from "react-router-dom";

import "./Trends.css"

import {
    setDetailID,
    setCurrentVenueName
} from "../actions/actionCreators";

import image from "../assets/matcha.jpg"



class Trends extends Component{
    
    constructor(props){
        super(props)

        this.state = {
            venueName: "venueName",
            venuePhoto: image
        }
    }

    handleOnClick(){
        this.props.setCurrentVenueName(this.props.venue.title)
        this.props.setDetailID(this.props.venue._id)
        
        let path = "/venue/" + this.props.venue._id
        // // console.log(path)
        this.props.history.push(path);
    }


    render(){
        return(
            <div className="trends" onClick={this.handleOnClick.bind(this)} >
                <img className="trend-img" src={this.props.venue.photo} 
                    alt={image}
                />
                <div className="centered">{this.props.venue.title}</div>
            </div>
        )
    }
}

function mapStateToProps(){
    return {
        
    }
}

export default connect(mapStateToProps,{setDetailID, setCurrentVenueName} )( withRouter(Trends) )
