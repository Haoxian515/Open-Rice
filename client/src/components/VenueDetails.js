import React, { Component } from 'react';
import {connect} from "react-redux";
import image from "../assets/hotpot.jpg";
import axios from "axios"

import "./VenueDetails.css"

class VenuDetails extends Component{

    constructor(props){
        super(props)
        this.state = ({
            venuePhotos: [],
            venueReviews: []
        })

        this.getDetails()
        // console.log(this.props.venueDetailID)
        
    }


    getDetails(){
        axios.get("http://localhost:3001/api/venue_details",{
                params:{
                    "venue_id": this.props.venueDetailID
                }
            }).then( response => {

                console.log(response)
                if(response.data["venue_photos"] !== undefined){

                    this.setState({
                        venuePhotos: response.data["venue_photos"],
                        venueReviews: response.data["venue_reviews"]
                    }, () => {
                        // console.log(this.state)
                    })

                }
            }).catch(err => {
                console.log(err)
                console.log("error trying to request venue details")
            })
    }

    render(){

        let reviews = []
        let photos = []
        if(this.state.venueReviews.length > 1){
            reviews = this.state.venueReviews.map( review => 
                <div className="details-card">
                    {review}
                </div>
            )

            photos = this.state.venuePhotos.map( photo_src => 
                <img className="detail-photo" width="auto" height="auto" src= {photo_src} />
            )
        }else{
            // reviews.push("SORRY NO MORE DETAIL FOUND")
            return(<div>No more details found ... </div>)
        }
        return(
            <div className="venue-details">
                <h1>{this.props.currentVenueName}</h1>
                <div className="venue-details-photos" >
                    {photos}
                </div>

                <div className="venue-details-reviews">
                    {reviews}
                </div>

            </div>
        )
    }

}

function mapStateToProps(reduxState){
    return {
        venueDetailID: reduxState.venueDetailID,
        currentVenueName: reduxState.currentVenueName
    }
}
export default connect(mapStateToProps, {} )(VenuDetails);