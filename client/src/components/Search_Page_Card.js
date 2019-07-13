import React, { Component } from 'react';
import {connect} from "react-redux";
import { withRouter} from 'react-router-dom';

import {
    setDetailID,
    setCurrentVenueName
} from "../actions/actionCreators";

class Search_Page_Card extends Component{
    constructor(props){
        super(props)
        this.state = {
            search_page_card:{},
            searchKey:""
        }
        // console.log("SEARCH PAGE///")
        // console.log(this.props.searchVenuesArray)
    }

    setVenuDetailsID(){
        // console.log("hello getVenueDetails")
        // // console.log(this.props.venue._id)
        this.props.setDetailID(this.props.venue._id)
        this.props.setCurrentVenueName(this.props.venue.title)

        let path = "/venue/" + this.props.venue._id
        // // console.log(path)
        this.props.history.push(path);

        // REDIRECT PAGE
        
    }


    render(){

        return (
            <div className="search_page_card" onClick={this.setVenuDetailsID.bind(this)}> 
                    <div>
                        <h3>{this.props.venue.title}</h3>
                        {/* {this.props.venue._id} */}
                    </div>
                    <div className="search_page_card_preview">
                        <img src={this.props.venue.photo}></img>
                        <div className="search_page_venue_details">
                            <p>{this.props.venue.address}</p>
                            <p>{this.props.venue.category}</p>
                            <p>{this.props.venue.description}</p>
                        </div>
                    </div>

            </div>
        )
    }

}

function mapStateToProps(reduxState){
    return {
        
    }
}

export default connect(mapStateToProps, {setDetailID, setCurrentVenueName} )( withRouter(Search_Page_Card) );