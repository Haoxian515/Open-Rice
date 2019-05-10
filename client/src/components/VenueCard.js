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
        this.state = {
            venueDetail:{},
            venueName:"",
            venuePhoto:"",
        }
        console.log("fetching venue detaifetching venue detaifetching venue detaifetching venue detaifetching venue detaifetching venue details ... ")
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

    onError(){
        // console.log('Image onError');
        this.setState({
            venuePhoto: image 
        });
    }

    render(){
        return(
            <div className="card" >
                <img className="card-top" src={this.state.venuePhoto} 
                    onError={
                        this.onError.bind(this)
                    }
                    alt={image}
                />
                <div className="card-body">
                    <h4>Title: {this.state.venueName} </h4>

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