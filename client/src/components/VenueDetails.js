import React, { Component } from 'react';
import {connect} from "react-redux";
import image from "../assets/hotpot.jpg";
import axios from "axios"



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
                        console.log(this.state)
                    })

                }
            }).catch(err => {
                console.log(err)
                console.log("error trying to request venue details")
            })
    }

    render(){

        let reviews = this.state.venueReviews.map( review => 
            <div>
                {review}
                <br/>
                <br/>
                <br/>
            </div>
        )

        return(
            <div>
                HELLO FROM VENUE DETAILS
                {reviews}
                {/* {this.props.venueDetailID} */}
            </div>
        )
    }

}

function mapStateToProps(reduxState){
    return {
        venueDetailID: reduxState.venueDetailID
    }
}
export default connect(mapStateToProps, {} )(VenuDetails);