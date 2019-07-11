import React, { Component } from 'react';
import {connect} from "react-redux";
import image from "../assets/hotpot.jpg";



class VenuDetails extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                HELLO FROM VENUE DETAILS
                {this.props.venueDetailID}
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