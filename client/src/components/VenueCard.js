import React, { Component } from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import axios from "axios";

//ACTION CREATORS
import {
    setDetailID,
    setCurrentVenueName
} from "../actions/actionCreators";

//CSS
import "./VenueCard.css";

//ASSETS
import image from "../assets/minced.jpg"

class VenueCard extends Component{

    constructor(props){
        super(props)
        console.log("Venue Card Componenet")
        console.log(this.props.venue._id)
        // console.log(this.props.venue)
    }

    handleOnClick(){
        console.log(this.props.venue._id)
        this.props.setCurrentVenueName(this.props.venue.title)
        this.props.setDetailID(this.props.venue._id)

        let path = "/venue/" + this.props.venue._id
        // // console.log(path)
        this.props.history.push(path);
    }

    render(){
        return(
            <div className="card" onClick={this.handleOnClick.bind(this)}>
                <img className="card-top" src={this.props.venue.photo} 

                    alt={image}
                />
                <div className="card-body">
                    <h4>{this.props.venue.title} </h4>

                </div>
            </div>
        )
    }

}

function mapStateToProps(reduxState){

    return{
        
    }
}

export default connect(mapStateToProps,{setDetailID, setCurrentVenueName} )( withRouter(VenueCard) );