import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from "axios";

//ACTION CREATORS
// import {
//     getVenueDetails
//   } from "../actions/actionCreators";

//CSS
import "./VenueCard.css";

//ASSETS
import image from "../assets/minced.jpg"

class VenueCard extends Component{

    constructor(props){
        super(props)
        // console.log("EACH CARD")
        console.log(this.props.venue)
    }


    render(){
        return(
            <div className="card" >
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

export default connect(mapStateToProps,{} )(VenueCard);